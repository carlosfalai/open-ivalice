// Open Ivalice: Aftermath - Expanded Game Data
// Set one month after the War of the Lions

// Job System remains the same - Classic FFT Jobs
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

// Items (expanded)
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
    xPotion: {
        name: 'X-Potion',
        description: 'Restores 300 HP',
        type: 'consumable',
        effect: 'heal',
        value: 300
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
    bloodSword: {
        name: 'Blood Sword',
        description: 'Drains life from enemies',
        type: 'weapon',
        attack: 15
    },
    excalibur: {
        name: 'Excalibur',
        description: 'The legendary holy sword',
        type: 'weapon',
        attack: 25
    },
    chaosBlade: {
        name: 'Chaos Blade',
        description: 'Born from the War of the Lions',
        type: 'weapon',
        attack: 30
    }
};

// Expanded World Map - 24 locations (3x original 8)
const locations = {
    // === ORIGINAL REGION - WAR-TORN CENTRAL IVALICE ===
    orbonne: {
        id: 'orbonne',
        name: 'Orbonne Monastery - Ruins',
        description: 'Once a sacred monastery, now scarred by war. Broken stained glass litters the floors. The Virgo Stone\'s power still resonates in the air. Refugees shelter in the damaged halls.',
        npcs: [
            {
                name: 'Elder Simon',
                dialogue: 'The War of the Lions ended, but at what cost? Ramza saved us all, yet history will paint him a heretic. The Church scrambles to hide their sins while new powers rise from the ashes.',
                quest: 'The Hidden Truth'
            },
            {
                name: 'Refugee Captain',
                dialogue: 'We fought for Duke Goltanna... now we have nothing. The nobility abandoned us when the Lucavi appeared. Help us find purpose again!'
            }
        ],
        exits: ['south', 'east', 'north'],
        connections: {
            south: 'dorter',
            east: 'mandalia',
            north: 'monasteryCatacombs'
        }
    },
    
    monasteryCatacombs: {
        id: 'monasteryCatacombs',
        name: 'Orbonne Underground',
        description: 'Secret catacombs beneath the monastery. Ancient Zodiac symbols glow faintly on the walls. The air thrums with residual power from the Virgo Stone.',
        npcs: [
            {
                name: 'Mysterious Scholar',
                dialogue: 'The twelve stones... they were but fragments of something greater. The thirteenth stone, Serpentarius, was shattered long ago. Its pieces could restore or destroy everything.',
                quest: 'The Thirteenth Zodiac'
            }
        ],
        exits: ['south', 'east'],
        connections: {
            south: 'orbonne',
            east: 'ancientSanctum'
        },
        enemies: [
            { name: 'Stone Gargoyle', hp: 120, attack: 18, defense: 14, speed: 3 },
            { name: 'Revenant', hp: 90, attack: 16, defense: 8, speed: 5 }
        ]
    },

    ancientSanctum: {
        id: 'ancientSanctum',
        name: 'The Serpentarius Chamber',
        description: 'A hidden sanctum older than Ivalice itself. Murals depict thirteen Zodiac Braves, not twelve. The final brave holds a serpent staff, their face scratched away.',
        npcs: [],
        exits: ['west', 'north'],
        connections: {
            west: 'monasteryCatacombs',
            north: 'crystallinePath'
        },
        enemies: [
            { name: 'Crystal Guardian', hp: 200, attack: 25, defense: 20, speed: 4 },
            { name: 'Archaeodemon', hp: 180, attack: 28, defense: 15, speed: 6 }
        ]
    },

    dorter: {
        id: 'dorter',
        name: 'Dorter - Merchant Quarter',
        description: 'The trade city struggles to rebuild. War profiteers sell "authentic" Zodiac Stone fragments while desperate veterans beg for work. The Beoulve name is whispered in fear and awe.',
        npcs: [
            {
                name: 'Mustadio',
                dialogue: 'My guns helped end the war, but technology frightens people now. They\'ve seen what the Church\'s "miracles" truly were. I\'m developing something new - a way to detect authentic Zodiac energy.',
                quest: 'The Stone Detector'
            },
            {
                name: 'War Merchant',
                dialogue: 'Chaos Blades! Forged from metals found at battlefields where Lucavi fell! Genuine article, only 5000 gil!'
            }
        ],
        exits: ['north', 'west', 'south', 'east'],
        connections: {
            north: 'orbonne',
            west: 'gariland',
            south: 'ziekden',
            east: 'tradersRoad'
        },
        enemies: [
            { name: 'Desperate Brigand', hp: 70, attack: 14, defense: 6, speed: 8 },
            { name: 'War Deserter', hp: 80, attack: 12, defense: 8, speed: 5 }
        ]
    },

    tradersRoad: {
        id: 'tradersRoad',
        name: 'Trader\'s Road',
        description: 'Once bustling with merchant caravans, now plagued by bandits and monsters displaced by war. Broken wagons and old battlefields dot the landscape.',
        npcs: [
            {
                name: 'Caravan Guard',
                dialogue: 'The roads aren\'t safe anymore. Monsters driven from their homes by the war, soldiers turned bandits... We need protection to reach Warjilis.'
            }
        ],
        exits: ['west', 'east', 'south'],
        connections: {
            west: 'dorter',
            east: 'warjilis',
            south: 'ranch'
        },
        enemies: [
            { name: 'Highway Thief', hp: 75, attack: 15, defense: 5, speed: 9 },
            { name: 'Dire Wolf', hp: 85, attack: 17, defense: 6, speed: 10 }
        ]
    },

    // === THE GALLIONE REGION - BEOULVE TERRITORY ===
    gariland: {
        id: 'gariland',
        name: 'Gariland - Academy Ruins',
        description: 'The Military Academy, half-destroyed in the final battles. Students train amongst rubble, determined to rebuild. Anti-Church sentiment runs high after the truth of the Lucavi was revealed.',
        npcs: [
            {
                name: 'Instructor Daravon',
                dialogue: 'History is being rewritten as we speak. The Church claims the Lucavi were merely rebels using forbidden magic. But we who survived know the truth. Train hard - darker days may yet come.',
                quest: 'Academy Reconstruction'
            },
            {
                name: 'Alma Beoulve',
                dialogue: 'Brother vanished after Mullonde fell. Some say he died, others that he travels distant lands. I know he lives - I can feel it. The stones still call to those with our bloodline.'
            }
        ],
        exits: ['east', 'south', 'north', 'west'],
        connections: {
            east: 'dorter',
            south: 'riovanes',
            north: 'beoulveManor',
            west: 'gallionePlains'
        }
    },

    beoulveManor: {
        id: 'beoulveManor',
        name: 'Eagrose - House Beoulve',
        description: 'The ancestral Beoulve home stands empty. Dycedarg dead, Zalbag fallen, Ramza vanished. Only ghosts and memories remain in these noble halls.',
        npcs: [
            {
                name: 'Old Retainer',
                dialogue: 'Lord Ramza was no heretic! He saved us all! But House Beoulve is finished... The other nobles fear our name now, fear the power we once held.'
            }
        ],
        exits: ['south', 'east'],
        connections: {
            south: 'gariland',
            east: 'northernHighlands'
        },
        enemies: [
            { name: 'Vengeful Spirit', hp: 100, attack: 20, defense: 10, speed: 4 },
            { name: 'Beoulve Ghost', hp: 150, attack: 22, defense: 12, speed: 3 }
        ]
    },

    gallionePlains: {
        id: 'gallionePlains',
        name: 'Gallione Plains',
        description: 'Vast grasslands where the first battles of the War began. Rusted weapons and old bones still surface after heavy rains. Nature slowly reclaims the battlefields.',
        npcs: [],
        exits: ['east', 'north', 'west'],
        connections: {
            east: 'gariland',
            north: 'northernHighlands',
            west: 'limberryGate'
        },
        enemies: [
            { name: 'Wild Chocobo', hp: 90, attack: 11, defense: 6, speed: 11 },
            { name: 'Treant', hp: 140, attack: 19, defense: 10, speed: 2 },
            { name: 'Great Malboro', hp: 170, attack: 21, defense: 9, speed: 3 }
        ]
    },

    // === THE FOVOHAM REGION - INDUSTRIAL RECOVERY ===
    fovoham: {
        id: 'fovoham',
        name: 'Fovoham Windflats',
        description: 'The windmills turn again, grinding grain for a hungry nation. Engineers work to harness wind power for more than mills, inspired by Mustadio\'s innovations.',
        npcs: [
            {
                name: 'Chief Engineer',
                dialogue: 'We\'re entering a new age! No more relying on stones and magic - mechanical power will rebuild Ivalice! Join the industrial revolution!'
            },
            {
                name: 'Reis (Human Form)',
                dialogue: 'Beowulf and I search for others cursed by the stones. The war ended but the Zodiac powers linger. Help us find and free them.',
                quest: 'The Cursed Ones'
            }
        ],
        exits: ['south', 'east', 'north'],
        connections: {
            south: 'mandalia',
            east: 'riovanes',
            north: 'miningTown'
        },
        enemies: [
            { name: 'Bomb', hp: 55, attack: 16, defense: 2, speed: 5 },
            { name: 'Floating Eye', hp: 45, attack: 12, defense: 3, speed: 7 }
        ]
    },

    miningTown: {
        id: 'miningTown',
        name: 'Gollund Coal Mines',
        description: 'Deep mines that fuel the new industrial age. Workers report strange crystals that glow with zodiacal light deep in the shafts.',
        npcs: [
            {
                name: 'Mine Foreman',
                dialogue: 'We dug too deep and found something ancient. Crystal formations that sing with power. The Church wants them sealed, but think of the possibilities!'
            }
        ],
        exits: ['south', 'east', 'west'],
        connections: {
            south: 'fovoham',
            east: 'crystallinePath',
            west: 'northernHighlands'
        },
        enemies: [
            { name: 'Crystal Mimic', hp: 110, attack: 18, defense: 16, speed: 3 },
            { name: 'Deep Crawler', hp: 95, attack: 17, defense: 8, speed: 7 }
        ]
    },

    crystallinePath: {
        id: 'crystallinePath',
        name: 'The Crystal Road',
        description: 'A cavern path lined with naturally occurring Zodiac crystals. Their light reveals visions of past and future. Many who enter emerge changed... or mad.',
        npcs: [
            {
                name: 'Crystal Sage',
                dialogue: 'The stones were never meant to be separated. They\'re fragments of a cosmic whole, a power that predates human civilization. Reuniting them could ascend humanity... or end it.'
            }
        ],
        exits: ['west', 'south', 'east'],
        connections: {
            west: 'miningTown',
            south: 'ancientSanctum',
            east: 'deepDungeon'
        },
        enemies: [
            { name: 'Crystal Dragon', hp: 250, attack: 30, defense: 22, speed: 5 },
            { name: 'Lucavi Echo', hp: 200, attack: 28, defense: 18, speed: 6 }
        ]
    },

    // === THE LIONEL REGION - CHURCH REFORMATION ===
    lionelCastle: {
        id: 'lionelCastle',
        name: 'Lionel - New Church Headquarters',
        description: 'The Church struggles to maintain power after the Lucavi revelation. Reformed priests preach redemption while traditionalists plot in shadows. The truth war continues.',
        npcs: [
            {
                name: 'High Confessor',
                dialogue: 'We were deceived by demons masquerading as holy men! The true faith must be rebuilt on honesty, not lies. But many refuse to accept the truth...',
                quest: 'Church Reformation'
            },
            {
                name: 'Orran Durai',
                dialogue: 'I\'ve documented everything - the true history of the War of the Lions. But they want to burn my writings, call them heresy. The truth must survive!'
            }
        ],
        exits: ['west', 'east', 'south'],
        connections: {
            west: 'riovanes',
            east: 'zeltennia',
            south: 'lionelBridge'
        },
        enemies: [
            { name: 'Inquisitor Knight', hp: 130, attack: 19, defense: 14, speed: 4 },
            { name: 'Heretic Hunter', hp: 100, attack: 17, defense: 10, speed: 7 }
        ]
    },

    lionelBridge: {
        id: 'lionelBridge',
        name: 'Lionel Bridge',
        description: 'A massive stone bridge over the Bugross Sea inlet. Site of the final battle between Church loyalists and reformers. Blood still stains the stones.',
        npcs: [
            {
                name: 'Bridge Guard',
                dialogue: 'They say on foggy nights you can still hear the clash of swords and dying prayers. The war ended but the fighting never stops.'
            }
        ],
        exits: ['north', 'south'],
        connections: {
            north: 'lionelCastle',
            south: 'portCity'
        },
        enemies: [
            { name: 'Bridge Troll', hp: 180, attack: 24, defense: 18, speed: 2 },
            { name: 'Sea Serpent', hp: 160, attack: 22, defense: 12, speed: 6 }
        ]
    },

    // === THE ZELTENNIA REGION - NOBLE POWER STRUGGLES ===
    zeltennia: {
        id: 'zeltennia',
        name: 'Zeltennia Castle',
        description: 'Duke Druksmald\'s fortress, now ruled by his ambitious son. The young duke seeks to fill the power vacuum left by the war, gathering Zodiac Stone fragments.',
        npcs: [
            {
                name: 'Duke Druksmald Jr.',
                dialogue: 'The old powers have fallen! Goltanna, Larg, even the Church weakened! A new order rises, and Zeltennia shall lead it! Join me or be swept aside!',
                quest: 'The New Order'
            },
            {
                name: 'Court Astrologer',
                dialogue: 'The stars speak of a thirteenth constellation rising. Serpentarius, the healer and destroyer. Its stone was broken into three parts centuries ago...'
            }
        ],
        exits: ['west', 'south', 'east'],
        connections: {
            west: 'lionelCastle',
            south: 'warjilis',
            east: 'limberty'
        }
    },

    // === THE LIMBERRY REGION - MARQUISATE IN CHAOS ===
    limberty: {
        id: 'limberty',
        name: 'Limberry Castle',
        description: 'The Marquis Elmdore\'s domain, abandoned after his transformation into the Lucavi Zalera. Cultists now worship in the throne room, seeking to resurrect their dark master.',
        npcs: [
            {
                name: 'Celia (Ghost)',
                dialogue: 'Master Elmdore transcended mortality! He will return! The Gemini Stone still pulses with his essence! You cannot stop the resurrection!'
            }
        ],
        exits: ['west', 'south', 'east'],
        connections: {
            west: 'zeltennia',
            south: 'limbertySouth',
            east: 'limberryGate'
        },
        enemies: [
            { name: 'Zalera Cultist', hp: 110, attack: 18, defense: 11, speed: 5 },
            { name: 'Assassin Shade', hp: 90, attack: 20, defense: 8, speed: 9 },
            { name: 'Vampire', hp: 150, attack: 22, defense: 13, speed: 6 }
        ]
    },

    limberryGate: {
        id: 'limberryGate',
        name: 'Limberry Eastern Gate',
        description: 'The eastern entrance to Limberry, now a refugee camp for those fleeing the cultist occupation. Brave warriors gather here to reclaim the castle.',
        npcs: [
            {
                name: 'Resistance Leader',
                dialogue: 'We must reclaim Limberry from the cultists! They perform dark rituals nightly. Join our assault at dawn!'
            }
        ],
        exits: ['west', 'east', 'south'],
        connections: {
            west: 'limberty',
            east: 'gallionePlains',
            south: 'ranch'
        },
        enemies: [
            { name: 'Cultist Scout', hp: 80, attack: 15, defense: 7, speed: 8 }
        ]
    },

    // === SPECIAL LOCATIONS ===
    ranch: {
        id: 'ranch',
        name: 'Monster Ranch',
        description: 'A sanctuary for captured monsters, run by a reformed poacher. Here, wild beasts can be tamed, bred, or traded for rare materials. The rancher claims to have once served in Ramza\'s party.',
        npcs: [
            {
                name: 'Master Rancher',
                dialogue: 'I learned from the best monster tamers in Ivalice! Bring me your captured beasts - I\'ll help you train them or trade them for valuable resources. The rarer the monster, the better the reward!',
                quest: 'Rare Beast Hunt'
            },
            {
                name: 'Monster Breeder',
                dialogue: 'Chocobos are nice, but have you seen a trained Behemoth in action? With proper care, any monster can become an ally!'
            }
        ],
        exits: ['north', 'west', 'east'],
        connections: {
            north: 'tradersRoad',
            west: 'limberryGate',
            east: 'mandalia'
        }
    },

    mandalia: {
        id: 'mandalia',
        name: 'Mandalia Plains',
        description: 'The crossroads of Ivalice, where all paths meet. Mercenaries gather here seeking work, and mysterious travelers share tales of distant lands where Ramza was last seen.',
        npcs: [
            {
                name: 'Wandering Minstrel',
                dialogue: 'I sing of Ramza the Heretic, who saved us all yet asked for nothing! Some say he sails eastern seas, others that he guards the Deep Dungeon\'s secrets.'
            }
        ],
        exits: ['west', 'north', 'east', 'south'],
        connections: {
            west: 'orbonne',
            north: 'fovoham',
            east: 'ziekden',
            south: 'ranch'
        },
        enemies: [
            { name: 'Goblin', hp: 50, attack: 8, defense: 4, speed: 6 },
            { name: 'Red Panther', hp: 65, attack: 14, defense: 3, speed: 9 },
            { name: 'Chocobo', hp: 80, attack: 10, defense: 5, speed: 10, maxHp: 80 }
        ]
    },

    ziekden: {
        id: 'ziekden',
        name: 'Fort Ziekden - Memorial',
        description: 'The fortress where the War of the Lions began with Delita\'s sister\'s death. Now a memorial to all who died. Delita, the common-born king, visits annually.',
        npcs: [
            {
                name: 'Memorial Keeper',
                dialogue: 'King Delita comes here alone each year. He speaks to the wind, asking forgiveness from ghosts. The crown weighs heavy on those who seize it through blood.'
            }
        ],
        exits: ['north', 'west', 'south'],
        connections: {
            north: 'dorter',
            west: 'mandalia',
            south: 'portCity'
        }
    },

    // === THE RIOVANES REGION ===
    riovanes: {
        id: 'riovanes',
        name: 'Riovanes Castle',
        description: 'Grand Duke Barrington\'s seat, where Wiegraf became the Lucavi Belias. The castle is being rebuilt, but workers report nightmares and visions of demons in the throne room.',
        npcs: [
            {
                name: 'Malak',
                dialogue: 'My sister Rafa and I use our Heaven and Hell magicks to cleanse this place of Lucavi taint. But some evils run too deep. We need help to purify the throne room.',
                quest: 'Cleansing Riovanes'
            },
            {
                name: 'Rafa',
                dialogue: 'The walls remember the horror. I can hear Wiegraf\'s screams as Belias consumed him. Such is the price of power without wisdom.'
            }
        ],
        exits: ['north', 'west', 'east', 'south'],
        connections: {
            north: 'gariland',
            west: 'fovoham',
            east: 'lionelCastle',
            south: 'riovanesWaterway'
        },
        enemies: [
            { name: 'Demon Spawn', hp: 95, attack: 17, defense: 9, speed: 6 },
            { name: 'Possessed Knight', hp: 120, attack: 19, defense: 13, speed: 3 }
        ]
    },

    riovanesWaterway: {
        id: 'riovanesWaterway',
        name: 'Riovanes Waterway',
        description: 'Secret passages beneath Riovanes, flooded and monster-infested. Rumors speak of Belias\'s soul crystal still hidden in the depths.',
        npcs: [],
        exits: ['north', 'east'],
        connections: {
            north: 'riovanes',
            east: 'underworldGate'
        },
        enemies: [
            { name: 'Water Elemental', hp: 140, attack: 21, defense: 11, speed: 5 },
            { name: 'Kraken Spawn', hp: 160, attack: 23, defense: 14, speed: 4 }
        ]
    },

    // === THE SOUTHERN REGIONS ===
    portCity: {
        id: 'portCity',
        name: 'Warjilis Trade Port',
        description: 'Ivalice\'s greatest port, gateway to eastern lands. Ships arrive with tales of a blonde swordsman who fights injustice in foreign kingdoms. The docks bustle with opportunity and danger.',
        npcs: [
            {
                name: 'Ship Captain',
                dialogue: 'Aye, I\'ve seen him! A young warrior with eyes that have witnessed hell. He travels under false names, but the sword work is unmistakable. Ramza Beoulve lives!',
                quest: 'Eastern Passages'
            },
            {
                name: 'Trader Liaison',
                dialogue: 'New trade routes open daily! The war\'s end brought opportunity for those brave enough. Rare items from distant lands - for the right price.'
            }
        ],
        exits: ['north', 'east', 'west'],
        connections: {
            north: 'lionelBridge',
            east: 'warjilis',
            west: 'coastalPath'
        },
        enemies: [
            { name: 'Pirate', hp: 85, attack: 16, defense: 7, speed: 7 },
            { name: 'Sea Slime', hp: 70, attack: 12, defense: 12, speed: 4 }
        ]
    },

    warjilis: {
        id: 'warjilis',
        name: 'Warjilis Free City',
        description: 'A city-state that remained neutral during the war, now thriving as a trade hub. Mercenaries, merchants, and mystics gather here. All are welcome if they have coin.',
        npcs: [
            {
                name: 'Mercenary Guildmaster',
                dialogue: 'Work is plentiful for skilled warriors! Monster hunting, escort missions, artifact recovery. The War created chaos, and chaos creates opportunity!',
                quest: 'Mercenary License'
            },
            {
                name: 'Information Broker',
                dialogue: 'I know things... For 1000 gil, I\'ll tell you where to find Construct 8. For 5000, the location of Elidibus\'s serpent stone fragment...'
            }
        ],
        exits: ['west', 'north', 'south'],
        connections: {
            west: 'tradersRoad',
            north: 'zeltennia',
            south: 'necropolisGate'
        }
    },

    coastalPath: {
        id: 'coastalPath',
        name: 'Bugross Coastal Road',
        description: 'A scenic path along the sea cliffs. Pirates hide in caves, while honest fishermen speak of sea monsters bearing Zodiac marks on their scales.',
        npcs: [
            {
                name: 'Old Fisherman',
                dialogue: 'The sea changed after the war. Creatures from the deep rise more often. They bear strange marks - like the Zodiac symbols but different. Ancient things wake.'
            }
        ],
        exits: ['east', 'south'],
        connections: {
            east: 'portCity',
            south: 'hiddenCove'
        },
        enemies: [
            { name: 'Sahagin', hp: 95, attack: 16, defense: 9, speed: 6 },
            { name: 'Sea Dragon', hp: 180, attack: 24, defense: 15, speed: 5 }
        ]
    },

    hiddenCove: {
        id: 'hiddenCove',
        name: 'Pirate\'s Hidden Cove',
        description: 'A secret harbor used by smugglers and pirates. They trade in forbidden items - including fragments of Zodiac Stones and Lucavi artifacts.',
        npcs: [
            {
                name: 'Pirate King',
                dialogue: 'We salvage what the Church tries to sink! Zodiac fragments, demon weapons, forbidden tomes - everything has a price! But beware, such power corrupts...'
            }
        ],
        exits: ['north', 'east'],
        connections: {
            north: 'coastalPath',
            east: 'underworldGate'
        },
        enemies: [
            { name: 'Pirate Captain', hp: 120, attack: 19, defense: 11, speed: 8 },
            { name: 'Kraken', hp: 300, attack: 28, defense: 18, speed: 3 }
        ]
    },

    // === THE FORBIDDEN ZONES ===
    deepDungeon: {
        id: 'deepDungeon',
        name: 'Midlight\'s Deep - Entrance',
        description: 'The legendary Deep Dungeon, where reality bends and time flows strangely. Warriors enter seeking power but many never return. Zodiac energy permeates everything here.',
        npcs: [
            {
                name: 'Dungeon Survivor',
                dialogue: 'Ten floors down, I saw him - Ramza! But he warned me back, said the deeper levels weren\'t meant for mortals. The Serpentarius Guardian dwells at the bottom...',
                quest: 'Deep Dungeon Expedition'
            }
        ],
        exits: ['west', 'down'],
        connections: {
            west: 'crystallinePath',
            down: 'deepDungeonDepths'
        },
        enemies: [
            { name: 'Byblos', hp: 200, attack: 25, defense: 20, speed: 5 },
            { name: 'Iron Giant', hp: 280, attack: 30, defense: 25, speed: 2 },
            { name: 'Ultima Demon', hp: 350, attack: 35, defense: 22, speed: 6 }
        ]
    },

    deepDungeonDepths: {
        id: 'deepDungeonDepths',
        name: 'Midlight\'s Deep - Terminus',
        description: 'The deepest point of the dungeon. Here, the barrier between dimensions weakens. The Serpentarius Crystal resonates, waiting for one worthy to claim its power.',
        npcs: [
            {
                name: 'Elidibus (Spirit)',
                dialogue: 'You who would claim the thirteenth stone... Know that it grants the power to rewrite fate itself. But every change demands a price. Ramza knew this, and chose exile over godhood.'
            }
        ],
        exits: ['up'],
        connections: {
            up: 'deepDungeon'
        },
        enemies: [
            { name: 'Serpentarius', hp: 999, attack: 50, defense: 30, speed: 8 },
            { name: 'Zodiark', hp: 666, attack: 45, defense: 35, speed: 6 }
        ]
    },

    necropolisGate: {
        id: 'necropolisGate',
        name: 'Mullonde Necropolis',
        description: 'The entrance to the sunken holy city of Mullonde. After the Church\'s defeat, the city sank into a dimensional rift. Now only the bravest dare enter seeking lost relics.',
        npcs: [
            {
                name: 'Dimension Scholar',
                dialogue: 'Mullonde exists between worlds now - neither fully here nor there. The High Seraph\'s death tore reality. Enter at your own risk.'
            }
        ],
        exits: ['north', 'down'],
        connections: {
            north: 'warjilis',
            down: 'mullondeRuins'
        }
    },

    mullondeRuins: {
        id: 'mullondeRuins',
        name: 'Mullonde Cathedral - Ruins',
        description: 'The grand cathedral where Folmarv became Hashmalum. Reality is unstable here. Past, present, and future blend. Echoes of the final battle replay endlessly.',
        npcs: [
            {
                name: 'Folmarv (Echo)',
                dialogue: 'The auracite... such beautiful lies it whispered! Power, justice, godhood! But we were merely puppets. The stones have their own agenda...'
            }
        ],
        exits: ['up', 'portal'],
        connections: {
            up: 'necropolisGate',
            portal: 'airshipGraveyard'
        },
        enemies: [
            { name: 'Hashmalum Echo', hp: 500, attack: 40, defense: 28, speed: 4 },
            { name: 'Arch Seraph', hp: 450, attack: 38, defense: 25, speed: 7 }
        ]
    },

    underworldGate: {
        id: 'underworldGate',
        name: 'The Lucavi Gate',
        description: 'A dimensional tear left by the Lucavi\'s defeat. Through it, one can glimpse the demon realm. Cultists gather here, trying to widen the rift.',
        npcs: [
            {
                name: 'Cultist Leader',
                dialogue: 'The Lucavi were not destroyed, merely banished! We will tear open this gate and welcome their return! The age of demons comes again!'
            }
        ],
        exits: ['west', 'north'],
        connections: {
            west: 'riovanesWaterway',
            north: 'hiddenCove'
        },
        enemies: [
            { name: 'Gate Guardian', hp: 300, attack: 32, defense: 24, speed: 5 },
            { name: 'Void Spawn', hp: 200, attack: 28, defense: 20, speed: 7 }
        ]
    },

    airshipGraveyard: {
        id: 'airshipGraveyard',
        name: 'Ancient Airship Graveyard',
        description: 'A field of crashed airships from a lost civilization. Their power sources - proto-auracite - still function. The secrets of flight might be reclaimed here.',
        npcs: [
            {
                name: 'Construct 8',
                dialogue: 'SYSTEMS...OPERATIONAL. THIS UNIT...REMEMBERS. THE ANCIENTS...CREATED STONES. WARNED...AGAINST...THEIR USE. HISTORY...REPEATS.',
                quest: 'Ancient Technology'
            }
        ],
        exits: ['portal', 'north'],
        connections: {
            portal: 'mullondeRuins',
            north: 'northernHighlands'
        },
        enemies: [
            { name: 'Automaton', hp: 150, attack: 20, defense: 22, speed: 3 },
            { name: 'Sky Pirate Ghost', hp: 110, attack: 18, defense: 10, speed: 8 }
        ]
    },

    northernHighlands: {
        id: 'northernHighlands',
        name: 'The Northern Highlands',
        description: 'Frozen wastes where the War never reached. Here, ancient monasteries preserve pre-Zodiac history. The truth of the stones\' origin might be found in their libraries.',
        npcs: [
            {
                name: 'Mountain Hermit',
                dialogue: 'The stones fell from the sky eons ago, gifts from dying gods. Each carries a fragment of divine will. Mortals were never meant to wield such power.'
            }
        ],
        exits: ['south', 'west', 'east'],
        connections: {
            south: 'gallionePlains',
            west: 'beoulveManor',
            east: 'miningTown'
        },
        enemies: [
            { name: 'Ice Dragon', hp: 220, attack: 26, defense: 20, speed: 4 },
            { name: 'Yeti', hp: 180, attack: 24, defense: 16, speed: 3 },
            { name: 'Frost Lich', hp: 150, attack: 28, defense: 12, speed: 5 }
        ]
    },

    limbertySouth: {
        id: 'limbertySouth',
        name: 'Limberry Badlands',
        description: 'Desolate lands south of Limberry, twisted by Zalera\'s presence. The earth itself is poisoned. Only the desperate or mad venture here.',
        npcs: [],
        exits: ['north'],
        connections: {
            north: 'limberty'
        },
        enemies: [
            { name: 'Zalera Spawn', hp: 130, attack: 21, defense: 13, speed: 6 },
            { name: 'Corruption Elemental', hp: 160, attack: 23, defense: 15, speed: 4 },
            { name: 'Mad Cultist', hp: 90, attack: 18, defense: 8, speed: 7 }
        ]
    }
};

// Enemy Templates (Expanded)
const enemyTypes = {
    // Human enemies - War survivors and opportunists
    squire: { name: 'Desperate Squire', hp: 70, attack: 10, defense: 6, speed: 5 },
    knight: { name: 'Fallen Knight', hp: 120, attack: 15, defense: 12, speed: 3 },
    archer: { name: 'Rogue Archer', hp: 80, attack: 13, defense: 5, speed: 7 },
    thief: { name: 'War Profiteer', hp: 60, attack: 12, defense: 4, speed: 9 },
    mage: { name: 'Mad Mage', hp: 65, attack: 18, defense: 3, speed: 4 },
    priest: { name: 'Heretic Priest', hp: 75, attack: 14, defense: 7, speed: 5 },
    
    // Monsters - Mutated by Zodiac energies
    goblin: { name: 'Goblin', hp: 50, attack: 8, defense: 4, speed: 6, maxHp: 50 },
    bomb: { name: 'Bomb', hp: 55, attack: 16, defense: 2, speed: 5, maxHp: 55 },
    chocobo: { name: 'Wild Chocobo', hp: 90, attack: 11, defense: 6, speed: 10, maxHp: 90 },
    malboro: { name: 'Malboro', hp: 150, attack: 20, defense: 8, speed: 2, maxHp: 150 },
    behemoth: { name: 'Behemoth', hp: 200, attack: 25, defense: 15, speed: 4, maxHp: 200 },
    dragon: { name: 'Dragon', hp: 250, attack: 28, defense: 18, speed: 5, maxHp: 250 },
    
    // Zodiac-touched enemies
    demonSpawn: { name: 'Demon Spawn', hp: 100, attack: 18, defense: 10, speed: 6 },
    lucaviCultist: { name: 'Lucavi Cultist', hp: 110, attack: 16, defense: 9, speed: 5 },
    zodiakBeast: { name: 'Zodiak Beast', hp: 180, attack: 24, defense: 14, speed: 4 },
    
    // Legendary enemies (mini-bosses)
    constructAutomaton: { name: 'War Construct', hp: 300, attack: 30, defense: 25, speed: 2 },
    eliteTemplar: { name: 'Elite Templar', hp: 200, attack: 22, defense: 18, speed: 5 },
    ancientWyrm: { name: 'Ancient Wyrm', hp: 400, attack: 35, defense: 22, speed: 3 },
    
    // The Lucavi Remnants (Boss tier)
    cuchulainn: { name: 'Cuchulainn Echo', hp: 500, attack: 35, defense: 20, speed: 6 },
    belias: { name: 'Belias Shade', hp: 450, attack: 40, defense: 18, speed: 5 },
    hashmal: { name: 'Hashmal Fragment', hp: 600, attack: 38, defense: 25, speed: 3 },
    ultima: { name: 'Ultima Seraph', hp: 700, attack: 42, defense: 28, speed: 7 },
    zodiark: { name: 'Zodiark Avatar', hp: 999, attack: 50, defense: 30, speed: 8 }
};

// Add canonical advanced jobs used by story characters
jobs.holyknight = {
    name: 'Holy Knight',
    description: 'A holy sword master who channels sacred power into sword strikes',
    stats: { hp: 140, mp: 50, attack: 22, defense: 16, speed: 5 },
    abilities: ['Stasis Sword', 'Split Punch', 'Lightning Stab', 'Holy Explosion']
};

jobs.machinist = {
    name: 'Machinist',
    description: 'A firearm specialist who uses devices to hinder foes',
    stats: { hp: 95, mp: 40, attack: 16, defense: 10, speed: 7 },
    abilities: ['Leg Shot', 'Arm Shot', 'Seal Evil', 'Snipe']
};

jobs.swordsaint = {
    name: 'Sword Saint',
    description: 'The pinnacle of swordsmanship, mastering all swordskills',
    stats: { hp: 160, mp: 60, attack: 28, defense: 20, speed: 6 },
    abilities: ['Hallowed Bolt', 'Divine Ruination', 'Crushing Blow', 'Cleansing Strike']
};

// Ensure lowercase key for Dark Knight mapping works
jobs.darkknight = jobs.darkKnight;

// Five new Aftermath jobs
jobs.spellblade = {
    name: 'Spellblade',
    description: 'Imbues weapons with elemental and arcane power',
    stats: { hp: 120, mp: 55, attack: 20, defense: 12, speed: 6 },
    abilities: ['Firebrand', 'Icebrand', 'Thunderbrand', 'Runic']
};

jobs.templar = {
    name: 'Templar',
    description: 'An elite church knight who mixes swordplay with holy arts',
    stats: { hp: 135, mp: 45, attack: 22, defense: 18, speed: 4 },
    abilities: ['Smite', 'Sanction', 'Aegis', 'Censure']
};

jobs.ranger = {
    name: 'Ranger',
    description: 'A hunter who excels at ranged attacks and battlefield control',
    stats: { hp: 100, mp: 30, attack: 18, defense: 10, speed: 9 },
    abilities: ['Mark', 'Twin Shot', 'Trap', 'Camouflage']
};

jobs.beastmaster = {
    name: 'Beastmaster',
    description: 'Commands and tames monsters, turning foes into allies',
    stats: { hp: 110, mp: 40, attack: 16, defense: 9, speed: 7 },
    abilities: ['Tame', 'Beast Command', 'Howl', 'Release']
};

jobs.arcanist = {
    name: 'Arcanist',
    description: 'Wields gravity and space-bending magicks from beyond the stars',
    stats: { hp: 80, mp: 70, attack: 14, defense: 8, speed: 5 },
    abilities: ['Gravity', 'Comet', 'Banish', 'Warp']
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { jobs, items, locations, enemyTypes };
}
