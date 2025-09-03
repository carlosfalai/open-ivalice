// Open Ivalice Game Engine - FFT Text Adventure
class GameEngine {
    constructor() {
        this.player = null;
        this.party = [];
        this.currentLocation = null;
        this.gameState = 'exploration'; // exploration, combat, dialogue, menu, formation
        this.combatSystem = null;
        this.inventory = [];
        this.quests = [];
        this.gameText = '';
        this.saveSlots = [];
        this.currentSaveSlot = 1;
        this.monsters = []; // Captured monsters for poaching system
        this.gil = 1000; // Starting money
        this.playtime = 0;
        this.startTime = Date.now();
    }

    init() {
        // Check for existing save first
        if (this.checkForSave()) {
            this.displayText("Welcome back to Open Ivalice!\n\nSave data detected. Type 'load' to continue your adventure or 'new' to start fresh.");
        } else {
            this.startNewGame();
        }
    }

    startNewGame() {
        this.createPlayer();
        this.initializeWorld();
        this.updateUI();
        this.displayText("=== OPEN IVALICE: AFTERMATH ===\n\nOne month has passed since the War of the Lions ended...\n\nDelacroix is dead. The Church's dark secrets lay exposed. Ramza Beoulve, the heretic who saved Ivalice, has vanished into history's shadow.\n\nYou are a survivor of the war, a former squire in Duke Goltanna's army. With the kingdom in chaos and ancient evils stirring once more, you must forge your own path.\n\nThe Zodiac Stones are scattered. Lucavi demons whisper from beyond. And in the power vacuum left by war, new threats emerge...\n\nYour story begins in the ruins of change.\n\nType 'help' for commands or begin your adventure!");
    }

    createPlayer() {
        // Player can name their character
        this.player = new Character('Aldric', 'Squire');
        this.player.exp = 250; // War veteran starts with some experience
        this.party.push(this.player);
        
        // Add starting companions - war survivors
        const companion1 = new Character('Marcus', 'Knight');
        companion1.level = 2;
        this.party.push(companion1);
        
        const companion2 = new Character('Elena', 'White Mage');
        companion2.level = 2;
        this.party.push(companion2);
    }

    initializeWorld() {
        this.currentLocation = locations.orbonne;
        this.inventory = [
            items.potion,
            items.potion,
            items.phoenixDown
        ];
        
        this.quests.push({
            id: 'main_1',
            name: 'The Monastery Mystery',
            description: 'Investigate strange occurrences at Orbonne Monastery',
            status: 'active'
        });
    }

    checkForSave() {
        // Check for any save data
        for (let i = 1; i <= 3; i++) {
            if (localStorage.getItem(`openIvaliceSave_${i}`)) {
                return true;
            }
        }
        return false;
    }

    processCommand(input) {
        const command = input.toLowerCase().trim();
        const parts = command.split(' ');
        const action = parts[0];
        
        switch(action) {
            case 'new':
                if (this.player === null) {
                    this.startNewGame();
                }
                break;
            case 'look':
            case 'l':
                this.look();
                break;
            case 'move':
            case 'go':
            case 'm':
                this.move(parts.slice(1).join(' '));
                break;
            case 'talk':
            case 't':
                this.talk(parts.slice(1).join(' '));
                break;
            case 'attack':
            case 'a':
                this.startCombat();
                break;
            case 'inventory':
            case 'i':
                this.showInventory();
                break;
            case 'jobs':
            case 'j':
                this.showJobs();
                break;
            case 'change':
                this.changeJob(parts[1], parts.slice(2).join(' '));
                break;
            case 'stats':
            case 's':
                this.showStats();
                break;
            case 'party':
            case 'p':
                this.showParty();
                break;
            case 'formation':
            case 'roster':
                this.showFormation();
                break;
            case 'poach':
                this.attemptPoach(parts.slice(1).join(' '));
                break;
            case 'monsters':
                this.showMonsters();
                break;
            case 'use':
                this.useItem(parts.slice(1).join(' '));
                break;
            case 'save':
                if (parts[1]) {
                    this.saveGame(parseInt(parts[1]));
                } else {
                    this.showSaveSlots();
                }
                break;
            case 'load':
                if (parts[1]) {
                    this.loadGame(parseInt(parts[1]));
                } else {
                    this.showLoadSlots();
                }
                break;
            case 'help':
            case 'h':
            case '?':
                this.showHelp();
                break;
            default:
                this.displayText(`Unknown command: ${command}\nType 'help' for available commands.`);
        }
        
        this.updateUI();
    }

    look() {
        let description = `\n=== ${this.currentLocation.name} ===\n${this.currentLocation.description}\n`;
        
        if (this.currentLocation.npcs && this.currentLocation.npcs.length > 0) {
            description += '\nPeople here: ';
            description += this.currentLocation.npcs.map(npc => npc.name).join(', ');
        }
        
        if (this.currentLocation.exits && this.currentLocation.exits.length > 0) {
            description += '\n\nExits: ' + this.currentLocation.exits.join(', ');
        }
        
        this.displayText(description);
    }

    move(direction) {
        if (!direction) {
            this.displayText("Move where? Specify a direction (north, south, east, west)");
            return;
        }
        
        const exit = this.currentLocation.connections?.[direction];
        if (exit) {
            this.currentLocation = locations[exit];
            this.displayText(`You travel ${direction} to ${this.currentLocation.name}.`);
            this.look();
            
            // Random encounter chance
            if (Math.random() < 0.3 && this.currentLocation.enemies) {
                setTimeout(() => {
                    this.displayText("\n⚔️ Enemies appear! ⚔️");
                    this.startCombat();
                }, 1000);
            }
        } else {
            this.displayText(`You cannot go ${direction} from here.`);
        }
    }

    talk(target) {
        if (!this.currentLocation.npcs || this.currentLocation.npcs.length === 0) {
            this.displayText("There's no one here to talk to.");
            return;
        }
        
        const npc = this.currentLocation.npcs.find(n => 
            n.name.toLowerCase().includes(target.toLowerCase())
        );
        
        if (npc) {
            this.displayText(`\n${npc.name}: "${npc.dialogue}"`);
            if (npc.quest) {
                this.displayText(`\n[Quest Updated: ${npc.quest}]`);
            }
        } else {
            this.displayText("That person isn't here. People here: " + 
                this.currentLocation.npcs.map(n => n.name).join(', '));
        }
    }

    startCombat() {
        if (!this.currentLocation.enemies || this.currentLocation.enemies.length === 0) {
            this.displayText("There are no enemies to fight here.");
            return;
        }
        
        this.gameState = 'combat';
        this.combatSystem = new CombatSystem(this.party, this.currentLocation.enemies);
        this.displayText("\n⚔️ COMBAT INITIATED ⚔️");
        this.combatSystem.startBattle(this);
    }

    // FFT-style Formation view (text-only)
    showFormation() {
        let text = '\n=== FORMATION ===\n';
        text += 'Commands: formation view [name], formation reorder [from] [to]\n';
        text += '          change [name] [job], party, stats, inventory\n\n';
        this.party.forEach((m, i) => {
            text += `${i + 1}. ${m.name} - ${m.job.name} (Lv.${m.level})`;
            text += `\n   HP ${m.currentHP}/${m.maxHP} | MP ${m.currentMP}/${m.maxMP} | ATK ${m.attack} | DEF ${m.defense}\n`;
        });
        this.displayText(text);
    }

    showMonsters() {
        let text = '\n=== MONSTER ROSTER ===\n';
        if (this.monsters.length === 0) {
            text += 'No captured monsters. Use "poach [enemy]" in battle when a monster is weak.';
        } else {
            this.monsters.forEach((mon, i) => {
                text += `${i + 1}. ${mon.species} (Rank ${mon.rank}) - Tamed at ${mon.capturedAt}\n`;
            });
            text += '\nVisit the Monster Ranch to release or convert monsters to rare materials.';
        }
        this.displayText(text);
    }

    attemptPoach(arg) {
        if (this.gameState === 'combat' && this.combatSystem) {
            // Delegate to combat system if in battle
            const target = arg || '';
            this.combatSystem.playerAction('poach', target);
            return;
        }

        // Outside combat: If at ranch, allow managing monsters
        if (this.currentLocation && this.currentLocation.id === 'ranch') {
            if (this.monsters.length === 0) {
                this.displayText('The ranch is quiet. You have no monsters to process.');
                return;
            }
            // Simple conversion: turn first monster into loot
            const mon = this.monsters.shift();
            const loot = this.getPoachLoot(mon.species, mon.rank);
            this.inventory.push(loot);
            this.displayText(`Rancher: We processed your ${mon.species}. Here, take this ${loot.name}!`);
            this.updateUI();
        } else {
            this.displayText('You can only manage monsters at the Monster Ranch.');
        }
    }

    getPoachLoot(species, rank) {
        // Very simple loot table
        const rareChance = Math.random();
        if (/chocobo/i.test(species)) {
            return rareChance < 0.2 ? items.elixir : items.ether;
        }
        if (/goblin|bomb|eye/i.test(species)) {
            return rareChance < 0.15 ? items.hiPotion : items.potion;
        }
        if (/behemoth|malboro/i.test(species)) {
            return rareChance < 0.3 ? items.mythrilSword : items.hiPotion;
        }
        return items.potion;
    }

    showInventory() {
        let invText = '\n=== INVENTORY ===\n';
        if (this.inventory.length === 0) {
            invText += 'Your inventory is empty.';
        } else {
            this.inventory.forEach((item, idx) => {
                invText += `${idx + 1}. ${item.name} - ${item.description}\n`;
            });
        }
        this.displayText(invText);
    }

    showJobs() {
        let jobText = '\n=== JOB SYSTEM ===\n';
        jobText += 'Available Jobs:\n';
        
        Object.values(jobs).forEach(job => {
            jobText += `\n${job.name} - ${job.description}`;
            jobText += `\n  HP: ${job.stats.hp} | MP: ${job.stats.mp} | ATK: ${job.stats.attack} | DEF: ${job.stats.defense}`;
        });
        
        jobText += '\n\nTo change job: "change [character] [job]" (e.g., "change ramza knight")';
        this.displayText(jobText);
    }

    changeJob(characterName, jobName) {
        if (!characterName || !jobName) {
            this.displayText("Usage: change [character] [job]");
            return;
        }
        
        const character = this.party.find(c => 
            c.name.toLowerCase() === characterName.toLowerCase()
        );
        
        if (!character) {
            this.displayText(`No party member named ${characterName}`);
            return;
        }
        
        const job = Object.values(jobs).find(j => 
            j.name.toLowerCase() === jobName.toLowerCase()
        );
        
        if (!job) {
            this.displayText(`Unknown job: ${jobName}`);
            return;
        }
        
        character.changeJob(job);
        this.displayText(`${character.name} is now a ${job.name}!`);
        this.updateUI();
    }

    showStats() {
        let statsText = '\n=== CHARACTER STATS ===\n';
        this.party.forEach(member => {
            statsText += `\n${member.name} (${member.job.name})`;
            statsText += `\n  HP: ${member.currentHP}/${member.maxHP}`;
            statsText += `\n  MP: ${member.currentMP}/${member.maxMP}`;
            statsText += `\n  ATK: ${member.attack} | DEF: ${member.defense}`;
            statsText += `\n  SPD: ${member.speed} | Level: ${member.level}\n`;
        });
        this.displayText(statsText);
    }

    showParty() {
        let partyText = '\n=== YOUR PARTY ===\n';
        this.party.forEach((member, idx) => {
            partyText += `${idx + 1}. ${member.name} - ${member.job.name} (Lv.${member.level})\n`;
        });
        this.displayText(partyText);
    }

    useItem(itemName) {
        const item = this.inventory.find(i => 
            i.name.toLowerCase().includes(itemName.toLowerCase())
        );
        
        if (!item) {
            this.displayText("You don't have that item.");
            return;
        }
        
        if (item.type === 'consumable') {
            // Apply item effect
            if (item.effect === 'heal') {
                this.player.currentHP = Math.min(this.player.currentHP + item.value, this.player.maxHP);
                this.displayText(`Used ${item.name}. Restored ${item.value} HP!`);
            } else if (item.effect === 'revive') {
                const fallen = this.party.find(m => m.currentHP <= 0);
                if (fallen) {
                    fallen.currentHP = Math.floor(fallen.maxHP / 2);
                    this.displayText(`${fallen.name} has been revived!`);
                } else {
                    this.displayText("No one needs reviving.");
                    return;
                }
            }
            
            // Remove item after use
            const itemIndex = this.inventory.indexOf(item);
            this.inventory.splice(itemIndex, 1);
            this.updateUI();
        }
    }

    showSaveSlots() {
        let saveText = '\n=== SAVE GAME ===\n\n';
        for (let i = 1; i <= 3; i++) {
            const saveData = localStorage.getItem(`openIvaliceSave_${i}`);
            if (saveData) {
                const data = JSON.parse(saveData);
                const date = new Date(data.timestamp);
                saveText += `Slot ${i}: ${data.player.name} - Lv.${data.player.level} ${data.player.job.name}\n`;
                saveText += `  Location: ${data.locationName || 'Unknown'}\n`;
                saveText += `  Playtime: ${this.formatPlaytime(data.playtime)}\n`;
                saveText += `  Saved: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n\n`;
            } else {
                saveText += `Slot ${i}: [Empty]\n\n`;
            }
        }
        saveText += 'Type "save [1-3]" to save in a specific slot.';
        this.displayText(saveText);
    }

    showLoadSlots() {
        let loadText = '\n=== LOAD GAME ===\n\n';
        for (let i = 1; i <= 3; i++) {
            const saveData = localStorage.getItem(`openIvaliceSave_${i}`);
            if (saveData) {
                const data = JSON.parse(saveData);
                const date = new Date(data.timestamp);
                loadText += `Slot ${i}: ${data.player.name} - Lv.${data.player.level} ${data.player.job.name}\n`;
                loadText += `  Location: ${data.locationName || 'Unknown'}\n`;
                loadText += `  Playtime: ${this.formatPlaytime(data.playtime)}\n`;
                loadText += `  Saved: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n\n`;
            } else {
                loadText += `Slot ${i}: [Empty]\n\n`;
            }
        }
        loadText += 'Type "load [1-3]" to load a specific save.';
        this.displayText(loadText);
    }

    saveGame(slot = 1) {
        if (slot < 1 || slot > 3) {
            this.displayText("Invalid slot number. Use slots 1-3.");
            return;
        }
        
        this.playtime += Date.now() - this.startTime;
        const saveData = {
            player: this.player,
            party: this.party,
            location: this.currentLocation.id,
            locationName: this.currentLocation.name,
            inventory: this.inventory,
            quests: this.quests,
            monsters: this.monsters,
            gil: this.gil,
            playtime: this.playtime,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(`openIvaliceSave_${slot}`, JSON.stringify(saveData));
        this.currentSaveSlot = slot;
        this.displayText(`Game saved to Slot ${slot}!`);
    }

    loadGame(slot = 1) {
        if (slot < 1 || slot > 3) {
            this.displayText("Invalid slot number. Use slots 1-3.");
            return;
        }
        
        const savedData = localStorage.getItem(`openIvaliceSave_${slot}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Restore game state
            this.player = Object.assign(new Character(data.player.name, data.player.job.name), data.player);
            this.party = data.party.map(member => 
                Object.assign(new Character(member.name, member.job.name), member)
            );
            this.currentLocation = locations[data.location];
            this.inventory = data.inventory;
            this.quests = data.quests;
            this.monsters = data.monsters || [];
            this.gil = data.gil || 1000;
            this.playtime = data.playtime || 0;
            this.startTime = Date.now();
            this.currentSaveSlot = slot;
            
            this.updateUI();
            this.displayText(`\nGame loaded from Slot ${slot}!\n`);
            this.look();
        } else {
            this.displayText(`No save data in Slot ${slot}.`);
        }
    }

    formatPlaytime(milliseconds) {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
    }

    showHelp() {
        const helpText = `
=== COMMANDS ===
Movement & Exploration:
  look/l - Examine your surroundings
  move/go/m [direction] - Travel in a direction
  talk/t [person] - Speak with someone
  
Combat:
  attack/a - Initiate combat
  
Character Management:
  stats/s - View party statistics
  party/p - View party members
  jobs/j - View available jobs
  change [character] [job] - Change a character's job
  inventory/i - View your items
  use [item] - Use an item
  
System:
  save - Save your progress
  load - Load saved game
  help/h/? - Show this help menu
  
=== TIPS ===
• Explore thoroughly - secrets await!
• Change jobs to gain new abilities
• Save frequently before battles
• Talk to everyone for quests and lore
        `;
        this.displayText(helpText);
    }

    displayText(text) {
        this.gameText = text;
        const gameTextElement = document.getElementById('game-text');
        if (gameTextElement) {
            gameTextElement.innerHTML = text.replace(/\n/g, '<br>');
            gameTextElement.scrollTop = gameTextElement.scrollHeight;
        }
    }

    updateUI() {
        // Update character stats
        const statsElement = document.getElementById('character-stats');
        if (statsElement && this.player) {
            statsElement.innerHTML = `
                <div class="stat-line">
                    <span class="stat-label">Name:</span>
                    <span class="stat-value">${this.player.name}</span>
                </div>
                <div class="stat-line">
                    <span class="stat-label">Job:</span>
                    <span class="stat-value">${this.player.job.name}</span>
                </div>
                <div class="stat-line">
                    <span class="stat-label">Level:</span>
                    <span class="stat-value">${this.player.level}</span>
                </div>
                <div class="stat-line">
                    <span class="stat-label">HP:</span>
                    <span class="stat-value">${this.player.currentHP}/${this.player.maxHP}</span>
                </div>
                <div class="stat-line">
                    <span class="stat-label">MP:</span>
                    <span class="stat-value">${this.player.currentMP}/${this.player.maxMP}</span>
                </div>
            `;
        }
        
        // Update party list
        const partyElement = document.getElementById('party-list');
        if (partyElement) {
            partyElement.innerHTML = this.party.map(member => `
                <div class="party-member">
                    ${member.name} - ${member.job.name}<br>
                    HP: ${member.currentHP}/${member.maxHP}
                </div>
            `).join('');
        }
        
        // Update inventory
        const invElement = document.getElementById('inventory-list');
        if (invElement) {
            invElement.innerHTML = this.inventory.map(item => `
                <div class="item-entry">${item.name} x1</div>
            `).join('') || '<div class="item-entry">Empty</div>';
        }
        
        // Update quest log
        const questElement = document.getElementById('quest-list');
        if (questElement) {
            questElement.innerHTML = this.quests.map(quest => `
                <div class="quest-entry">
                    <strong>${quest.name}</strong><br>
                    ${quest.description}
                </div>
            `).join('') || '<div class="quest-entry">No active quests</div>';
        }
    }
}

// Character Class
class Character {
    constructor(name, jobName) {
        this.name = name;
        this.level = 1;
        this.exp = 0;
        this.job = jobs[jobName.toLowerCase()] || jobs.squire;
        
        // Base stats from job
        this.maxHP = this.job.stats.hp;
        this.currentHP = this.maxHP;
        this.maxMP = this.job.stats.mp;
        this.currentMP = this.maxMP;
        this.attack = this.job.stats.attack;
        this.defense = this.job.stats.defense;
        this.speed = this.job.stats.speed;
        this.abilities = [...this.job.abilities];
    }
    
    changeJob(newJob) {
        this.job = newJob;
        // Recalculate stats
        this.maxHP = newJob.stats.hp + (this.level - 1) * 10;
        this.maxMP = newJob.stats.mp + (this.level - 1) * 5;
        this.attack = newJob.stats.attack + (this.level - 1) * 2;
        this.defense = newJob.stats.defense + (this.level - 1) * 2;
        this.speed = newJob.stats.speed;
        this.abilities = [...newJob.abilities];
        
        // Restore HP/MP
        this.currentHP = this.maxHP;
        this.currentMP = this.maxMP;
    }
    
    levelUp() {
        this.level++;
        this.maxHP += 10;
        this.maxMP += 5;
        this.attack += 2;
        this.defense += 2;
        this.currentHP = this.maxHP;
        this.currentMP = this.maxMP;
    }
}

// Combat System
class CombatSystem {
    constructor(party, enemies) {
        this.party = party.filter(m => m.currentHP > 0);
        this.enemies = enemies.map(e => ({...e})); // Clone enemies
        this.turnOrder = [];
        this.currentTurn = 0;
        this.battleLog = [];
    }
    
    startBattle(gameEngine) {
        this.gameEngine = gameEngine;
        
        // Initialize turn order based on speed
        this.turnOrder = [
            ...this.party.map(p => ({unit: p, team: 'party'})),
            ...this.enemies.map(e => ({unit: e, team: 'enemy'}))
        ].sort((a, b) => (b.unit.speed || 5) - (a.unit.speed || 5));
        
        let battleText = '\n=== BATTLE START ===\n';
        battleText += 'Enemies: ' + this.enemies.map(e => e.name).join(', ') + '\n';
        battleText += '\nCommands: attack [enemy], defend, ability [name], flee\n';
        
        this.gameEngine.displayText(battleText);
        this.nextTurn();
    }
    
    nextTurn() {
        const current = this.turnOrder[this.currentTurn % this.turnOrder.length];
        
        if (current.team === 'party') {
            // Player turn
            this.gameEngine.displayText(`\n${current.unit.name}'s turn! Choose action:`);
            // Wait for player input
        } else {
            // Enemy AI turn
            this.enemyAction(current.unit);
        }
    }
    
    enemyAction(enemy) {
        // Simple AI - attack random party member
        const targets = this.party.filter(m => m.currentHP > 0);
        if (targets.length === 0) {
            this.endBattle(false);
            return;
        }
        
        const target = targets[Math.floor(Math.random() * targets.length)];
        const damage = Math.max(1, enemy.attack - target.defense);
        target.currentHP -= damage;
        
        this.gameEngine.displayText(`${enemy.name} attacks ${target.name} for ${damage} damage!`);
        
        if (target.currentHP <= 0) {
            this.gameEngine.displayText(`${target.name} has fallen!`);
        }
        
        // Check win/loss
        if (this.party.every(m => m.currentHP <= 0)) {
            this.endBattle(false);
        } else {
            this.currentTurn++;
            setTimeout(() => this.nextTurn(), 1500);
        }
    }
    
    playerAction(action, target) {
        const current = this.turnOrder[this.currentTurn % this.turnOrder.length];
        
        const findEnemy = (t) => this.enemies.find(e => e.name.toLowerCase().includes(t.toLowerCase()));

        if ((action === 'attack' || action === 'poach') && target) {
            const enemy = findEnemy(target);
            if (enemy && enemy.hp > 0) {
                if (action === 'attack') {
                    const damage = Math.max(1, current.unit.attack - enemy.defense);
                    enemy.hp -= damage;
                    this.gameEngine.displayText(`${current.unit.name} attacks ${enemy.name} for ${damage} damage!`);
                } else if (action === 'poach') {
                    // Poach attempt: only works on monsters at low HP
                    if (this.isMonster(enemy) && enemy.hp <= Math.max(10, Math.floor((enemy.maxHp || 100) * 0.25))) {
                        const success = Math.random() < 0.6; // 60% when weak
                        if (success) {
                            this.gameEngine.displayText(`${current.unit.name} successfully tamed ${enemy.name}!`);
                            // Add to ranch
                            this.gameEngine.monsters.push({
                                species: enemy.name,
                                rank: this.rankMonster(enemy),
                                capturedAt: this.gameEngine.currentLocation.name
                            });
                            // Remove enemy from battle
                            enemy.hp = 0;
                            this.enemies = this.enemies.filter(e => e.hp > 0);
                            if (this.enemies.length === 0) {
                                this.endBattle(true);
                                return;
                            }
                        } else {
                            this.gameEngine.displayText(`${current.unit.name} failed to tame ${enemy.name}...`);
                        }
                    } else {
                        this.gameEngine.displayText('Poach can only be used on weakened monsters.');
                    }
                }
                
                if (enemy.hp <= 0 && action === 'attack') {
                    this.gameEngine.displayText(`${enemy.name} is defeated!`);
                    this.enemies = this.enemies.filter(e => e.hp > 0);
                    
                    if (this.enemies.length === 0) {
                        this.endBattle(true);
                        return;
                    }
                }
            }
        }
        
        this.currentTurn++;
        setTimeout(() => this.nextTurn(), 1500);
    }

    isMonster(enemy) {
        return /goblin|bomb|chocobo|malboro|behemoth|panther|coerl|eye/i.test(enemy.name);
    }

    rankMonster(enemy) {
        const atk = enemy.attack || 10;
        if (atk >= 24) return 'S';
        if (atk >= 18) return 'A';
        if (atk >= 12) return 'B';
        return 'C';
    }
    
    endBattle(victory) {
        if (victory) {
            this.gameEngine.displayText('\n⭐ VICTORY! ⭐\nYou gained 50 EXP and 100 Gil!');
            this.party.forEach(member => {
                member.exp += 50;
                if (member.exp >= 100) {
                    member.levelUp();
                    this.gameEngine.displayText(`${member.name} leveled up!`);
                }
            });
        } else {
            this.gameEngine.displayText('\n💀 GAME OVER 💀\nYour party has fallen...');
        }
        
        this.gameEngine.gameState = 'exploration';
        this.gameEngine.combatSystem = null;
        this.gameEngine.updateUI();
    }
}
