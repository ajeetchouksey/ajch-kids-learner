// Kids Story Learner App - JavaScript
class StoryLearnerApp {
    constructor() {
        this.stories = this.loadStoriesFromStorage();
        this.currentStory = null;
        this.highlightsEnabled = true;
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

        // Reading controls
        document.getElementById('back-to-stories').addEventListener('click', () => this.showSection('stories'));
        document.getElementById('toggle-highlights').addEventListener('click', () => this.toggleHighlights());

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
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Story preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = '';
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

        // Display text with phonetic highlights
        const textDisplay = document.getElementById('story-text-display');
        if (this.highlightsEnabled) {
            textDisplay.innerHTML = this.highlightPhoneticBlends(story.text);
        } else {
            textDisplay.textContent = story.text;
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