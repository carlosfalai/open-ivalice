// Open Ivalice: Aftermath - Enhanced FFT Game Engine
class FFTGameEngine {
    constructor() {
        // Core game state
        this.player = null;
        this.party = [];
        this.roster = []; // Full roster including benched units
        this.guests = [];
        this.currentLocation = null;
        this.gameState = 'menu'; // menu, exploration, combat, dialogue, formation
        
        // FFT Systems
        this.gil = 5000;
        this.brave = {};
        this.faith = {};
        this.zodiacCalendar = { month: 'Aries', day: 1 };
        
        // Inventory with FFT categories
        this.inventory = [];
        this.equipment = {
            weapons: [],
            shields: [],
            helmets: [],
            armor: [],
            accessories: []
        };
        
        // Story & Progress
        this.storyChapter = 'Aftermath I';
        this.rumors = [];
        this.errands = [];
        this.chronicle = {};
        
        // Save system
        this.saveSlots = [];
        this.currentSaveSlot = 1;
        this.playtime = 0;
        this.startTime = Date.now();
        
        // Menu system
        this.menuSystem = null;
        this.combatSystem = null;
    }

    init() {
        this.menuSystem = new FFTMenuSystem(this);
        
        // Check for existing saves
        if (this.checkForSaves()) {
            this.displayText(this.menuSystem.displayMainMenu());
        } else {
            this.startNewGame();
        }
    }

    startNewGame() {
        this.createInitialParty();
        this.initializePostWarWorld();
        this.initializeInventory();
        this.displayText(this.getIntroText());
    }

    getIntroText() {
        return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                         OPEN IVALICE: AFTERMATH                              ║
║                    One Month After the War of the Lions                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  The Lucavi are vanquished. The Church's lies exposed.                      ║
║  Ramza Beoulve, the true hero, vanished into history as a heretic.         ║
║  King Delita rules with an iron fist forged from common blood.             ║
║                                                                               ║
║  You are one of Ramza's surviving companions.                              ║
║  The war is over, but Ivalice's wounds run deep.                          ║
║  Ancient powers stir. The 13th Stone calls.                                ║
║  Your story begins where legends end...                                     ║
║                                                                               ║
║  Type /menu or click menu options to begin                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝
`;
    }

    createInitialParty() {
        // Create the main character (custom or choose a returning character)
        // For now, let's allow playing as a custom character who fought alongside Ramza
        
        this.player = this.createCharacter({
            name: 'Aldric',
            job: 'Holy Knight',
            level: 35,
            brave: 75,
            faith: 65,
            zodiac: 'Aries',
            gender: 'Male'
        });
        
        // Starting party - survivors from Ramza's company
        this.party = [
            this.player,
            this.createAgrias(),
            this.createMustadio(),
            this.createLavian(),
            this.createAlicia()
        ];
        
        // Full roster includes everyone
        this.roster = [...this.party];
        
        // Add special characters to chronicle/roster who can be recruited
        this.initializeSpecialCharacters();
    }

    // Create returning FFT characters
    createAgrias() {
        return this.createCharacter({
            name: 'Agrias',
            job: 'Holy Knight',
            level: 38,
            brave: 80,
            faith: 70,
            zodiac: 'Leo',
            gender: 'Female',
            unique: true,
            abilities: ['Stasis Sword', 'Split Punch', 'Lightning Stab', 'Holy Explosion'],
            equipment: {
                rightHand: 'Save the Queen',
                body: 'Carabineer Mail',
                accessory: 'Chantage'
            }
        });
    }

    createMustadio() {
        return this.createCharacter({
            name: 'Mustadio',
            job: 'Machinist',
            level: 36,
            brave: 70,
            faith: 60,
            zodiac: 'Libra',
            gender: 'Male',
            unique: true,
            abilities: ['Leg Shot', 'Arm Shot', 'Seal Evil', 'Machinist Skills'],
            equipment: {
                rightHand: 'Blaze Gun',
                body: 'Brigandine',
                accessory: 'Germinas Boots'
            }
        });
    }

    createOrlandeau() {
        return this.createCharacter({
            name: 'Orlandeau',
            job: 'Sword Saint',
            level: 50,
            brave: 85,
            faith: 60,
            zodiac: 'Capricorn',
            gender: 'Male',
            unique: true,
            abilities: ['All Swordskills', 'Shadowblade', 'Hallowed Bolt', 'Divine Ruination'],
            equipment: {
                rightHand: 'Excalibur',
                leftHand: 'Chaos Blade',
                body: 'Lordly Robes',
                accessory: 'Bracer'
            }
        });
    }

    createLavian() {
        return this.createCharacter({
            name: 'Lavian',
            job: 'Knight',
            level: 35,
            brave: 75,
            faith: 65,
            zodiac: 'Virgo',
            gender: 'Female',
            abilities: ['Rend Weapon', 'Rend Armor', 'Rend Shield']
        });
    }

    createAlicia() {
        return this.createCharacter({
            name: 'Alicia',
            job: 'Knight', 
            level: 35,
            brave: 73,
            faith: 67,
            zodiac: 'Gemini',
            gender: 'Female',
            abilities: ['Rend Helm', 'Rend MP', 'Rend Speed']
        });
    }

    createCharacter(config) {
        const jobData = jobs[config.job.toLowerCase().replace(' ', '')] || jobs.squire;
        
        return {
            name: config.name,
            job: jobData,
            level: config.level || 1,
            exp: 0,
            nextLevelExp: 100,
            jp: config.jp || 0,
            totalJP: 0,
            
            // Base stats
            maxHP: jobData.stats.hp + (config.level - 1) * 11,
            currentHP: jobData.stats.hp + (config.level - 1) * 11,
            maxMP: jobData.stats.mp + (config.level - 1) * 3,
            currentMP: jobData.stats.mp + (config.level - 1) * 3,
            
            // Battle stats
            attack: jobData.stats.attack + Math.floor(config.level / 2),
            defense: jobData.stats.defense + Math.floor(config.level / 3),
            magicAttack: 10 + Math.floor(config.level / 3),
            magicDefense: 8 + Math.floor(config.level / 4),
            speed: jobData.stats.speed,
            move: 4,
            jump: 3,
            evade: 5,
            
            // FFT specific
            brave: config.brave || 70,
            faith: config.faith || 70,
            zodiac: config.zodiac || 'Aries',
            gender: config.gender || 'Male',
            
            // Abilities
            abilities: config.abilities || [...jobData.abilities],
            learnedAbilities: [],
            actionAbility: config.abilities ? config.abilities[0] : 'Attack',
            reactionAbility: null,
            supportAbility: null,
            movementAbility: null,
            
            // Equipment
            rightHand: config.equipment?.rightHand || null,
            leftHand: config.equipment?.leftHand || null,
            head: config.equipment?.head || null,
            body: config.equipment?.body || null,
            accessory: config.equipment?.accessory || null,
            
            // Equipment stats
            equipATK: 0,
            equipDEF: 0,
            equipHP: 0,
            equipMP: 0,
            
            // Formation position
            formationX: Math.floor(Math.random() * 5),
            formationY: Math.floor(Math.random() * 5),
            
            // Status
            unique: config.unique || false,
            permanent: config.permanent || false
        };
    }

    initializeSpecialCharacters() {
        // Chronicle entries for recruitable characters
        this.chronicle = {
            ramza: {
                name: 'Ramza Beoulve',
                status: 'Missing',
                lastSeen: 'Mullonde Cathedral',
                description: 'The true hero of the War of the Lions. Defeated Ultima but vanished afterward.'
            },
            alma: {
                name: 'Alma Beoulve',
                status: 'Searching',
                location: 'Unknown',
                description: 'Ramza\'s sister. Travels Ivalice seeking her brother.'
            },
            orlandeau: {
                name: 'Cidolfus Orlandeau',
                status: 'Recruitable',
                location: 'Zeltennia',
                description: 'Thunder God Cid. The greatest swordsman in Ivalice.'
            },
            meliadoul: {
                name: 'Meliadoul Tengille',
                status: 'Recruitable',
                location: 'Limberry',
                description: 'Former Temple Knight seeking redemption.'
            },
            beowulf: {
                name: 'Beowulf Cadmus',
                status: 'Active',
                location: 'Goland',
                description: 'Temple Knight searching for cursed individuals with Reis.'
            },
            reis: {
                name: 'Reis Duelar',
                status: 'Active',
                location: 'Goland',
                description: 'Former dragon, now human. Works to break curses.'
            },
            construct8: {
                name: 'Construct 8',
                status: 'Dormant',
                location: 'Goug Machine City',
                description: 'Ancient automaton. Mustadio seeks to reactivate it.'
            },
            cloud: {
                name: 'Cloud Strife',
                status: 'Dimensional Anomaly',
                location: 'Unknown',
                description: 'Warrior from another world. Appeared during the War.'
            }
        };
    }

    initializePostWarWorld() {
        // Set starting location
        this.currentLocation = locations.orbonne;
        
        // Add post-war rumors
        this.rumors = [
            'King Delita grows paranoid. He sees enemies in every shadow.',
            'The Church splits into factions. Some seek reform, others revenge.',
            'Strange crystals appear in deep mines. They pulse with Zodiac energy.',
            'A hooded figure matching Ramza\'s description was seen near Dorter.',
            'The 13th Auracite, Serpentarius, was shattered centuries ago. Its pieces remain.',
            'Merchants report seeing airships in the eastern skies.',
            'The Deep Dungeon changes. New floors appear, defying logic.'
        ];
    }

    initializeInventory() {
        // Starting equipment and items (post-war, well-equipped)
        this.inventory = [
            { name: 'X-Potion', type: 'consumable', quantity: 10, effect: 'heal', value: 150 },
            { name: 'Phoenix Down', type: 'consumable', quantity: 5, effect: 'revive', value: 100 },
            { name: 'Ether', type: 'consumable', quantity: 8, effect: 'mp_heal', value: 50 },
            { name: 'Remedy', type: 'consumable', quantity: 5, effect: 'cure_status', value: 100 },
            { name: 'Elixir', type: 'consumable', quantity: 2, effect: 'full_restore', value: 999 }
        ];
        
        this.equipment.weapons = [
            { name: 'Mythril Sword', type: 'weapon', attack: 10, element: null },
            { name: 'Defender', type: 'weapon', attack: 16, element: null, special: 'Auto-Protect' },
            { name: 'Coral Sword', type: 'weapon', attack: 14, element: 'Lightning' },
            { name: 'Romanda Gun', type: 'weapon', attack: 12, range: 8 }
        ];
        
        this.equipment.armor = [
            { name: 'Mythril Armor', type: 'armor', hp: 120, defense: 10 },
            { name: 'Carabineer Mail', type: 'armor', hp: 150, defense: 12 },
            { name: 'Robe of Lords', type: 'armor', mp: 50, magDef: 15 }
        ];
    }

    // Process menu-style commands
    processCommand(input) {
        // Handle menu paths like /party/ramza/equipment
        if (input.startsWith('/')) {
            const menuOutput = this.menuSystem.navigateToPath(input);
            this.displayText(menuOutput);
            return;
        }
        
        // Handle traditional commands
        const command = input.toLowerCase().trim();
        const parts = command.split(' ');
        
        switch(parts[0]) {
            case 'menu':
                this.displayText(this.menuSystem.displayMainMenu());
                break;
            case 'party':
                this.displayText(this.menuSystem.displayPartyMenu());
                break;
            case 'formation':
                this.displayText(this.menuSystem.displayFormationGrid());
                break;
            case 'inventory':
                this.displayText(this.menuSystem.displayInventory());
                break;
            case 'chronicle':
                this.displayText(this.menuSystem.displayChronicle());
                break;
            case 'world':
                this.displayText(this.menuSystem.displayWorldMap());
                break;
            case 'save':
                this.saveGame(parseInt(parts[1]) || 1);
                break;
            case 'load':
                this.loadGame(parseInt(parts[1]) || 1);
                break;
            case 'help':
                this.displayHelp();
                break;
            default:
                this.displayText('Unknown command. Type "help" or "/menu" to see options.');
        }
    }

    displayHelp() {
        const helpText = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                              COMMAND HELP                                     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  MENU NAVIGATION (Clickable or type):                                        ║
║  /menu              - Main menu                                              ║
║  /party             - View party roster                                      ║
║  /party/[name]      - View character details                                 ║
║  /party/[name]/equipment - View/change equipment                            ║
║  /party/[name]/abilities - View/set abilities                               ║
║  /party/[name]/job  - Change job class                                      ║
║  /formation         - Battle formation                                       ║
║  /inventory         - View inventory                                         ║
║  /chronicle         - Brave Story / War records                             ║
║  /world             - World map                                              ║
║  /options           - Save/Load/Settings                                     ║
║                                                                               ║
║  QUICK COMMANDS:                                                             ║
║  menu, party, formation, inventory, save [1-3], load [1-3], help           ║
║                                                                               ║
║  Click on any highlighted menu option or type the path directly             ║
╚══════════════════════════════════════════════════════════════════════════════╝
`;
        this.displayText(helpText);
    }

    checkForSaves() {
        for (let i = 1; i <= 3; i++) {
            if (localStorage.getItem(`openIvaliceFFT_${i}`)) {
                return true;
            }
        }
        return false;
    }

    saveGame(slot = 1) {
        if (slot < 1 || slot > 3) {
            this.displayText('Invalid save slot. Use 1-3.');
            return;
        }
        
        const saveData = {
            player: this.player,
            party: this.party,
            roster: this.roster,
            location: this.currentLocation?.id,
            inventory: this.inventory,
            equipment: this.equipment,
            gil: this.gil,
            chapter: this.storyChapter,
            playtime: this.getPlaytimeMs(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(`openIvaliceFFT_${slot}`, JSON.stringify(saveData));
        this.displayText(`Game saved to Slot ${slot}`);
    }

    loadGame(slot = 1) {
        const saveData = localStorage.getItem(`openIvaliceFFT_${slot}`);
        if (!saveData) {
            this.displayText(`No save data in Slot ${slot}`);
            return;
        }
        
        const data = JSON.parse(saveData);
        this.player = data.player;
        this.party = data.party;
        this.roster = data.roster;
        this.currentLocation = locations[data.location] || locations.orbonne;
        this.inventory = data.inventory;
        this.equipment = data.equipment;
        this.gil = data.gil;
        this.storyChapter = data.chapter;
        this.playtime = data.playtime || 0;
        this.startTime = Date.now();
        
        this.displayText(`Game loaded from Slot ${slot}`);
        this.displayText(this.menuSystem.displayMainMenu());
    }

    getPlaytime() {
        const ms = this.getPlaytimeMs();
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    getPlaytimeMs() {
        return this.playtime + (Date.now() - this.startTime);
    }

    formatPlaytime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    displayText(text) {
        const gameTextElement = document.getElementById('game-text');
        if (gameTextElement) {
            gameTextElement.innerHTML = text;
            
            // Make menu links clickable
            const links = gameTextElement.querySelectorAll('.menu-link');
            links.forEach(link => {
                link.style.cursor = 'pointer';
                link.style.color = '#ffd700';
                link.style.textDecoration = 'underline';
                link.addEventListener('click', (e) => {
                    const path = e.target.getAttribute('data-path');
                    if (path) {
                        this.processCommand(path);
                    }
                });
            });
            
            gameTextElement.scrollTop = gameTextElement.scrollHeight;
        }
    }

    updateUI() {
        // Update character display
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
                    <span class="stat-label">Brave:</span>
                    <span class="stat-value">${this.player.brave}</span>
                </div>
                <div class="stat-line">
                    <span class="stat-label">Faith:</span>
                    <span class="stat-value">${this.player.faith}</span>
                </div>
            `;
        }
        
        // Update party list
        const partyElement = document.getElementById('party-list');
        if (partyElement) {
            partyElement.innerHTML = this.party.slice(0, 5).map(member => `
                <div class="party-member" style="cursor: pointer" onclick="gameEngine.processCommand('/party/${member.name.toLowerCase()}')">
                    ${member.name} - ${member.job.name}<br>
                    Lv.${member.level} B:${member.brave} F:${member.faith}
                </div>
            `).join('');
        }
        
        // Update inventory counter
        const invElement = document.getElementById('inventory-list');
        if (invElement) {
            const itemCount = this.inventory.reduce((sum, item) => sum + (item.quantity || 1), 0);
            const weaponCount = Object.values(this.equipment).reduce((sum, cat) => sum + cat.length, 0);
            invElement.innerHTML = `
                <div class="item-entry">Items: ${itemCount}</div>
                <div class="item-entry">Equipment: ${weaponCount}</div>
                <div class="item-entry">Gil: ${this.gil}</div>
            `;
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FFTGameEngine;
}
