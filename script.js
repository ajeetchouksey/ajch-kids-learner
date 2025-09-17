// Kids Story Learner App - JavaScript
class StoryLearnerApp {
    constructor() {
        this.stories = this.loadStoriesFromStorage();
        this.currentStory = null;
        this.highlightsEnabled = true;
        
        // Interactive reading properties
        this.readingMode = 'normal'; // 'normal', 'guided', 'auto'
        this.currentWordIndex = 0;
        this.words = [];
        this.isPlaying = false;
        this.readingTimer = null;
        this.startTime = null;
        this.readingSpeed = 3; // 1-5 scale
        
        // Reading stats
        this.wordsRead = 0;
        this.readingStreak = 1;
        this.readingScore = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStoriesList();
        this.showSection('upload');
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('upload-tab').addEventListener('click', () => this.showSection('upload'));
        document.getElementById('stories-tab').addEventListener('click', () => this.showSection('stories'));
        document.getElementById('read-tab').addEventListener('click', () => this.showSection('read'));

        // Upload form
        document.getElementById('save-story').addEventListener('click', () => this.saveStory());
        document.getElementById('story-image').addEventListener('change', (e) => this.previewImage(e));
        document.getElementById('extract-text-btn').addEventListener('click', () => this.extractTextFromImage());

        // Reading controls
        document.getElementById('back-to-stories').addEventListener('click', () => this.showSection('stories'));
        document.getElementById('toggle-highlights').addEventListener('click', () => this.toggleHighlights());
        
        // Interactive reading controls
        document.getElementById('normal-reading').addEventListener('click', () => this.setReadingMode('normal'));
        document.getElementById('guided-reading').addEventListener('click', () => this.setReadingMode('guided'));
        document.getElementById('auto-reading').addEventListener('click', () => this.setReadingMode('auto'));
        document.getElementById('play-pause-btn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('prev-word-btn').addEventListener('click', () => this.previousWord());
        document.getElementById('next-word-btn').addEventListener('click', () => this.nextWord());
        document.getElementById('reading-speed').addEventListener('input', (e) => this.setReadingSpeed(e.target.value));

        // Enter key support for form
        document.getElementById('story-title').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveStory();
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${sectionName}-section`).classList.add('active');
        document.getElementById(`${sectionName}-tab`).classList.add('active');

        // Load data if needed
        if (sectionName === 'stories') {
            this.loadStoriesList();
        }
    }

    previewImage(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('image-preview');
        const extractBtn = document.getElementById('extract-text-btn');
        const ocrStatus = document.getElementById('ocr-status');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Story preview">`;
                extractBtn.style.display = 'inline-block';
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = '';
            extractBtn.style.display = 'none';
            ocrStatus.style.display = 'none';
        }
    }

    async extractTextFromImage() {
        const imageInput = document.getElementById('story-image');
        const ocrStatus = document.getElementById('ocr-status');
        const storyTextArea = document.getElementById('story-text');
        
        if (!imageInput.files[0]) {
            this.showMessage('Please upload an image first!', 'error');
            return;
        }

        // Show processing status
        ocrStatus.className = 'ocr-status processing';
        ocrStatus.textContent = '🔍 Extracting text from image...';

        try {
            const file = imageInput.files[0];
            
            // Check if Tesseract is available
            if (typeof Tesseract !== 'undefined') {
                // Use Tesseract.js to extract text
                const { data: { text } } = await Tesseract.recognize(
                    file,
                    'eng',
                    {
                        logger: m => {
                            if (m.status === 'recognizing text') {
                                const progress = Math.round(m.progress * 100);
                                ocrStatus.textContent = `🔍 Extracting text... ${progress}%`;
                            }
                        }
                    }
                );
                
                if (text.trim()) {
                    // Clean up the extracted text
                    const cleanedText = text.trim().replace(/\n\s*\n/g, '\n\n');
                    
                    // Ask user if they want to replace existing text
                    const currentText = storyTextArea.value.trim();
                    let shouldReplace = true;
                    
                    if (currentText) {
                        shouldReplace = confirm(
                            'This will replace the existing story text. Do you want to continue?'
                        );
                    }
                    
                    if (shouldReplace) {
                        storyTextArea.value = cleanedText;
                        ocrStatus.className = 'ocr-status success';
                        ocrStatus.textContent = '✅ Text extracted successfully!';
                        
                        // Auto-hide success message after 3 seconds
                        setTimeout(() => {
                            ocrStatus.style.display = 'none';
                        }, 3000);
                    } else {
                        ocrStatus.style.display = 'none';
                    }
                } else {
                    throw new Error('No text found in the image');
                }
            } else {
                // Fallback: Show demo message when Tesseract is not available
                ocrStatus.className = 'ocr-status error';
                ocrStatus.textContent = '❌ OCR library not loaded. Please check your internet connection.';
                
                // For demonstration, show what would happen with sample text
                setTimeout(() => {
                    const shouldDemo = confirm(
                        'OCR library is not available. Would you like to see a demo with sample text?'
                    );
                    
                    if (shouldDemo) {
                        const sampleText = `Once upon a time, there was a little girl who loved to read stories. She would spend hours with her books, learning new words and discovering magical worlds.`;
                        
                        const currentText = storyTextArea.value.trim();
                        let shouldReplace = true;
                        
                        if (currentText) {
                            shouldReplace = confirm(
                                'This will replace the existing story text with demo text. Do you want to continue?'
                            );
                        }
                        
                        if (shouldReplace) {
                            storyTextArea.value = sampleText;
                            ocrStatus.className = 'ocr-status success';
                            ocrStatus.textContent = '✅ Demo text added! (In real usage, this would be extracted from your image)';
                            
                            setTimeout(() => {
                                ocrStatus.style.display = 'none';
                            }, 5000);
                        } else {
                            ocrStatus.style.display = 'none';
                        }
                    } else {
                        ocrStatus.style.display = 'none';
                    }
                }, 1000);
            }
            
        } catch (error) {
            console.error('OCR Error:', error);
            ocrStatus.className = 'ocr-status error';
            ocrStatus.textContent = '❌ Failed to extract text. Please try a clearer image.';
            
            // Auto-hide error message after 5 seconds
            setTimeout(() => {
                ocrStatus.style.display = 'none';
            }, 5000);
        }
    }

    saveStory() {
        const title = document.getElementById('story-title').value.trim();
        const text = document.getElementById('story-text').value.trim();
        const imageInput = document.getElementById('story-image');
        
        if (!title || !text) {
            this.showMessage('Please fill in both title and story text!', 'error');
            return;
        }

        const story = {
            id: Date.now().toString(),
            title: title,
            text: text,
            image: null,
            createdAt: new Date().toISOString()
        };

        // Handle image if uploaded
        if (imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                story.image = e.target.result;
                this.addStoryToStorage(story);
                this.clearForm();
                this.showMessage('Story saved successfully! 🎉', 'success');
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            this.addStoryToStorage(story);
            this.clearForm();
            this.showMessage('Story saved successfully! 🎉', 'success');
        }
    }

    addStoryToStorage(story) {
        this.stories.push(story);
        localStorage.setItem('kidsStories', JSON.stringify(this.stories));
    }

    loadStoriesFromStorage() {
        const stored = localStorage.getItem('kidsStories');
        return stored ? JSON.parse(stored) : [];
    }

    clearForm() {
        document.getElementById('story-title').value = '';
        document.getElementById('story-text').value = '';
        document.getElementById('story-image').value = '';
        document.getElementById('image-preview').innerHTML = '';
        document.getElementById('extract-text-btn').style.display = 'none';
        document.getElementById('ocr-status').style.display = 'none';
    }

    loadStoriesList() {
        const storiesContainer = document.getElementById('stories-list');
        
        if (this.stories.length === 0) {
            storiesContainer.innerHTML = `
                <div class="empty-state">
                    <h3>📚 No stories yet!</h3>
                    <p>Upload your first story to get started.</p>
                </div>
            `;
            return;
        }

        storiesContainer.innerHTML = this.stories.map(story => `
            <div class="story-card">
                <h3>${this.escapeHtml(story.title)}</h3>
                <p>${this.escapeHtml(story.text.substring(0, 100))}${story.text.length > 100 ? '...' : ''}</p>
                <div class="story-actions">
                    <button class="read-btn" data-story-id="${story.id}">📖 Read</button>
                    <button class="delete-btn" data-story-id="${story.id}">🗑️ Delete</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to the buttons
        const readButtons = storiesContainer.querySelectorAll('.read-btn');
        const deleteButtons = storiesContainer.querySelectorAll('.delete-btn');
        
        readButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const storyId = e.target.getAttribute('data-story-id');
                this.readStory(storyId);
            });
        });

        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const storyId = e.target.getAttribute('data-story-id');
                this.deleteStory(storyId);
            });
        });
    }

    readStory(storyId) {
        const story = this.stories.find(s => s.id === storyId);
        if (!story) {
            this.showMessage('Story not found!', 'error');
            return;
        }

        this.currentStory = story;
        this.displayStory(story);
        this.showSection('read');
    }

    displayStory(story) {
        document.getElementById('current-story-title').textContent = story.title;
        
        // Display image if available
        const imageDisplay = document.getElementById('story-image-display');
        if (story.image) {
            imageDisplay.innerHTML = `<img src="${story.image}" alt="${this.escapeHtml(story.title)}">`;
        } else {
            imageDisplay.innerHTML = '';
        }

        // Reset reading state
        this.currentWordIndex = 0;
        this.startTime = null;
        this.wordsRead = 0;
        this.stopReading();

        // Display text with enhanced highlighting for interactive modes
        const textDisplay = document.getElementById('story-text-display');
        
        if (this.readingMode === 'guided' || this.readingMode === 'auto') {
            textDisplay.innerHTML = this.createInteractiveText(story.text);
        } else if (this.highlightsEnabled) {
            textDisplay.innerHTML = this.highlightPhoneticBlends(story.text);
        } else {
            textDisplay.textContent = story.text;
        }
        
        this.updateReadingProgress();
        this.updateReadingStats();
    }

    createInteractiveText(text) {
        // Split text into words while preserving punctuation and spacing
        const wordPattern = /(\S+)/g;
        const words = [];
        let match;
        let lastIndex = 0;
        let wordIndex = 0;

        while ((match = wordPattern.exec(text)) !== null) {
            // Add any text before this word (spaces, etc.)
            if (match.index > lastIndex) {
                words.push(text.slice(lastIndex, match.index));
            }
            
            // Add the word with highlighting and data attributes
            const word = match[1];
            const highlightedWord = this.highlightsEnabled ? 
                this.highlightPhoneticBlendsInWord(word) : word;
            
            words.push(
                `<span class="word" data-word-index="${wordIndex}" onclick="app.jumpToWord(${wordIndex})">${highlightedWord}</span>`
            );
            
            wordIndex++;
            lastIndex = match.index + match[0].length;
        }

        // Add any remaining text
        if (lastIndex < text.length) {
            words.push(text.slice(lastIndex));
        }

        // Store words for navigation
        this.words = Array.from({length: wordIndex}, (_, i) => i);
        
        return words.join('');
    }

    highlightPhoneticBlendsInWord(word) {
        // Common starting blends
        const startingBlends = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw', 'ch', 'sh', 'th', 'wh', 'ph'];
        
        // Common ending blends
        const endingBlends = ['ing', 'tion', 'sion', 'ness', 'ment', 'ly', 'ed', 'er', 'est', 'an', 'en', 'on', 'ck', 'ng', 'nk', 'mp', 'nd', 'nt'];

        if (!/\w/.test(word)) return word; // Skip non-word content

        let highlightedWord = word;
        let hasHighlight = false;

        // Check for starting blends
        if (!hasHighlight) {
            for (const blend of startingBlends) {
                const regex = new RegExp(`^(${this.escapeRegex(blend)})`, 'i');
                if (regex.test(word)) {
                    highlightedWord = word.replace(regex, '<span class="highlight-start">$1</span>');
                    hasHighlight = true;
                    break;
                }
            }
        }

        // Check for ending blends
        if (!hasHighlight) {
            for (const blend of endingBlends) {
                const regex = new RegExp(`(${this.escapeRegex(blend)})$`, 'i');
                if (regex.test(word)) {
                    highlightedWord = word.replace(regex, '<span class="highlight-end">$1</span>');
                    hasHighlight = true;
                    break;
                }
            }
        }

        return highlightedWord;
    }

    jumpToWord(wordIndex) {
        if (this.readingMode === 'guided') {
            this.currentWordIndex = wordIndex;
            this.highlightCurrentWord();
            this.updateReadingProgress();
        }
    }

    highlightPhoneticBlends(text) {
        // Common starting blends
        const startingBlends = ['bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw', 'ch', 'sh', 'th', 'wh', 'ph'];
        
        // Common ending blends
        const endingBlends = ['ing', 'tion', 'sion', 'ness', 'ment', 'ly', 'ed', 'er', 'est', 'an', 'en', 'on', 'ck', 'ng', 'nk', 'mp', 'nd', 'nt'];

        // Split text into words to process individually
        const words = text.split(/(\s+)/); // Keep whitespace
        
        return words.map(word => {
            if (!/\w/.test(word)) return word; // Skip whitespace and punctuation
            
            let highlightedWord = word;
            let hasHighlight = false;
            
            // Check for starting blends
            if (!hasHighlight) {
                for (const blend of startingBlends) {
                    const regex = new RegExp(`^(${this.escapeRegex(blend)})`, 'i');
                    if (regex.test(word)) {
                        highlightedWord = word.replace(regex, '<span class="highlight-start">$1</span>');
                        hasHighlight = true;
                        break;
                    }
                }
            }
            
            // Check for ending blends
            if (!hasHighlight) {
                for (const blend of endingBlends) {
                    const regex = new RegExp(`(${this.escapeRegex(blend)})$`, 'i');
                    if (regex.test(word)) {
                        highlightedWord = word.replace(regex, '<span class="highlight-end">$1</span>');
                        hasHighlight = true;
                        break;
                    }
                }
            }
            
            return highlightedWord;
        }).join('');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    toggleHighlights() {
        this.highlightsEnabled = !this.highlightsEnabled;
        const button = document.getElementById('toggle-highlights');
        
        if (this.highlightsEnabled) {
            button.textContent = '🎨 Hide Highlights';
        } else {
            button.textContent = '🎨 Show Highlights';
        }

        if (this.currentStory) {
            this.displayStory(this.currentStory);
        }
    }

    deleteStory(storyId) {
        if (confirm('Are you sure you want to delete this story?')) {
            this.stories = this.stories.filter(s => s.id !== storyId);
            localStorage.setItem('kidsStories', JSON.stringify(this.stories));
            this.loadStoriesList();
            this.showMessage('Story deleted successfully!', 'success');
        }
    }

    // Interactive Reading Methods
    setReadingMode(mode) {
        this.readingMode = mode;
        this.stopReading();
        
        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${mode}-reading`).classList.add('active');
        
        const playbackControls = document.querySelector('.playback-controls');
        if (mode === 'guided' || mode === 'auto') {
            playbackControls.style.display = 'block';
        } else {
            playbackControls.style.display = 'none';
        }
        
        if (this.currentStory) {
            this.displayStory(this.currentStory);
            this.updateReadingProgress();
        }
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.stopReading();
        } else {
            this.startReading();
        }
    }

    startReading() {
        if (this.readingMode === 'normal') return;
        
        this.isPlaying = true;
        this.startTime = this.startTime || Date.now();
        this.updatePlayPauseButton();
        this.startReadingTimer();
        
        if (this.readingMode === 'auto') {
            this.autoReadNext();
        }
    }

    stopReading() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
        if (this.readingTimer) {
            clearTimeout(this.readingTimer);
            this.readingTimer = null;
        }
    }

    autoReadNext() {
        if (!this.isPlaying || this.readingMode !== 'auto') return;
        
        if (this.currentWordIndex < this.words.length) {
            this.highlightCurrentWord();
            this.currentWordIndex++;
            this.wordsRead++;
            this.updateReadingProgress();
            this.checkAchievements();
            
            const delay = this.getReadingDelay();
            this.readingTimer = setTimeout(() => this.autoReadNext(), delay);
        } else {
            this.stopReading();
            this.showCompletionCelebration();
        }
    }

    getReadingDelay() {
        const speeds = [2000, 1500, 1000, 700, 500]; // milliseconds
        return speeds[this.readingSpeed - 1] || 1000;
    }

    previousWord() {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.highlightCurrentWord();
            this.updateReadingProgress();
        }
    }

    nextWord() {
        if (this.currentWordIndex < this.words.length) {
            this.currentWordIndex++;
            this.wordsRead++;
            this.highlightCurrentWord();
            this.updateReadingProgress();
            this.checkAchievements();
            
            if (this.currentWordIndex >= this.words.length) {
                this.showCompletionCelebration();
            }
        }
    }

    setReadingSpeed(value) {
        this.readingSpeed = parseInt(value);
        const speedNames = ['Very Slow', 'Slow', 'Normal', 'Fast', 'Very Fast'];
        document.getElementById('speed-display').textContent = speedNames[value - 1];
    }

    highlightCurrentWord() {
        // Remove previous current word highlighting
        document.querySelectorAll('.current-word-highlight').forEach(el => {
            if (!el.classList.contains('legend-item')) {
                el.classList.remove('current-word-highlight');
            }
        });

        // Highlight current word
        if (this.currentWordIndex < this.words.length) {
            const wordElement = document.querySelector(`[data-word-index="${this.currentWordIndex}"]`);
            if (wordElement) {
                wordElement.classList.add('current-word-highlight');
                wordElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    updateReadingProgress() {
        const currentWord = Math.min(this.currentWordIndex, this.words.length);
        const totalWords = this.words.length;
        const progressPercent = totalWords > 0 ? (currentWord / totalWords) * 100 : 0;
        
        document.getElementById('current-word').textContent = currentWord;
        document.getElementById('total-words').textContent = totalWords;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
        
        // Update reading time
        if (this.startTime) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('reading-time').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    updatePlayPauseButton() {
        const button = document.getElementById('play-pause-btn');
        button.textContent = this.isPlaying ? '⏸️ Pause' : '▶️ Play';
    }

    startReadingTimer() {
        const updateTimer = () => {
            if (this.isPlaying) {
                this.updateReadingProgress();
                setTimeout(updateTimer, 1000);
            }
        };
        updateTimer();
    }

    // Achievement and Animation Functions
    checkAchievements() {
        this.readingScore += 10;
        this.updateReadingStats();
        
        // Check for specific achievements
        if (this.wordsRead === 10) {
            this.showAchievement("🎯 First 10 Words!", "Great start, keep reading!");
            this.createFloatingIcons('🎯');
        } else if (this.wordsRead === 25) {
            this.showAchievement("⭐ Quarter Done!", "You're doing amazing!");
            this.createFloatingIcons('⭐');
        } else if (this.wordsRead % 5 === 0 && this.wordsRead > 0) {
            this.createFloatingIcons('✨');
            this.readingStreak++;
        }
    }

    showCompletionCelebration() {
        this.showAchievement("🎉 Story Complete!", "Amazing reading! You finished the whole story!");
        this.createConfetti();
        this.createFloatingIcons('🎉');
        this.readingScore += 100;
        this.readingStreak += 5;
        this.updateReadingStats();
        
        // Play success sound effect (if available)
        this.playSuccessSound();
    }

    showAchievement(title, message) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <h3>${title}</h3>
            <p>${message}</p>
        `;
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.remove();
        }, 3000);
    }

    createConfetti() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 100);
        }
    }

    createFloatingIcons(icon) {
        const storyContainer = document.querySelector('.story-content');
        if (!storyContainer) return;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const floatingIcon = document.createElement('div');
                floatingIcon.className = 'floating-icon';
                floatingIcon.textContent = icon;
                floatingIcon.style.left = Math.random() * 80 + '%';
                floatingIcon.style.top = Math.random() * 80 + '%';
                floatingIcon.style.animationDelay = Math.random() * 2 + 's';
                
                storyContainer.appendChild(floatingIcon);
                
                setTimeout(() => {
                    floatingIcon.remove();
                }, 4000);
            }, i * 200);
        }
    }

    playSuccessSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5 note
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio not supported or user interaction required');
        }
    }

    updateReadingStats() {
        document.getElementById('words-read').textContent = this.wordsRead;
        document.getElementById('reading-streak').textContent = this.readingStreak;
        document.getElementById('reading-score').textContent = this.readingScore;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Insert at the top of the active section
        const activeSection = document.querySelector('.section.active');
        activeSection.insertBefore(messageDiv, activeSection.firstChild);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// Initialize the app when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new StoryLearnerApp();
});

// Add some sample data for demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is the first time loading the app
    if (localStorage.getItem('kidsStories') === null) {
        const sampleStories = [
            {
                id: 'sample1',
                title: 'The Smart Cat',
                text: 'Once upon a time, there was a smart black cat named Whiskers. The cat could climb trees and catch fish. Children loved to watch the cat play in the garden. The cat was very friendly and would purr when happy.',
                image: null,
                createdAt: new Date().toISOString()
            },
            {
                id: 'sample2',
                title: 'The Flying Bird',
                text: 'A little bird wanted to fly high in the sky. She practiced flapping her wings every morning. The bird was determined to reach the clouds. Finally, she flew above the trees and felt amazing!',
                image: null,
                createdAt: new Date().toISOString()
            }
        ];
        
        localStorage.setItem('kidsStories', JSON.stringify(sampleStories));
    }
});