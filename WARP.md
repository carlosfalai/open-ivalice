# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Open Ivalice is a browser-based text adventure game inspired by Final Fantasy Tactics, set one month after the War of the Lions. It's a JavaScript-based game with an ASCII-art menu system and FFT-style combat mechanics.

## Development Commands

### Running the Game
```bash
# Open the game in default browser
open index.html

# Or use a local server (recommended for development)
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

### Testing Changes
- No build process required - this is vanilla JavaScript
- Refresh browser to see changes
- Use browser DevTools console to debug (F12 or Cmd+Opt+I)

## Architecture Overview

### Core Files Structure
The game is built with modular JavaScript files that load in sequence:

1. **game-data-expanded.js** - Game world data (locations, NPCs, items)
2. **fft-menu-system.js** - ASCII-art menu rendering system
3. **game-engine-fft.js** - Main game engine with FFT mechanics
4. **game.js** - Initialization and input handling

### Key Systems

#### Menu System (`FFTMenuSystem`)
- Renders ASCII-art FFT-style menus
- Path-based navigation system: `/menu/party/ramza/equipment`
- Clickable menu links with `data-path` attributes
- Character icons mapped by job class

#### Game Engine (`FFTGameEngine`)
- Party management with FFT job system
- Formation grid (5x5) positioning
- Brave/Faith mechanics
- Chronicle system for lore tracking
- Save/Load functionality via localStorage

#### Combat System
- Turn-based combat with speed/CT system
- Poaching mechanic for capturing monsters
- Formation-based positioning matters
- Job abilities and equipment modifiers

### Data Organization

#### Locations (`locations` object)
- 24 interconnected locations across Ivalice
- Each location has:
  - NPCs with dialogue and quests
  - Enemy encounters
  - Exit connections to other locations
  - Unique descriptions reflecting post-war state

#### Character System
- Job classes with unique stats and abilities
- Equipment slots: R.Hand, L.Hand, Head, Body, Accessory
- Brave/Faith/Zodiac compatibility system
- JP (Job Points) for learning abilities

## Code Patterns

### Command Processing
Commands follow pattern: `/menu/[submenu]/[action]`
- Menu navigation uses forward slashes
- Actions can be chained: `/party/ramza/equipment/change`

### UI Updates
- Text output via `displayText()` method
- UI panels updated through `updateUI()`
- Menu clicks trigger `navigateToPath()`

### Character Creation
```javascript
// Standard character template
createCharacter({
    name: 'CharacterName',
    job: 'JobClass',
    level: 35,
    brave: 75,
    faith: 65,
    zodiac: 'Aries',
    abilities: ['Ability1', 'Ability2']
})
```

## Key Game Features

### FFT-Specific Mechanics
- **Job Tree System** - Characters can change jobs based on prerequisites
- **Formation Grid** - 5x5 tactical positioning for battles
- **Poaching** - Capture weakened monsters for materials
- **Zodiac Compatibility** - Affects damage and healing
- **Brave/Faith** - Influences physical/magical effectiveness

### Story Context
- Set after Ramza defeated Ultima at Mullonde
- Church corruption exposed, Lucavi defeated
- Focus on aftermath and reconstruction
- Search for the 13th Zodiac Stone (Serpentarius)
- Multiple returning FFT characters available

## Common Modifications

### Adding New Locations
Add to `game-data-expanded.js`:
```javascript
newLocation: {
    id: 'uniqueId',
    name: 'Location Name',
    description: 'Description text',
    npcs: [...],
    exits: ['direction1', 'direction2'],
    connections: { direction1: 'targetLocationId' },
    enemies: [...]
}
```

### Adding New Jobs
Add to `game-data.js` jobs object with stats and abilities

### Creating New NPCs
Include in location's npcs array with:
- name
- dialogue
- quest (optional)

## Debugging Tips

### Browser Console Commands
```javascript
// Check current game state
gameEngine.gameState

// View party details
gameEngine.party

// Force location change
gameEngine.currentLocation = locations.orbonne

// Add item to inventory
gameEngine.inventory.push(items.elixir)

// Trigger save
gameEngine.saveGame()
```

### Common Issues
- Menu not displaying: Check `menuSystem.navigateToPath()` logic
- Combat not starting: Verify location has enemies array
- Save/Load issues: Check localStorage availability
- Character stats wrong: Verify job data and level calculations

## Save System
- Uses localStorage with keys `openIvaliceSave_1`, `openIvaliceSave_2`, `openIvaliceSave_3`
- Auto-saves every 5 minutes
- Manual save via `/options` menu

## Special Notes
- The game emphasizes narrative and exploration over complex graphics
- ASCII art is used for visual appeal while maintaining text-based nature
- Menu system mimics FFT's nested menu structure
- Combat aims to recreate FFT's tactical feel in text format
