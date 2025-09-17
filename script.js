// Kids Story Learner App - JavaScript
class StoryLearnerApp {
    constructor() {
        this.stories = this.loadStoriesFromStorage();
        this.currentStory = null;
        this.highlightsEnabled = true;
        this.isReadingMode = false;
        this.currentWordIndex = 0;
        this.wordsList = [];
        this.readingTimer = null;
        this.readingSpeed = 800; // milliseconds per word
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

        // Word-by-word reading controls (will be added dynamically)
        document.addEventListener('click', (e) => {
            if (e.target.id === 'play-reading') this.toggleReading();
            if (e.target.id === 'prev-word') this.previousWord();
            if (e.target.id === 'next-word') this.nextWord();
            if (e.target.id === 'reset-reading') this.resetReading();
        });

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

        // Display text with phonetic highlights and word highlighting support
        const textDisplay = document.getElementById('story-text-display');
        this.renderStoryText(story.text, textDisplay);
        
        // Add reading controls
        this.addReadingControls();
    }

    renderStoryText(text, container) {
        // Reset reading state
        this.currentWordIndex = 0;
        this.isReadingMode = false;
        
        // Split text into words while preserving spaces and punctuation
        const parts = text.split(/(\s+)/);
        this.wordsList = [];
        let wordIndex = 0;
        
        const processedParts = parts.map(part => {
            if (/\w/.test(part)) { // This part contains letters (is a word)
                const wordId = `word-${wordIndex}`;
                this.wordsList.push({ index: wordIndex, text: part, id: wordId });
                
                if (this.highlightsEnabled) {
                    // Apply phonetic highlighting to the word
                    const highlightedWord = this.highlightPhoneticBlends(part);
                    wordIndex++;
                    return `<span class="story-word" id="${wordId}">${highlightedWord}</span>`;
                } else {
                    wordIndex++;
                    return `<span class="story-word" id="${wordId}">${this.escapeHtml(part)}</span>`;
                }
            } else {
                // This is whitespace or punctuation, keep as is
                return this.escapeHtml(part);
            }
        });
        
        container.innerHTML = processedParts.join('');
    }

    addReadingControls() {
        const readingContainer = document.querySelector('.reading-container');
        
        // Check if controls already exist
        if (document.getElementById('word-reading-controls')) {
            return;
        }
        
        const controlsHTML = `
            <div id="word-reading-controls" class="word-reading-controls">
                <h3>🎯 Word-by-Word Reading:</h3>
                <div class="reading-buttons">
                    <button id="play-reading" class="reading-btn">▶️ Start Reading</button>
                    <button id="prev-word" class="reading-btn">⬅️ Previous</button>
                    <button id="next-word" class="reading-btn">➡️ Next</button>
                    <button id="reset-reading" class="reading-btn">🔄 Reset</button>
                </div>
                <div class="reading-progress">
                    <span id="word-counter">Word 1 of ${this.wordsList.length}</span>
                    <div class="progress-bar">
                        <div id="progress-fill" class="progress-fill"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before the existing reading controls
        const existingControls = document.querySelector('.reading-controls');
        existingControls.insertAdjacentHTML('beforebegin', controlsHTML);
        
        this.updateWordCounter();
    }

    toggleReading() {
        const playBtn = document.getElementById('play-reading');
        
        if (this.isReadingMode) {
            // Stop reading
            this.stopReading();
            playBtn.textContent = '▶️ Start Reading';
        } else {
            // Start reading
            this.startReading();
            playBtn.textContent = '⏸️ Pause Reading';
        }
    }

    startReading() {
        this.isReadingMode = true;
        this.readingTimer = setInterval(() => {
            this.nextWord();
        }, this.readingSpeed);
        this.highlightCurrentWord();
    }

    stopReading() {
        this.isReadingMode = false;
        if (this.readingTimer) {
            clearInterval(this.readingTimer);
            this.readingTimer = null;
        }
    }

    nextWord() {
        if (this.currentWordIndex < this.wordsList.length - 1) {
            this.currentWordIndex++;
            this.highlightCurrentWord();
            this.updateWordCounter();
        } else {
            // Reached end of story
            this.stopReading();
            document.getElementById('play-reading').textContent = '▶️ Start Reading';
        }
    }

    previousWord() {
        if (this.currentWordIndex > 0) {
            this.currentWordIndex--;
            this.highlightCurrentWord();
            this.updateWordCounter();
        }
    }

    resetReading() {
        this.stopReading();
        this.currentWordIndex = 0;
        this.highlightCurrentWord();
        this.updateWordCounter();
        document.getElementById('play-reading').textContent = '▶️ Start Reading';
    }

    highlightCurrentWord() {
        // Remove previous highlighting
        document.querySelectorAll('.story-word').forEach(word => {
            word.classList.remove('current-word');
        });
        
        // Highlight current word
        if (this.wordsList[this.currentWordIndex]) {
            const currentWordElement = document.getElementById(this.wordsList[this.currentWordIndex].id);
            if (currentWordElement) {
                currentWordElement.classList.add('current-word');
                // Scroll into view if needed
                currentWordElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    updateWordCounter() {
        const counter = document.getElementById('word-counter');
        const progressFill = document.getElementById('progress-fill');
        
        if (counter && progressFill) {
            counter.textContent = `Word ${this.currentWordIndex + 1} of ${this.wordsList.length}`;
            const progress = ((this.currentWordIndex + 1) / this.wordsList.length) * 100;
            progressFill.style.width = `${progress}%`;
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