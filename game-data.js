// Game Data for Open Ivalice

// Job System - Classic FFT Jobs
const jobs = {
    squire: {
        name: 'Squire',
        description: 'Basic warrior class, foundation of all physical jobs',
        stats: { hp: 100, mp: 20, attack: 15, defense: 10, speed: 5 },
        abilities: ['Tackle', 'Stone Throw', 'Focus']
    },
    knight: {
        name: 'Knight',
        description: 'Heavy armored warrior with powerful sword techniques',
        stats: { hp: 150, mp: 15, attack: 20, defense: 18, speed: 3 },
        abilities: ['Sword Break', 'Shield Bash', 'Protect']
    },
    monk: {
        name: 'Monk',
        description: 'Martial artist with powerful bare-handed attacks',
        stats: { hp: 120, mp: 30, attack: 22, defense: 8, speed: 6 },
        abilities: ['Chakra', 'Earth Slash', 'Revive']
    },
    whitemage: {
        name: 'White Mage',
        description: 'Master of healing and protective magic',
        stats: { hp: 80, mp: 60, attack: 8, defense: 6, speed: 4 },
        abilities: ['Cure', 'Protect', 'Raise']
    },
    blackmage: {
        name: 'Black Mage',
        description: 'Wielder of destructive elemental magic',
        stats: { hp: 75, mp: 65, attack: 7, defense: 5, speed: 4 },
        abilities: ['Fire', 'Thunder', 'Blizzard']
    },
    archer: {
        name: 'Archer',
        description: 'Long-range specialist with precise attacks',
        stats: { hp: 90, mp: 25, attack: 18, defense: 7, speed: 7 },
        abilities: ['Charge', 'Leg Shot', 'Arm Shot']
    },
    thief: {
        name: 'Thief',
        description: 'Agile fighter who can steal from enemies',
        stats: { hp: 85, mp: 20, attack: 16, defense: 6, speed: 9 },
        abilities: ['Steal', 'Steal Heart', 'Move +2']
    },
    timemage: {
        name: 'Time Mage',
        description: 'Manipulator of time and space',
        stats: { hp: 85, mp: 55, attack: 9, defense: 7, speed: 5 },
        abilities: ['Haste', 'Slow', 'Stop']
    },
    summoner: {
        name: 'Summoner',
        description: 'Calls forth powerful espers to aid in battle',
        stats: { hp: 90, mp: 70, attack: 10, defense: 8, speed: 4 },
        abilities: ['Ramuh', 'Shiva', 'Ifrit']
    },
    ninja: {
        name: 'Ninja',
        description: 'Master of stealth and dual-wielding',
        stats: { hp: 95, mp: 30, attack: 19, defense: 9, speed: 10 },
        abilities: ['Throw', 'Vanish', 'Dual Wield']
    },
    calculator: {
        name: 'Calculator',
        description: 'Uses mathematics to cast spells on multiple targets',
        stats: { hp: 70, mp: 80, attack: 6, defense: 5, speed: 2 },
        abilities: ['CT Magic', 'Level Magic', 'Height Magic']
    },
    dancer: {
        name: 'Dancer',
        description: 'Enchants allies and confuses enemies with dances',
        stats: { hp: 85, mp: 35, attack: 14, defense: 7, speed: 8 },
        abilities: ['Slow Dance', 'Polka', 'Forbidden Dance']
    },
    darkKnight: {
        name: 'Dark Knight',
        description: 'Wields the power of darkness at great personal cost',
        stats: { hp: 140, mp: 40, attack: 24, defense: 15, speed: 4 },
        abilities: ['Night Sword', 'Dark Wave', 'Sacrifice']
    }
};

// Items
const items = {
    potion: {
        name: 'Potion',
        description: 'Restores 50 HP',
        type: 'consumable',
        effect: 'heal',
        value: 50
    },
    hiPotion: {
        name: 'Hi-Potion',
        description: 'Restores 150 HP',
        type: 'consumable',
        effect: 'heal',
        value: 150
    },
    ether: {
        name: 'Ether',
        description: 'Restores 30 MP',
        type: 'consumable',
        effect: 'mp_heal',
        value: 30
    },
    phoenixDown: {
        name: 'Phoenix Down',
        description: 'Revives a fallen ally',
        type: 'consumable',
        effect: 'revive',
        value: 50
    },
    elixir: {
        name: 'Elixir',
        description: 'Fully restores HP and MP',
        type: 'consumable',
        effect: 'full_heal',
        value: 999
    },
    broadSword: {
        name: 'Broad Sword',
        description: 'A basic but reliable sword',
        type: 'weapon',
        attack: 5
    },
    mythrilSword: {
        name: 'Mythril Sword',
        description: 'A sword forged from mythril',
        type: 'weapon',
        attack: 10
    },
    excalibur: {
        name: 'Excalibur',
        description: 'The legendary holy sword',
        type: 'weapon',
        attack: 25
    }
};

// Locations
const locations = {
    orbonne: {
        id: 'orbonne',
        name: 'Orbonne Monastery',
        description: 'An ancient monastery built of weathered stone. The halls echo with whispered prayers and the scratch of quills on parchment. Sunlight filters through stained glass windows depicting the Zodiac Braves.',
        npcs: [
            {
                name: 'Elder Simon',
                dialogue: 'Welcome, young squire. Dark times are upon Ivalice. The church speaks of heretics, but I fear the truth is far more complex. Seek the Zodiac Stones, but beware their power.',
                quest: 'The Zodiac Conspiracy'
            },
            {
                name: 'Princess Ovelia',
                dialogue: 'I sense a great destiny about you. The stones... they call to those who would shape history. But at what cost?'
            }
        ],
        exits: ['south', 'east'],
        connections: {
            south: 'dorter',
            east: 'mandalia'
        }
    },
    dorter: {
        id: 'dorter',
        name: 'Dorter Trade City',
        description: 'A bustling merchant town with narrow cobblestone streets. Vendors hawk their wares while mercenaries lounge in tavern doorways. The smell of spices and steel fills the air.',
        npcs: [
            {
                name: 'Mustadio',
                dialogue: 'Hey there! I\'m working on some new machinist weapons. The Church doesn\'t approve, but innovation waits for no one! Care to test my latest gun?',
                quest: 'The Machinist\'s Request'
            },
            {
                name: 'Merchant Besrudio',
                dialogue: 'Potions! Ethers! Phoenix Downs! Everything an adventurer needs! Special prices for those who oppose the corrupt nobility!'
            }
        ],
        exits: ['north', 'west', 'south'],
        connections: {
            north: 'orbonne',
            west: 'gariland',
            south: 'ziekden'
        },
        enemies: [
            { name: 'Thief', hp: 60, attack: 12, defense: 5, speed: 8 },
            { name: 'Squire', hp: 70, attack: 10, defense: 6, speed: 5 }
        ]
    },
    mandalia: {
        id: 'mandalia',
        name: 'Mandalia Plains',
        description: 'Rolling grasslands stretch as far as the eye can see. The wind carries the scent of wildflowers and distant rain. This peaceful plain has seen many battles throughout history.',
        npcs: [],
        exits: ['west', 'north', 'east'],
        connections: {
            west: 'orbonne',
            north: 'fovoham',
            east: 'ziekden'
        },
        enemies: [
            { name: 'Goblin', hp: 50, attack: 8, defense: 4, speed: 6 },
            { name: 'Red Panther', hp: 65, attack: 14, defense: 3, speed: 9 },
            { name: 'Chocobo', hp: 80, attack: 10, defense: 5, speed: 10 }
        ]
    },
    gariland: {
        id: 'gariland',
        name: 'Gariland Magic City',
        description: 'Home to the prestigious Military Academy. Young nobles train here in the arts of war and magic. The towers glow with arcane energy at night.',
        npcs: [
            {
                name: 'Instructor Daravon',
                dialogue: 'Ah, a student of combat! Remember: brave story walk on road of legend. Wait, that came out wrong... What I mean is, true strength comes from protecting others!',
                quest: 'Academy Training'
            },
            {
                name: 'Agrias',
                dialogue: 'I serve Princess Ovelia as her bodyguard. These are troubled times - the nobility plots while the common folk suffer. We must stand for justice!'
            }
        ],
        exits: ['east', 'south'],
        connections: {
            east: 'dorter',
            south: 'riovanes'
        }
    },
    ziekden: {
        id: 'ziekden',
        name: 'Ziekden Fortress',
        description: 'A formidable fortress perched on a cliff. Its walls have never been breached by conventional assault. Dark secrets lurk in its depths.',
        npcs: [
            {
                name: 'Wiegraf',
                dialogue: 'The nobility feasts while we starve! Join the Death Corps, and together we\'ll build a world of true equality!',
                quest: 'The Revolution'
            }
        ],
        exits: ['north', 'west'],
        connections: {
            north: 'dorter',
            west: 'mandalia'
        },
        enemies: [
            { name: 'Knight', hp: 100, attack: 15, defense: 10, speed: 3 },
            { name: 'Archer', hp: 70, attack: 13, defense: 5, speed: 6 },
            { name: 'Black Mage', hp: 60, attack: 18, defense: 4, speed: 4 }
        ]
    },
    fovoham: {
        id: 'fovoham',
        name: 'Fovoham Windmills',
        description: 'Giant windmills turn lazily in the breeze, grinding grain for the kingdom. The mechanical sounds blend with the rustle of wheat fields.',
        npcs: [
            {
                name: 'Reis',
                dialogue: 'My love was transformed by a terrible curse... If you find any leads on transformation magic, please let me know.',
                quest: 'The Dragon\'s Curse'
            }
        ],
        exits: ['south', 'east'],
        connections: {
            south: 'mandalia',
            east: 'riovanes'
        },
        enemies: [
            { name: 'Bomb', hp: 55, attack: 16, defense: 2, speed: 5 },
            { name: 'Floating Eye', hp: 45, attack: 12, defense: 3, speed: 7 }
        ]
    },
    riovanes: {
        id: 'riovanes',
        name: 'Riovanes Castle',
        description: 'The seat of power for Duke Barinten. The castle\'s grand halls hide political intrigue and dark ambitions. Guards patrol every corridor.',
        npcs: [
            {
                name: 'Malak',
                dialogue: 'My sister and I serve the Duke, but... something isn\'t right. There are screams from the dungeons at night.',
                quest: 'Castle Conspiracy'
            },
            {
                name: 'Rafa',
                dialogue: 'The Duke saved us, but at what price? Power corrupts even the kindest hearts...'
            }
        ],
        exits: ['north', 'west', 'east'],
        connections: {
            north: 'gariland',
            west: 'fovoham',
            east: 'lionelCastle'
        },
        enemies: [
            { name: 'Assassin', hp: 75, attack: 17, defense: 6, speed: 9 },
            { name: 'Time Mage', hp: 65, attack: 11, defense: 5, speed: 5 }
        ]
    },
    lionelCastle: {
        id: 'lionelCastle',
        name: 'Lionel Castle',
        description: 'Headquarters of the Church of Glabados. Holy symbols adorn every surface, but shadows lurk behind the righteous facade.',
        npcs: [
            {
                name: 'Cardinal Draclau',
                dialogue: 'Welcome, child of Ivalice. The church seeks only peace... though sometimes peace requires... sacrifice.',
                quest: 'The Holy Stone'
            },
            {
                name: 'Alma',
                dialogue: 'Brother! I\'ve been studying the ancient texts. The Lucavi... they\'re not myths. They\'re real, and they\'re coming!'
            }
        ],
        exits: ['west'],
        connections: {
            west: 'riovanes'
        },
        enemies: [
            { name: 'Temple Knight', hp: 120, attack: 18, defense: 12, speed: 4 },
            { name: 'White Mage', hp: 70, attack: 8, defense: 7, speed: 5 },
            { name: 'Summoner', hp: 80, attack: 20, defense: 6, speed: 4 }
        ]
    }
};

// Enemies
const enemyTypes = {
    // Human enemies
    squire: { name: 'Enemy Squire', hp: 70, attack: 10, defense: 6, speed: 5 },
    knight: { name: 'Enemy Knight', hp: 120, attack: 15, defense: 12, speed: 3 },
    archer: { name: 'Enemy Archer', hp: 80, attack: 13, defense: 5, speed: 7 },
    thief: { name: 'Brigand', hp: 60, attack: 12, defense: 4, speed: 9 },
    mage: { name: 'Rogue Mage', hp: 65, attack: 18, defense: 3, speed: 4 },
    
    // Monsters
    goblin: { name: 'Goblin', hp: 50, attack: 8, defense: 4, speed: 6 },
    bomb: { name: 'Bomb', hp: 55, attack: 16, defense: 2, speed: 5 },
    chocobo: { name: 'Wild Chocobo', hp: 90, attack: 11, defense: 6, speed: 10 },
    malboro: { name: 'Malboro', hp: 150, attack: 20, defense: 8, speed: 2 },
    behemoth: { name: 'Behemoth', hp: 200, attack: 25, defense: 15, speed: 4 },
    
    // Lucavi Demons (Bosses)
    cuchulainn: { name: 'Cuchulainn', hp: 500, attack: 35, defense: 20, speed: 6 },
    belias: { name: 'Belias', hp: 450, attack: 40, defense: 18, speed: 5 },
    hashmal: { name: 'Hashmal', hp: 600, attack: 38, defense: 25, speed: 3 }
};
