// Open Ivalice: Aftermath - Main Game Initialization
let gameEngine;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Open Ivalice: Aftermath - Loading...');
    
    // Create FFT game engine instance
    gameEngine = new FFTGameEngine();
    
    // Initialize the game
    gameEngine.init();
    
    // Set up input handling
    setupInputHandlers();
    
    // Set up quick action buttons
    setupQuickActions();
    
    // Update UI
    gameEngine.updateUI();
    
    console.log('FFT-style game initialized! Type /menu or click options.');
});

function setupInputHandlers() {
    const commandInput = document.getElementById('command-input');
    
    if (commandInput) {
        commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = commandInput.value.trim();
                if (command) {
                    // Display the command in the game text
                    const currentText = document.getElementById('game-text').innerHTML;
                    document.getElementById('game-text').innerHTML = 
                        currentText + '<br><span style="color: #ffd700">&gt; ' + command + '</span><br>';
                    
                    // Process the command
                    if (gameEngine.gameState === 'combat' && gameEngine.combatSystem) {
                        processCombatCommand(command);
                    } else {
                        gameEngine.processCommand(command);
                    }
                    
                    // Clear input
                    commandInput.value = '';
                }
            }
        });
    }
}

function processCombatCommand(command) {
    const parts = command.toLowerCase().split(' ');
    const action = parts[0];
    
    switch(action) {
        case 'attack':
        case 'a':
            if (parts[1]) {
                gameEngine.combatSystem.playerAction('attack', parts.slice(1).join(' '));
            } else {
                gameEngine.displayText("Attack whom? Specify a target (e.g., 'attack goblin')");
            }
            break;
            
        case 'defend':
        case 'd':
            gameEngine.displayText("You take a defensive stance!");
            gameEngine.combatSystem.playerAction('defend');
            break;
            
        case 'ability':
        case 'skill':
            gameEngine.displayText("Special abilities coming soon!");
            break;
            
        case 'flee':
        case 'run':
            if (Math.random() > 0.5) {
                gameEngine.displayText("You fled from battle!");
                gameEngine.gameState = 'exploration';
                gameEngine.combatSystem = null;
            } else {
                gameEngine.displayText("Can't escape!");
                gameEngine.combatSystem.nextTurn();
            }
            break;
            
        case 'use':
            gameEngine.useItem(parts.slice(1).join(' '));
            break;
            
        default:
            gameEngine.displayText("Invalid combat command. Try: attack [enemy], defend, flee, use [item]");
    }
}

function setupQuickActions() {
    const quickActions = document.getElementById('quick-actions');
    
    if (quickActions) {
        const actions = [
            { label: 'Menu', command: '/menu' },
            { label: 'Party', command: '/party' },
            { label: 'Formation', command: '/formation' },
            { label: 'Inventory', command: '/inventory' },
            { label: 'Chronicle', command: '/chronicle' },
            { label: 'World', command: '/world' },
            { label: 'Save', command: '/options' },
            { label: 'Help', command: 'help' }
        ];
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'action-button';
            button.textContent = action.label;
            button.onclick = () => {
                document.getElementById('command-input').value = action.command;
                document.getElementById('command-input').dispatchEvent(
                    new KeyboardEvent('keypress', { key: 'Enter' })
                );
            };
            quickActions.appendChild(button);
        });
    }
}

// Auto-save every 5 minutes
setInterval(() => {
    if (gameEngine && gameEngine.player) {
        gameEngine.saveGame();
        console.log('Auto-saved game');
    }
}, 300000);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Focus on input when any letter key is pressed
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        const input = document.getElementById('command-input');
        if (document.activeElement !== input) {
            input.focus();
        }
    }
    
    // Quick commands with Alt key
    if (e.altKey) {
        switch(e.key) {
            case 'l':
                e.preventDefault();
                gameEngine.processCommand('look');
                break;
            case 'i':
                e.preventDefault();
                gameEngine.processCommand('inventory');
                break;
            case 's':
                e.preventDefault();
                gameEngine.processCommand('stats');
                break;
            case 'h':
                e.preventDefault();
                gameEngine.processCommand('help');
                break;
        }
    }
});

// Add visual feedback for combat
function addCombatEffect(targetElement, effectType) {
    if (targetElement) {
        targetElement.classList.add(effectType);
        setTimeout(() => {
            targetElement.classList.remove(effectType);
        }, 500);
    }
}

// Save game before closing
window.addEventListener('beforeunload', (e) => {
    if (gameEngine && gameEngine.player) {
        gameEngine.saveGame();
    }
});
