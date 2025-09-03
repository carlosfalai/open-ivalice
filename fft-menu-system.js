// FFT-Style ASCII Menu System
class FFTMenuSystem {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.currentMenu = 'main';
        this.menuStack = [];
        this.selectedUnit = null;
        this.selectedSlot = null;
    }

    // ASCII Art borders and decorations
    getMenuBorder(width = 60) {
        const top = '╔' + '═'.repeat(width - 2) + '╗';
        const bottom = '╚' + '═'.repeat(width - 2) + '╝';
        return { top, bottom };
    }

    // Main menu display
    displayMainMenu() {
        const { top, bottom } = this.getMenuBorder(70);
        let menu = `
${top}
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║  ░                    OPEN IVALICE: AFTERMATH                 ░  ║
║  ░                  One Month After the Lions' War            ░  ║
║  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║                                                                   ║
║  Click path or type: /menu/[option]                              ║
║                                                                   ║
║  <span class="menu-link" data-path="/party">▶ Party</span>              View and manage party members         ║
║  <span class="menu-link" data-path="/formation">▶ Formation</span>          Arrange battle formation              ║
║  <span class="menu-link" data-path="/inventory">▶ Inventory</span>          Items and equipment                   ║
║  <span class="menu-link" data-path="/abilities">▶ Abilities</span>          Job abilities and skills              ║
║  <span class="menu-link" data-path="/chronicle">▶ Chronicle</span>          War record and brave story            ║
║  <span class="menu-link" data-path="/options">▶ Options</span>            Save/Load/Settings                    ║
║  <span class="menu-link" data-path="/world">▶ World Map</span>          Travel Ivalice                       ║
║                                                                   ║
║  Gil: ${this.gameEngine.gil.toString().padEnd(10)} │ Play Time: ${this.gameEngine.getPlaytime()}      ║
${bottom}`;
        return menu;
    }

    // Party roster display - FFT style
    displayPartyMenu() {
        const { top, bottom } = this.getMenuBorder(80);
        let menu = `
${top}
║                            ═══ PARTY ROSTER ═══                              ║
╠═══════════════════════════════════════════════════════════════════════════════╣
`;
        
        this.gameEngine.party.forEach((member, idx) => {
            const jobIcon = this.getJobIcon(member.job.name);
            const hpBar = this.createBar(member.currentHP, member.maxHP, 10, '█', '░');
            const mpBar = this.createBar(member.currentMP, member.maxMP, 10, '▓', '░');
            
            menu += `║ ${(idx + 1).toString().padStart(2)}. ${jobIcon} <span class="menu-link" data-path="/party/${member.name.toLowerCase()}">${member.name.padEnd(12)}</span> │ ${member.job.name.padEnd(12)} │ Lv.${member.level.toString().padStart(2)} │ ║\n`;
            menu += `║     HP: ${hpBar} ${member.currentHP.toString().padStart(3)}/${member.maxHP.toString().padStart(3)} │ MP: ${mpBar} ${member.currentMP.toString().padStart(3)}/${member.maxMP.toString().padStart(3)} ║\n`;
            menu += `║     Brave: ${member.brave || 70} Faith: ${member.faith || 70} │ EXP: ${member.exp}/${member.nextLevelExp || 100}                     ║\n`;
            menu += `╟───────────────────────────────────────────────────────────────────────────────╢\n`;
        });

        // Add guest/special characters section
        menu += `║                          ═══ GUESTS / SPECIAL ═══                            ║\n`;
        menu += `╟───────────────────────────────────────────────────────────────────────────────╢\n`;
        
        if (this.gameEngine.guests && this.gameEngine.guests.length > 0) {
            this.gameEngine.guests.forEach(guest => {
                menu += `║  ◆ ${guest.name.padEnd(15)} - ${guest.status}                              ║\n`;
            });
        } else {
            menu += `║  (No guest characters currently)                                             ║\n`;
        }
        
        menu += `${bottom}\n`;
        menu += `\nClick a character name or type: /party/[name]/[submenu]\n`;
        menu += `Submenus: equipment | abilities | stats | job`;
        
        return menu;
    }

    // Character detail view - FFT style
    displayCharacterDetail(character) {
        const { top, bottom } = this.getMenuBorder(75);
        const jobIcon = this.getJobIcon(character.job.name);
        
        let menu = `
${top}
║                        ══ ${character.name.toUpperCase()} ══                         ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  ${jobIcon}  ${character.job.name} - Level ${character.level}                                         ║
║                                                                            ║
║  ┌─────────────────────┬─────────────────────┬──────────────────────┐    ║
║  │ HP: ${String(character.currentHP).padStart(4)}/${String(character.maxHP).padEnd(4)}      │ ATK: ${String(character.attack).padEnd(3)}  PWR: ${String(character.physPower || character.attack).padEnd(3)} │ Brave: ${character.brave || 70}         │    ║
║  │ MP: ${String(character.currentMP).padStart(4)}/${String(character.maxMP).padEnd(4)}      │ DEF: ${String(character.defense).padEnd(3)}  RES: ${String(character.magRes || character.defense).padEnd(3)} │ Faith: ${character.faith || 70}         │    ║
║  │ SP: ${String(character.speed).padEnd(3)}  JP: ${String(character.jp || 0).padEnd(4)}  │ EVA: ${String(character.evade || 5).padEnd(3)}  MOV: ${String(character.move || 4).padEnd(3)} │ Zodiac: ${(character.zodiac || 'Aries').padEnd(8)}│    ║
║  └─────────────────────┴─────────────────────┴──────────────────────┘    ║
║                                                                            ║
║  ═══ MENU OPTIONS ═══                                                     ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/equipment">▶ Equipment</span>    - Weapons, Armor, Accessories                         ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/abilities">▶ Abilities</span>    - Action, Reaction, Support, Movement               ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/job">▶ Change Job</span>   - Job tree and requirements                          ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/stats">▶ Status</span>       - Detailed statistics                               ║
║  <span class="menu-link" data-path="/party">◀ Back to Party</span>                                                     ║
${bottom}`;
        return menu;
    }

    // Equipment screen - FFT style
    displayEquipmentMenu(character) {
        const { top, bottom } = this.getMenuBorder(75);
        
        let menu = `
${top}
║                    ══ ${character.name.toUpperCase()} - EQUIPMENT ══                      ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  R.Hand : ${(character.rightHand || 'Empty').padEnd(20)} ATK +${character.rightHandAtk || 0}              ║
║  L.Hand : ${(character.leftHand || 'Empty').padEnd(20)} ${character.leftHandType || ''}                  ║
║  Head   : ${(character.head || 'Empty').padEnd(20)} HP +${character.headHP || 0}                ║
║  Body   : ${(character.body || 'Empty').padEnd(20)} HP +${character.bodyHP || 0}                ║
║  Accessory: ${(character.accessory || 'Empty').padEnd(20)}                             ║
║                                                                            ║
║  ─────────────────────────────────────────────────────────────────────    ║
║  Total Stats from Equipment:                                              ║
║  ATK: +${String(character.equipATK || 0).padEnd(3)} │ DEF: +${String(character.equipDEF || 0).padEnd(3)} │ HP: +${String(character.equipHP || 0).padEnd(4)} │ MP: +${String(character.equipMP || 0).padEnd(3)}         ║
║  ─────────────────────────────────────────────────────────────────────    ║
║                                                                            ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/equipment/change">▶ Change Equipment</span>                                                  ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/equipment/optimize">▶ Optimize</span>                                                          ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}">◀ Back</span>                                                                 ║
${bottom}`;
        return menu;
    }

    // Formation grid - ASCII representation
    displayFormationGrid() {
        const { top, bottom } = this.getMenuBorder(70);
        
        // 5x5 grid like FFT
        let grid = Array(5).fill(null).map(() => Array(5).fill('　'));
        
        // Place party members
        this.gameEngine.party.forEach((member, idx) => {
            if (member.formationX !== undefined && member.formationY !== undefined) {
                const icon = this.getJobIcon(member.job.name);
                grid[member.formationY][member.formationX] = icon;
            }
        });
        
        let menu = `
${top}
║                        ══ FORMATION ══                          ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║         1     2     3     4     5                               ║
║     ┌─────┬─────┬─────┬─────┬─────┐                           ║
║  A  │  ${grid[0][0]}  │  ${grid[0][1]}  │  ${grid[0][2]}  │  ${grid[0][3]}  │  ${grid[0][4]}  │  Front Line              ║
║     ├─────┼─────┼─────┼─────┼─────┤                           ║
║  B  │  ${grid[1][0]}  │  ${grid[1][1]}  │  ${grid[1][2]}  │  ${grid[1][3]}  │  ${grid[1][4]}  │                          ║
║     ├─────┼─────┼─────┼─────┼─────┤                           ║
║  C  │  ${grid[2][0]}  │  ${grid[2][1]}  │  ${grid[2][2]}  │  ${grid[2][3]}  │  ${grid[2][4]}  │  Middle                  ║
║     ├─────┼─────┼─────┼─────┼─────┤                           ║
║  D  │  ${grid[3][0]}  │  ${grid[3][1]}  │  ${grid[3][2]}  │  ${grid[3][3]}  │  ${grid[3][4]}  │                          ║
║     ├─────┼─────┼─────┼─────┼─────┤                           ║
║  E  │  ${grid[4][0]}  │  ${grid[4][1]}  │  ${grid[4][2]}  │  ${grid[4][3]}  │  ${grid[4][4]}  │  Back Line               ║
║     └─────┴─────┴─────┴─────┴─────┘                           ║
║                                                                  ║
║  Commands: /formation/move/[name]/[position]                    ║
║  Example: /formation/move/ramza/C3                              ║
║                                                                  ║
║  <span class="menu-link" data-path="/menu">◀ Back to Menu</span>                                           ║
${bottom}`;
        return menu;
    }

    // World Map ASCII
    displayWorldMap() {
        const { top, bottom } = this.getMenuBorder(80);
        const currentLoc = this.gameEngine.currentLocation.id;
        
        let menu = `
${top}
║                            ══ IVALICE - POST WAR MAP ══                          ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                 ║
║     Lesalia         Gallione              Fovoham            Lionel            ║
║        ○────────────────●────────────────────○──────────────────●              ║
║        │          <Eagrose>              [Riovanes]        {Lionel Castle}     ║
║        │               │                      │                  │              ║
║     <Orbonne>──────[Dorter]───────────────<Gariland>            │              ║
║        ★               │                      │                  │              ║
║        │          [Mandalia]──────────────[Fovoham]─────────────┤              ║
║        │               │                      │                  │              ║
║   [Ziekden Fort]───────┴───────────────[Trade City]             │              ║
║        │                                      │                  │              ║
║        └────────────[Warjilis Port]──────────┴──────────────────┘              ║
║                           │                                                     ║
║                    {Deep Dungeon}                                               ║
║                                                                                 ║
║  Legend: ★ Current Location  ● Major City  ○ Ruins  [] Towns  <> Castles       ║
║                                                                                 ║
║  Current Location: ${this.gameEngine.currentLocation.name.padEnd(30)}                   ║
║                                                                                 ║
║  <span class="menu-link" data-path="/world/travel">▶ Travel</span>     <span class="menu-link" data-path="/world/errands">▶ Errands</span>     <span class="menu-link" data-path="/menu">◀ Back</span>                       ║
${bottom}`;
        return menu;
    }

    // Job tree display
    displayJobTree(character) {
        const { top, bottom } = this.getMenuBorder(80);
        
        let menu = `
${top}
║                         ══ JOB TREE - ${character.name.toUpperCase()} ══                        ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                 ║
║                              [Squire] Lv.2                                     ║
║                                  │                                              ║
║                    ┌─────────────┼─────────────┐                               ║
║                    │             │             │                                ║
║                [Knight]      [Archer]      [Monk]        Physical Tree         ║
║                 Lv.3          Lv.2          Lv.4                               ║
║                    │             │             │                                ║
║              [Dark Knight]  [Ninja]    [Samurai]                               ║
║                                                                                 ║
║  ─────────────────────────────────────────────────────────────────────────    ║
║                                                                                 ║
║                          [Chemist] Lv.2                                        ║
║                                │                                                ║
║                    ┌───────────┼───────────┐                                   ║
║                    │           │           │                                    ║
║              [White Mage] [Black Mage] [Time Mage]      Magical Tree          ║
║                 Lv.3        Lv.3         Lv.2                                  ║
║                    │           │           │                                    ║
║              [Priest]    [Summoner]  [Oracle]                                  ║
║                                                                                 ║
║  Current Job: ${character.job.name.padEnd(15)} │ Total JP: ${(character.totalJP || 0).toString().padEnd(6)}                    ║
║                                                                                 ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/job/change">▶ Change Job</span>    Requirements shown when selected                      ║
║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}">◀ Back</span>                                                                  ║
${bottom}`;
        return menu;
    }

    // Chronicle/Brave Story
    displayChronicle() {
        const { top, bottom } = this.getMenuBorder(80);
        
        let menu = `
${top}
║                           ══ THE BRAVE STORY ══                                ║
║                        Chronicles of the Aftermath                             ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                 ║
║  ═══ Chapter I: The War's End ═══                                             ║
║  The War of the Lions concluded with Ramza Beoulve defeating Ultima           ║
║  at Mullonde. The Church's corruption exposed, the Lucavi vanquished,         ║
║  yet the hero vanished into history, branded heretic...                       ║
║                                                                                 ║
║  ═══ Persons of Note ═══                                                      ║
║  <span class="menu-link" data-path="/chronicle/ramza">▶ Ramza Beoulve</span>    - The True Hero, whereabouts unknown              ║
║  <span class="menu-link" data-path="/chronicle/delita">▶ Delita Heiral</span>    - King of Ivalice, the commoner who rose          ║
║  <span class="menu-link" data-path="/chronicle/alma">▶ Alma Beoulve</span>     - Ramza's sister, searching for her brother        ║
║  <span class="menu-link" data-path="/chronicle/agrias">▶ Agrias Oaks</span>      - Holy Knight, protector of Princess Ovelia       ║
║  <span class="menu-link" data-path="/chronicle/mustadio">▶ Mustadio</span>         - Engineer, pioneer of new technology            ║
║  <span class="menu-link" data-path="/chronicle/orlandeau">▶ Orlandeau</span>        - Thunder God Cid, the legendary swordsman       ║
║  <span class="menu-link" data-path="/chronicle/reis">▶ Reis & Beowulf</span>   - Dragon tamer and temple knight                ║
║                                                                                 ║
║  ═══ Artifacts & Auracite ═══                                                 ║
║  Zodiac Stones: 12 recovered, 1 lost (Serpentarius)                           ║
║  Status: Scattered across Ivalice, some hidden, some destroyed                ║
║                                                                                 ║
║  <span class="menu-link" data-path="/chronicle/rumors">▶ Rumors</span>    <span class="menu-link" data-path="/chronicle/sightings">▶ Sightings</span>    <span class="menu-link" data-path="/menu">◀ Back</span>                      ║
${bottom}`;
        return menu;
    }

    // Inventory display with categories
    displayInventory() {
        const { top, bottom } = this.getMenuBorder(75);
        
        let menu = `
${top}
║                           ══ INVENTORY ══                               ║
╠══════════════════════════════════════════════════════════════════════════╣
║  Gil: ${this.gameEngine.gil.toString().padEnd(10)}                                                 ║
║                                                                           ║
║  ═══ Categories ═══                                                      ║
║  <span class="menu-link" data-path="/inventory/weapons">▶ Weapons</span>     (${this.countItems('weapon')})                                         ║
║  <span class="menu-link" data-path="/inventory/armor">▶ Armor</span>       (${this.countItems('armor')})                                         ║
║  <span class="menu-link" data-path="/inventory/accessories">▶ Accessories</span> (${this.countItems('accessory')})                                         ║
║  <span class="menu-link" data-path="/inventory/items">▶ Items</span>       (${this.countItems('consumable')})                                         ║
║  <span class="menu-link" data-path="/inventory/rare">▶ Rare/Quest</span>  (${this.countItems('rare')})                                         ║
║                                                                           ║
║  ═══ Quick Use Items ═══                                                 ║`;
        
        // Show first 5 consumables
        const consumables = this.gameEngine.inventory.filter(i => i.type === 'consumable').slice(0, 5);
        consumables.forEach(item => {
            menu += `\n║  • ${item.name.padEnd(20)} x${(item.quantity || 1).toString().padStart(2)} - ${item.description.substring(0, 25)}... ║`;
        });
        
        menu += `\n║                                                                           ║`;
        menu += `\n║  <span class="menu-link" data-path="/menu">◀ Back to Menu</span>                                                    ║`;
        menu += `\n${bottom}`;
        
        return menu;
    }

    // Battle preview screen
    displayBattlePrep() {
        const { top, bottom } = this.getMenuBorder(80);
        
        let menu = `
${top}
║                         ══ BATTLE PREPARATION ══                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                                 ║
║  Location: ${this.gameEngine.currentLocation.name.padEnd(40)}            ║
║  Battle Type: Random Encounter                                                 ║
║  Weather: Clear                                                                ║
║                                                                                 ║
║  ═══ Deploy Units (Max 5) ═══                                                 ║`;
        
        this.gameEngine.party.forEach((member, idx) => {
            const deployed = idx < 5 ? '☑' : '☐';
            menu += `\n║  ${deployed} ${(idx + 1).toString().padStart(2)}. ${member.name.padEnd(12)} - ${member.job.name.padEnd(12)} Lv.${member.level.toString().padStart(2)}                    ║`;
        });
        
        menu += `\n║                                                                                 ║`;
        menu += `\n║  <span class="menu-link" data-path="/battle/start">▶ Start Battle</span>    <span class="menu-link" data-path="/battle/formation">▶ Change Formation</span>    <span class="menu-link" data-path="/world">◀ Cancel</span>      ║`;
        menu += `\n${bottom}`;
        
        return menu;
    }

    // Helper functions
    getJobIcon(jobName) {
        const icons = {
            'Squire': '▣',
            'Knight': '♞',
            'Archer': '➹',
            'Monk': '✊',
            'White Mage': '✚',
            'Black Mage': '☆',
            'Time Mage': '⌚',
            'Summoner': '◈',
            'Thief': '†',
            'Ninja': '✦',
            'Samurai': '⚔',
            'Dark Knight': '☠',
            'Calculator': '※',
            'Dancer': '♪',
            'Bard': '♫',
            'Mime': '◎',
            'Onion Knight': '◉'
        };
        return icons[jobName] || '●';
    }

    createBar(current, max, length, fillChar, emptyChar) {
        const filled = Math.round((current / max) * length);
        const empty = length - filled;
        return fillChar.repeat(filled) + emptyChar.repeat(empty);
    }

    countItems(type) {
        return this.gameEngine.inventory.filter(i => i.type === type).length;
    }

    // Process menu navigation
    navigateToPath(path) {
        const parts = path.split('/').filter(p => p);
        
        if (parts.length === 0 || parts[0] === 'menu') {
            return this.displayMainMenu();
        }
        
        switch(parts[0]) {
            case 'party':
                if (parts[1]) {
                    const character = this.gameEngine.party.find(c => 
                        c.name.toLowerCase() === parts[1].toLowerCase()
                    );
                    if (character) {
                        if (parts[2]) {
                            switch(parts[2]) {
                                case 'equipment':
                                    return this.displayEquipmentMenu(character);
                                case 'abilities':
                                    return this.displayAbilitiesMenu(character);
                                case 'job':
                                    return this.displayJobTree(character);
                                case 'stats':
                                    return this.displayDetailedStats(character);
                                default:
                                    return this.displayCharacterDetail(character);
                            }
                        }
                        return this.displayCharacterDetail(character);
                    }
                }
                return this.displayPartyMenu();
                
            case 'formation':
                return this.displayFormationGrid();
                
            case 'inventory':
                if (parts[1]) {
                    return this.displayInventoryCategory(parts[1]);
                }
                return this.displayInventory();
                
            case 'chronicle':
                if (parts[1]) {
                    return this.displayChronicleEntry(parts[1]);
                }
                return this.displayChronicle();
                
            case 'world':
                if (parts[1] === 'travel') {
                    return this.displayTravelMenu();
                }
                return this.displayWorldMap();
                
            case 'battle':
                return this.displayBattlePrep();
                
            case 'options':
                return this.displayOptionsMenu();
                
            default:
                return this.displayMainMenu();
        }
    }

    // Display abilities menu
    displayAbilitiesMenu(character) {
        const { top, bottom } = this.getMenuBorder(75);
        
        let menu = `
${top}
║                    ══ ${character.name.toUpperCase()} - ABILITIES ══                      ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Current Job: ${character.job.name.padEnd(20)} JP: ${(character.jp || 0).toString().padEnd(6)}              ║
║                                                                            ║
║  ═══ Equipped Abilities ═══                                               ║
║  Action:    ${(character.actionAbility || 'Attack').padEnd(30)}                      ║
║  Reaction:  ${(character.reactionAbility || 'None').padEnd(30)}                      ║
║  Support:   ${(character.supportAbility || 'None').padEnd(30)}                      ║
║  Movement:  ${(character.movementAbility || 'None').padEnd(30)}                      ║
║                                                                            ║
║  ═══ Available Abilities ═══                                              ║`;
        
        if (character.job.abilities) {
            character.job.abilities.forEach(ability => {
                const learned = character.learnedAbilities && character.learnedAbilities.includes(ability) ? '✓' : ' ';
                menu += `\n║  [${learned}] ${ability.padEnd(25)} Cost: ${(character.abilityCosts?.[ability] || '200').toString().padEnd(4)} JP             ║`;
            });
        }
        
        menu += `\n║                                                                            ║`;
        menu += `\n║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/abilities/learn">▶ Learn Abilities</span>                                               ║`;
        menu += `\n║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}/abilities/set">▶ Set Abilities</span>                                                 ║`;
        menu += `\n║  <span class="menu-link" data-path="/party/${character.name.toLowerCase()}">◀ Back</span>                                                                 ║`;
        menu += `\n${bottom}`;
        
        return menu;
    }

    // Options/Save menu
    displayOptionsMenu() {
        const { top, bottom } = this.getMenuBorder(70);
        
        let menu = `
${top}
║                        ══ OPTIONS ══                            ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  ═══ Save/Load ═══                                             ║`;
        
        for (let i = 1; i <= 3; i++) {
            const saveData = localStorage.getItem(`openIvaliceSave_${i}`);
            if (saveData) {
                const data = JSON.parse(saveData);
                menu += `\n║  Slot ${i}: ${data.player.name.padEnd(10)} Lv.${data.player.level.toString().padEnd(2)} - ${this.gameEngine.formatPlaytime(data.playtime)}    ║`;
                menu += `\n║          <span class="menu-link" data-path="/options/save/${i}">▶ Save</span>    <span class="menu-link" data-path="/options/load/${i}">▶ Load</span>                           ║`;
            } else {
                menu += `\n║  Slot ${i}: [Empty]                                             ║`;
                menu += `\n║          <span class="menu-link" data-path="/options/save/${i}">▶ Save</span>                                          ║`;
            }
        }
        
        menu += `\n║                                                                  ║`;
        menu += `\n║  ═══ Settings ═══                                              ║`;
        menu += `\n║  Battle Speed:  [Slow] <Normal> [Fast]                         ║`;
        menu += `\n║  Message Speed: [Slow] [Normal] <Fast>                         ║`;
        menu += `\n║  Sound:         <On> [Off]                                     ║`;
        menu += `\n║                                                                  ║`;
        menu += `\n║  <span class="menu-link" data-path="/menu">◀ Back to Menu</span>                                         ║`;
        menu += `\n${bottom}`;
        
        return menu;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FFTMenuSystem;
}
