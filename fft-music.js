// FFT Music System with YouTube Integration
// Manages background music for different game states

const FFTMusic = {
    // YouTube video IDs for FFT soundtrack
    tracks: {
        // Title and menu themes
        title: 'dQw4w9WgXcQ', // Placeholder - replace with actual FFT title theme
        menu: 'S4E83RKavUU', // Character creation/menu theme
        worldMap: 'Fn1aWUHrvf4', // World map theme
        
        // Battle themes
        battleNormal: 'CKI9aZOF0Yk', // Trisection - main battle theme
        battleBoss: 'O8zLNdOGC1w', // Antipyretic - boss battle
        battleLucavi: 'qqON83X3haw', // Ultima the High Seraph
        battleFinal: 'K2Pe5xU1nDo', // Final battle theme
        
        // Victory and defeat
        victory: 'kHx5hCVN4qA', // Victory fanfare
        defeat: 'ab6eDLm17AQ', // Game over theme
        
        // Story and cutscene themes
        story: 'mH_R7u1UBSU', // Bland Logo - story scenes
        emotional: 'YNKlqNnYYTc', // Ovelia's Theme
        tension: 'xvH94tWgSx8', // Tension theme
        mystery: 'OxKqyNqBvMo', // Mysterious theme
        
        // Location themes
        church: 'U5k5m0mwPOg', // Church theme
        castle: 'yNHq8Ic8a6w', // Castle theme
        tavern: 'gxiAG94e18M', // Tavern theme
        shop: 'VbDD1j2cBEY', // Shop theme
        
        // Special themes
        brave: 'v33AJJoD8X4', // Brave Story
        chronicle: 'h5KDmA_dmrc', // Chronicle theme
        formation: 'b9kJctJcNBA', // Formation screen
        save: 'V7vnVmVsZxU' // Save theme
    },

    // Current state
    currentTrack: null,
    currentPlayer: null,
    volume: 50,
    isPlaying: false,
    isMuted: false,

    // Initialize the music system
    init() {
        // Create container for YouTube player
        if (!document.getElementById('fft-music-container')) {
            const container = document.createElement('div');
            container.id = 'fft-music-container';
            container.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 300px;
                background: linear-gradient(135deg, #1a1a2a 0%, #0a0a1a 100%);
                border: 2px solid #d4af37;
                border-radius: 8px;
                padding: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.8);
                z-index: 10000;
                transition: all 0.3s ease;
            `;

            // Create controls
            container.innerHTML = `
                <div style="color: #d4af37; font-family: 'Cinzel', serif; margin-bottom: 10px;">
                    <span id="fft-music-title" style="font-size: 12px;">♪ FFT Soundtrack</span>
                </div>
                <div id="fft-youtube-player" style="width: 280px; height: 157px; background: #000; margin-bottom: 10px;"></div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button id="fft-music-toggle" style="
                        background: #d4af37;
                        color: #1a1a2a;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-family: 'Cinzel', serif;
                        font-weight: bold;
                    ">▶ Play</button>
                    <input type="range" id="fft-music-volume" min="0" max="100" value="50" style="flex: 1;">
                    <button id="fft-music-mute" style="
                        background: #444;
                        color: #d4af37;
                        border: 1px solid #d4af37;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">🔊</button>
                    <button id="fft-music-minimize" style="
                        background: #444;
                        color: #d4af37;
                        border: 1px solid #d4af37;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">_</button>
                </div>
            `;

            document.body.appendChild(container);

            // Load YouTube IFrame API
            if (!window.YT) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            // Set up event listeners
            this.setupEventListeners();
        }
    },

    // Setup event listeners for controls
    setupEventListeners() {
        const toggle = document.getElementById('fft-music-toggle');
        const volume = document.getElementById('fft-music-volume');
        const mute = document.getElementById('fft-music-mute');
        const minimize = document.getElementById('fft-music-minimize');
        const container = document.getElementById('fft-music-container');

        if (toggle) {
            toggle.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.pause();
                    toggle.textContent = '▶ Play';
                } else {
                    this.play();
                    toggle.textContent = '⏸ Pause';
                }
            });
        }

        if (volume) {
            volume.addEventListener('input', (e) => {
                this.setVolume(e.target.value);
            });
        }

        if (mute) {
            mute.addEventListener('click', () => {
                this.toggleMute();
                mute.textContent = this.isMuted ? '🔇' : '🔊';
            });
        }

        if (minimize) {
            minimize.addEventListener('click', () => {
                const player = document.getElementById('fft-youtube-player');
                const isMinimized = player.style.display === 'none';
                player.style.display = isMinimized ? 'block' : 'none';
                container.style.width = isMinimized ? '300px' : '200px';
                minimize.textContent = isMinimized ? '_' : '□';
            });
        }
    },

    // Called when YouTube API is ready
    onYouTubeIframeAPIReady() {
        this.currentPlayer = new YT.Player('fft-youtube-player', {
            height: '157',
            width: '280',
            videoId: this.tracks.title,
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'loop': 1,
                'playlist': this.tracks.title,
                'modestbranding': 1,
                'rel': 0
            },
            events: {
                'onReady': (event) => {
                    event.target.setVolume(this.volume);
                    // Auto-play title theme on load
                    this.playTrack('title');
                },
                'onStateChange': (event) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        this.isPlaying = true;
                        document.getElementById('fft-music-toggle').textContent = '⏸ Pause';
                    } else if (event.data === YT.PlayerState.PAUSED) {
                        this.isPlaying = false;
                        document.getElementById('fft-music-toggle').textContent = '▶ Play';
                    }
                }
            }
        });
    },

    // Play a specific track
    playTrack(trackName, loop = true) {
        if (!this.currentPlayer) return;
        
        const videoId = this.tracks[trackName];
        if (!videoId) {
            console.warn(`Track '${trackName}' not found`);
            return;
        }

        this.currentTrack = trackName;
        this.currentPlayer.loadVideoById({
            'videoId': videoId,
            'startSeconds': 0,
            'suggestedQuality': 'small'
        });

        if (loop) {
            this.currentPlayer.setLoop(true);
        }

        // Update display
        const titleElement = document.getElementById('fft-music-title');
        if (titleElement) {
            const trackTitles = {
                title: '♪ Main Theme',
                battleNormal: '⚔ Trisection',
                battleBoss: '☠ Antipyretic',
                battleLucavi: '👹 Ultima the High Seraph',
                victory: '🎊 Victory Fanfare',
                defeat: '💀 Game Over',
                worldMap: '🗺 World Map',
                church: '⛪ Church',
                castle: '🏰 Castle',
                tavern: '🍺 Tavern',
                shop: '🛍 Shop'
            };
            titleElement.textContent = trackTitles[trackName] || '♪ FFT Soundtrack';
        }
    },

    // Music control methods
    play() {
        if (this.currentPlayer) {
            this.currentPlayer.playVideo();
            this.isPlaying = true;
        }
    },

    pause() {
        if (this.currentPlayer) {
            this.currentPlayer.pauseVideo();
            this.isPlaying = false;
        }
    },

    stop() {
        if (this.currentPlayer) {
            this.currentPlayer.stopVideo();
            this.isPlaying = false;
        }
    },

    setVolume(volume) {
        this.volume = volume;
        if (this.currentPlayer) {
            this.currentPlayer.setVolume(volume);
        }
    },

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.currentPlayer) {
            if (this.isMuted) {
                this.currentPlayer.mute();
            } else {
                this.currentPlayer.unMute();
            }
        }
    },

    // Game state music management
    onGameStateChange(state) {
        switch(state) {
            case 'title':
                this.playTrack('title');
                break;
            case 'menu':
            case 'party':
            case 'formation':
                this.playTrack('menu');
                break;
            case 'battle_start':
                this.playTrack('battleNormal');
                break;
            case 'boss_battle':
                this.playTrack('battleBoss');
                break;
            case 'lucavi_battle':
                this.playTrack('battleLucavi');
                break;
            case 'victory':
                this.playTrack('victory', false); // Don't loop victory theme
                setTimeout(() => this.playTrack('worldMap'), 5000); // Return to world map after 5 seconds
                break;
            case 'defeat':
                this.playTrack('defeat', false);
                break;
            case 'world_map':
                this.playTrack('worldMap');
                break;
            case 'church':
                this.playTrack('church');
                break;
            case 'castle':
                this.playTrack('castle');
                break;
            case 'tavern':
                this.playTrack('tavern');
                break;
            case 'shop':
                this.playTrack('shop');
                break;
            case 'story':
                this.playTrack('story');
                break;
            case 'emotional':
                this.playTrack('emotional');
                break;
            default:
                // Keep current track playing
                break;
        }
    }
};

// Initialize when window loads
if (typeof window !== 'undefined') {
    window.FFTMusic = FFTMusic;
    window.onYouTubeIframeAPIReady = function() {
        FFTMusic.onYouTubeIframeAPIReady();
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        FFTMusic.init();
    });
}
