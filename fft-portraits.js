// FFT Character Portrait System
// Loads official character portraits from Final Fantasy Tactics

const FFTPortraits = {
    // Main story characters with their official portrait URLs
    characters: {
        // Chapter 1-4 Ramza variants
        'ramza': {
            name: 'Ramza Beoulve',
            portraits: {
                chapter1: 'https://static.wikia.nocookie.net/finalfantasy/images/2/2f/FFT_Ramza_Beoulve_Ch1_Portrait.png',
                chapter2: 'https://static.wikia.nocookie.net/finalfantasy/images/8/8e/FFT_Ramza_Beoulve_Ch2%263_Portrait.png',
                chapter4: 'https://static.wikia.nocookie.net/finalfantasy/images/e/e9/FFT_Ramza_Beoulve_Ch4_Portrait.png',
                default: 'https://static.wikia.nocookie.net/finalfantasy/images/e/e9/FFT_Ramza_Beoulve_Ch4_Portrait.png'
            }
        },
        'delita': {
            name: 'Delita Heiral',
            portraits: {
                chapter1: 'https://static.wikia.nocookie.net/finalfantasy/images/f/f8/FFT_Delita_Heiral_Portrait.png',
                king: 'https://static.wikia.nocookie.net/finalfantasy/images/9/99/FFT_Delita_Hyral_Portrait_2.png',
                default: 'https://static.wikia.nocookie.net/finalfantasy/images/9/99/FFT_Delita_Hyral_Portrait_2.png'
            }
        },
        'ovelia': {
            name: 'Princess Ovelia Atkascha',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/3/3b/FFT_Ovelia_Atkascha_Portrait.png'
        },
        'alma': {
            name: 'Alma Beoulve',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/0/03/FFT_Alma_Beoulve_Portrait.png'
        },
        'agrias': {
            name: 'Agrias Oaks',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/e/e0/FFT_Agrias_Oaks_Portrait.png'
        },
        'mustadio': {
            name: 'Mustadio Bunansa',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/c9/FFT_Mustadio_Bunansa_Portrait.png'
        },
        'orlandu': {
            name: 'Cidolfus Orlandeau',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/cc/FFT_Cidolfus_Orlandeau_Portrait.png'
        },
        'gaffgarion': {
            name: 'Goffard Gaffgarion',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/4/48/FFT_Goffard_Gaffgarion_Portrait.png'
        },
        'argath': {
            name: 'Argath Thadalfus',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/7/73/FFT_Argath_Thadalfus_Portrait.png'
        },
        'wiegraf': {
            name: 'Wiegraf Folles',
            portraits: {
                knight: 'https://static.wikia.nocookie.net/finalfantasy/images/d/d8/FFT_Wiegraf_Folles_Portrait.png',
                templar: 'https://static.wikia.nocookie.net/finalfantasy/images/3/36/FFT_Wiegraf_Folles_Portrait_2.png',
                default: 'https://static.wikia.nocookie.net/finalfantasy/images/d/d8/FFT_Wiegraf_Folles_Portrait.png'
            }
        },
        'meliadoul': {
            name: 'Meliadoul Tengille',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/9/93/FFT_Meliadoul_Tengille_Portrait.png'
        },
        'reis': {
            name: 'Reis Duelar',
            portraits: {
                human: 'https://static.wikia.nocookie.net/finalfantasy/images/6/64/FFT_Reis_Duelar_Portrait.png',
                dragon: 'https://static.wikia.nocookie.net/finalfantasy/images/b/b3/FFT_Reis_Portrait_2.png',
                default: 'https://static.wikia.nocookie.net/finalfantasy/images/6/64/FFT_Reis_Duelar_Portrait.png'
            }
        },
        'beowulf': {
            name: 'Beowulf Cadmus',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/1/15/FFT_Beowulf_Cadmus_Portrait.png'
        },
        'cloud': {
            name: 'Cloud Strife',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/c0/FFT_Cloud_Strife_Portrait.png'
        },
        'balthier': {
            name: 'Balthier',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/5/59/FFT_Balthier_Portrait.png'
        },
        'luso': {
            name: 'Luso Clemens',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/f/f1/FFT_Luso_Clemens_Portrait.png'
        },
        'marach': {
            name: 'Marach Galthena',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/cf/FFT_Marach_Galthena_Portrait.png'
        },
        'rapha': {
            name: 'Rapha Galthena',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/a/a1/FFT_Rapha_Galthena_Portrait.png'
        },
        'construct8': {
            name: 'Construct 8',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/4/49/FFT_Construct_8_Portrait.png'
        },
        'boco': {
            name: 'Boco',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/3/3b/FFT_Boco_Portrait.png'
        },
        
        // Antagonists and Lucavi
        'ultima': {
            name: 'Ultima',
            portraits: {
                human: 'https://static.wikia.nocookie.net/finalfantasy/images/0/03/FFT_Alma_Beoulve_Portrait.png',
                demon: 'https://static.wikia.nocookie.net/finalfantasy/images/a/a0/FFT_Ultima_Portrait.png',
                default: 'https://static.wikia.nocookie.net/finalfantasy/images/a/a0/FFT_Ultima_Portrait.png'
            }
        },
        'hashmal': {
            name: 'Hashmal',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/0/08/FFT_Hashmal_Portrait.png'
        },
        'cuchulainn': {
            name: 'Cuchulainn',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/1/13/FFT_Cuchulainn_Portrait.png'
        },
        'belias': {
            name: 'Belias',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/9/9a/FFT_Belias_Portrait.png'
        },
        'zalbaag': {
            name: 'Zalbaag Beoulve',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/b/b3/FFT_Zalbaag_Beoulve_Portrait.png'
        },
        'dycedarg': {
            name: 'Dycedarg Beoulve',
            portraits: {
                human: 'https://static.wikia.nocookie.net/finalfantasy/images/3/33/FFT_Dycedarg_Beoulve_Portrait.png',
                lucavi: 'https://static.wikia.nocookie.net/finalfantasy/images/c/ca/FFT_Adrammelech_Portrait.png',
                default: 'https://static.wikia.nocookie.net/finalfantasy/images/3/33/FFT_Dycedarg_Beoulve_Portrait.png'
            }
        },
        'folmarv': {
            name: 'Folmarv Tengille',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/d/dd/FFT_Folmarv_Tengille_Portrait.png'
        },
        'elmdore': {
            name: 'Messam Elmdore',
            portraits: {
                human: 'https://static.wikia.nocookie.net/finalfantasy/images/5/50/FFT_Messam_Elmdore_Portrait.png',
                lucavi: 'https://static.wikia.nocookie.net/finalfantasy/images/8/88/FFT_Zalera_Portrait.png',
                default: 'https://static.wikia.nocookie.net/finalfantasy/images/5/50/FFT_Messam_Elmdore_Portrait.png'
            }
        },
        'lettie': {
            name: 'Lettie',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/4/4c/FFT_Lettie_Portrait.png'
        },
        'celia': {
            name: 'Celia',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/c5/FFT_Celia_Portrait.png'
        },
        
        // Generic units and special characters
        'squire_male': {
            name: 'Squire (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/6/6e/FFT_Squire_Portrait.png'
        },
        'squire_female': {
            name: 'Squire (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/f/f8/FFT_Squire_Female_Portrait.png'
        },
        'knight_male': {
            name: 'Knight (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/2/27/FFT_Knight_Portrait.png'
        },
        'knight_female': {
            name: 'Knight (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/4/4e/FFT_Knight_Female_Portrait.png'
        },
        'monk_male': {
            name: 'Monk (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/e/e1/FFT_Monk_Portrait.png'
        },
        'monk_female': {
            name: 'Monk (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/c0/FFT_Monk_Female_Portrait.png'
        },
        'whitemage_male': {
            name: 'White Mage (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/4/47/FFT_White_Mage_Portrait.png'
        },
        'whitemage_female': {
            name: 'White Mage (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/7/77/FFT_White_Mage_Female_Portrait.png'
        },
        'blackmage_male': {
            name: 'Black Mage (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/8/8f/FFT_Black_Mage_Portrait.png'
        },
        'blackmage_female': {
            name: 'Black Mage (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/e/e3/FFT_Black_Mage_Female_Portrait.png'
        },
        'summoner_male': {
            name: 'Summoner (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/3/30/FFT_Summoner_Portrait.png'
        },
        'summoner_female': {
            name: 'Summoner (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/c9/FFT_Summoner_Female_Portrait.png'
        },
        'ninja_male': {
            name: 'Ninja (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/5/5f/FFT_Ninja_Portrait.png'
        },
        'ninja_female': {
            name: 'Ninja (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/e/e8/FFT_Ninja_Female_Portrait.png'
        },
        'samurai_male': {
            name: 'Samurai (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/7/74/FFT_Samurai_Portrait.png'
        },
        'samurai_female': {
            name: 'Samurai (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/a/a3/FFT_Samurai_Female_Portrait.png'
        },
        'dragoon': {
            name: 'Dragoon',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/6/64/FFT_Dragoon_Portrait.png'
        },
        'timemage_male': {
            name: 'Time Mage (Male)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/c/cf/FFT_Time_Mage_Portrait.png'
        },
        'timemage_female': {
            name: 'Time Mage (Female)',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/2/2f/FFT_Time_Mage_Female_Portrait.png'
        },
        'calculator': {
            name: 'Calculator',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/8/87/FFT_Calculator_Portrait.png'
        },
        'bard': {
            name: 'Bard',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/b/b5/FFT_Bard_Portrait.png'
        },
        'dancer': {
            name: 'Dancer',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/7/7f/FFT_Dancer_Portrait.png'
        },
        'darkknight': {
            name: 'Dark Knight',
            portrait: 'https://static.wikia.nocookie.net/finalfantasy/images/4/48/FFT_Goffard_Gaffgarion_Portrait.png'
        }
    },

    // Function to get portrait URL for a character
    getPortrait(characterId, variant = 'default') {
        const char = this.characters[characterId.toLowerCase()];
        if (!char) return this.getPlaceholderPortrait();
        
        if (char.portraits) {
            return char.portraits[variant] || char.portraits.default || this.getPlaceholderPortrait();
        }
        return char.portrait || this.getPlaceholderPortrait();
    },

    // Generate SVG placeholder if portrait fails to load
    getPlaceholderPortrait() {
        return 'data:image/svg+xml,' + encodeURIComponent(`
            <svg width="64" height="96" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="96" fill="#2a2a2a"/>
                <text x="32" y="48" text-anchor="middle" fill="#d4af37" font-family="serif" font-size="14">?</text>
            </svg>
        `);
    },

    // Preload all portraits for better performance
    preloadPortraits() {
        const portraits = [];
        Object.values(this.characters).forEach(char => {
            if (char.portrait) {
                portraits.push(char.portrait);
            } else if (char.portraits) {
                Object.values(char.portraits).forEach(p => portraits.push(p));
            }
        });
        
        portraits.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    },

    // Create portrait element with fallback
    createPortraitElement(characterId, variant = 'default', className = 'character-portrait') {
        const img = document.createElement('img');
        img.src = this.getPortrait(characterId, variant);
        img.className = className;
        img.alt = this.characters[characterId.toLowerCase()]?.name || 'Character Portrait';
        img.onerror = () => {
            img.src = this.getPlaceholderPortrait();
        };
        img.style.width = '64px';
        img.style.height = '96px';
        img.style.imageRendering = 'pixelated';
        return img;
    }
};

// Initialize portrait system when page loads
if (typeof window !== 'undefined') {
    window.FFTPortraits = FFTPortraits;
    document.addEventListener('DOMContentLoaded', () => {
        FFTPortraits.preloadPortraits();
    });
}
