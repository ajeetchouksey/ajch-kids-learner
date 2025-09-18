// Example: Text-to-Speech Integration for Kids Story Learner
// This demonstrates how to add AI-powered speech synthesis to enhance the reading experience

class StoryReader {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.isReading = false;
        this.highlightedElement = null;
        this.words = [];
        this.currentWordIndex = 0;
    }

    // Initialize TTS with child-friendly voice
    init() {
        // Wait for voices to load
        if (this.synthesis.getVoices().length === 0) {
            this.synthesis.addEventListener('voiceschanged', () => {
                this.selectBestVoice();
            });
        } else {
            this.selectBestVoice();
        }
    }

    // Select the most appropriate voice for children
    selectBestVoice() {
        const voices = this.synthesis.getVoices();
        
        // Prefer female voices for children (research shows better engagement)
        const femaleVoices = voices.filter(voice => 
            voice.name.toLowerCase().includes('female') || 
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('alice') ||
            voice.name.toLowerCase().includes('samantha')
        );

        // Prefer English voices
        const englishVoices = voices.filter(voice => 
            voice.lang.startsWith('en')
        );

        // Priority: Female English > Any English > Any Female > Default
        this.selectedVoice = femaleVoices.find(voice => voice.lang.startsWith('en')) ||
                            englishVoices[0] ||
                            femaleVoices[0] ||
                            voices[0];
    }

    // Read story with word-by-word highlighting
    async readStory(text, options = {}) {
        if (this.isReading) {
            this.stop();
            return;
        }

        const config = {
            rate: options.speed || 0.7,  // Slower for children
            pitch: options.pitch || 1.1, // Slightly higher pitch
            volume: options.volume || 0.8,
            highlightWords: options.highlightWords !== false,
            pauseOnPunctuation: options.pauseOnPunctuation !== false,
            ...options
        };

        // Prepare text for word-by-word reading
        this.words = this.prepareText(text);
        this.currentWordIndex = 0;
        this.isReading = true;

        // Update UI
        this.updatePlayButton(true);

        if (config.highlightWords) {
            await this.readWithHighlighting(config);
        } else {
            await this.readComplete(text, config);
        }
    }

    // Prepare text by splitting into words and preserving punctuation
    prepareText(text) {
        // Split text into words while preserving punctuation and spacing
        const words = text.match(/\S+|\s+/g) || [];
        return words.map((word, index) => ({
            text: word.trim(),
            isWord: /\w/.test(word),
            isPunctuation: /[.!?]/.test(word),
            index
        }));
    }

    // Read with word-by-word highlighting
    async readWithHighlighting(config) {
        for (let i = 0; i < this.words.length && this.isReading; i++) {
            const wordObj = this.words[i];
            
            if (wordObj.isWord) {
                // Highlight current word
                this.highlightCurrentWord(i);
                
                // Speak the word
                await this.speakWord(wordObj.text, config);
                
                // Add pause after punctuation
                if (wordObj.isPunctuation && config.pauseOnPunctuation) {
                    await this.pause(300);
                }
            }
        }

        this.finishReading();
    }

    // Read complete text without highlighting
    readComplete(text, config) {
        return new Promise((resolve) => {
            this.currentUtterance = new SpeechSynthesisUtterance(text);
            this.currentUtterance.voice = this.selectedVoice;
            this.currentUtterance.rate = config.rate;
            this.currentUtterance.pitch = config.pitch;
            this.currentUtterance.volume = config.volume;

            this.currentUtterance.onend = () => {
                this.finishReading();
                resolve();
            };

            this.currentUtterance.onerror = (error) => {
                console.error('Speech synthesis error:', error);
                this.finishReading();
                resolve();
            };

            this.synthesis.speak(this.currentUtterance);
        });
    }

    // Speak individual word
    speakWord(word, config) {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.voice = this.selectedVoice;
            utterance.rate = config.rate;
            utterance.pitch = config.pitch;
            utterance.volume = config.volume;

            utterance.onend = resolve;
            utterance.onerror = resolve;

            this.synthesis.speak(utterance);
        });
    }

    // Highlight current word in the story display
    highlightCurrentWord(wordIndex) {
        // Remove previous highlight
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove('word-highlight');
        }

        // Find and highlight current word
        const storyDisplay = document.getElementById('story-text-display');
        if (storyDisplay) {
            const wordElements = storyDisplay.querySelectorAll('.word-span');
            if (wordElements[wordIndex]) {
                wordElements[wordIndex].classList.add('word-highlight');
                this.highlightedElement = wordElements[wordIndex];
                
                // Scroll to current word
                wordElements[wordIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }

    // Utility function for pauses
    pause(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    // Stop reading
    stop() {
        this.isReading = false;
        this.synthesis.cancel();
        
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove('word-highlight');
            this.highlightedElement = null;
        }
        
        this.updatePlayButton(false);
    }

    // Finish reading cleanup
    finishReading() {
        this.isReading = false;
        this.currentWordIndex = 0;
        
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove('word-highlight');
            this.highlightedElement = null;
        }
        
        this.updatePlayButton(false);
        
        // Show completion message
        this.showCompletionFeedback();
    }

    // Update play/pause button
    updatePlayButton(isPlaying) {
        const button = document.getElementById('read-aloud-btn');
        if (button) {
            button.textContent = isPlaying ? '⏸️ Pause Reading' : '🔊 Read Aloud';
            button.setAttribute('aria-label', isPlaying ? 'Pause reading' : 'Start reading aloud');
        }
    }

    // Show reading completion feedback
    showCompletionFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'reading-complete-feedback';
        feedback.innerHTML = `
            <div class="feedback-content">
                🎉 Great job reading! 
                <button onclick="this.parentElement.parentElement.remove()">Continue</button>
            </div>
        `;
        
        document.body.appendChild(feedback);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 3000);
    }

    // Prepare story text with word spans for highlighting
    prepareStoryForReading(storyText) {
        const words = storyText.split(/(\s+)/);
        return words.map((word, index) => {
            if (/\w/.test(word)) {
                return `<span class="word-span" data-word-index="${index}">${word}</span>`;
            }
            return word;
        }).join('');
    }
}

// Reading Level Assessment using AI-like algorithms
class ReadingLevelAnalyzer {
    constructor() {
        this.gradeRanges = {
            'Pre-K': { min: 0, max: 30 },
            'Kindergarten': { min: 30, max: 50 },
            'Grade 1': { min: 50, max: 60 },
            'Grade 2': { min: 60, max: 70 },
            'Grade 3': { min: 70, max: 80 },
            'Grade 4': { min: 80, max: 90 },
            'Grade 5+': { min: 90, max: 100 }
        };
    }

    // Analyze text complexity using multiple metrics
    analyzeText(text) {
        const sentences = this.countSentences(text);
        const words = this.countWords(text);
        const syllables = this.countSyllables(text);
        
        // Flesch Reading Ease Score
        const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
        
        // Additional metrics for children's books
        const avgWordsPerSentence = words / sentences;
        const avgSyllablesPerWord = syllables / words;
        const complexWords = this.countComplexWords(text);
        
        return {
            fleschScore: Math.round(fleschScore),
            gradeLevel: this.getGradeLevel(fleschScore),
            metrics: {
                sentences,
                words,
                syllables,
                avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
                avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 10) / 10,
                complexWordPercentage: Math.round((complexWords / words) * 100)
            },
            difficulty: this.getDifficultyLabel(fleschScore),
            recommendations: this.getRecommendations(fleschScore, avgWordsPerSentence, complexWords / words)
        };
    }

    countSentences(text) {
        return (text.match(/[.!?]+/g) || []).length || 1;
    }

    countWords(text) {
        return (text.match(/\b\w+\b/g) || []).length;
    }

    countSyllables(text) {
        const words = text.match(/\b\w+\b/g) || [];
        return words.reduce((total, word) => total + this.syllablesInWord(word), 0);
    }

    syllablesInWord(word) {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        
        const vowels = 'aeiouy';
        let syllables = 0;
        let previousWasVowel = false;
        
        for (let i = 0; i < word.length; i++) {
            const isVowel = vowels.includes(word[i]);
            if (isVowel && !previousWasVowel) {
                syllables++;
            }
            previousWasVowel = isVowel;
        }
        
        // Handle silent e
        if (word.endsWith('e') && syllables > 1) {
            syllables--;
        }
        
        return Math.max(1, syllables);
    }

    countComplexWords(text) {
        const words = text.match(/\b\w+\b/g) || [];
        return words.filter(word => this.syllablesInWord(word) >= 3).length;
    }

    getGradeLevel(fleschScore) {
        for (const [grade, range] of Object.entries(this.gradeRanges)) {
            if (fleschScore >= range.min && fleschScore <= range.max) {
                return grade;
            }
        }
        return 'Advanced';
    }

    getDifficultyLabel(fleschScore) {
        if (fleschScore >= 90) return 'Very Easy';
        if (fleschScore >= 80) return 'Easy';
        if (fleschScore >= 70) return 'Fairly Easy';
        if (fleschScore >= 60) return 'Standard';
        if (fleschScore >= 50) return 'Fairly Difficult';
        if (fleschScore >= 30) return 'Difficult';
        return 'Very Difficult';
    }

    getRecommendations(fleschScore, avgWordsPerSentence, complexWordRatio) {
        const recommendations = [];
        
        if (avgWordsPerSentence > 15) {
            recommendations.push('Consider shorter sentences for better comprehension');
        }
        
        if (complexWordRatio > 0.2) {
            recommendations.push('Story contains many complex words - good for vocabulary building');
        }
        
        if (fleschScore < 50) {
            recommendations.push('This story may be challenging - consider reading together');
        }
        
        if (fleschScore > 90) {
            recommendations.push('Perfect for independent reading practice');
        }
        
        return recommendations;
    }
}

// Usage example for integration with existing Kids Story Learner
class EnhancedStoryLearner extends StoryLearnerApp {
    constructor() {
        super();
        this.storyReader = new StoryReader();
        this.readingAnalyzer = new ReadingLevelAnalyzer();
        this.initAIFeatures();
    }

    initAIFeatures() {
        this.storyReader.init();
        this.addReadAloudButton();
        this.addReadingLevelDisplay();
    }

    addReadAloudButton() {
        const readingControls = document.querySelector('.reading-controls');
        if (readingControls) {
            const readAloudBtn = document.createElement('button');
            readAloudBtn.id = 'read-aloud-btn';
            readAloudBtn.className = 'btn-secondary';
            readAloudBtn.textContent = '🔊 Read Aloud';
            readAloudBtn.addEventListener('click', () => this.toggleReading());
            
            readingControls.appendChild(readAloudBtn);
        }
    }

    addReadingLevelDisplay() {
        // Add reading level indicator to story cards
        const storyCards = document.querySelectorAll('.story-card');
        storyCards.forEach(card => {
            const storyText = card.querySelector('p').textContent;
            const analysis = this.readingAnalyzer.analyzeText(storyText);
            
            const levelBadge = document.createElement('div');
            levelBadge.className = 'reading-level-badge';
            levelBadge.textContent = analysis.gradeLevel;
            levelBadge.title = `Reading Level: ${analysis.gradeLevel} (${analysis.difficulty})`;
            
            card.appendChild(levelBadge);
        });
    }

    toggleReading() {
        const storyText = document.getElementById('story-text-display').textContent;
        if (storyText) {
            this.storyReader.readStory(storyText, {
                highlightWords: true,
                speed: 0.8
            });
        }
    }

    // Override displayStory to include AI features
    displayStory(story) {
        super.displayStory(story);
        
        // Add reading level analysis
        const analysis = this.readingAnalyzer.analyzeText(story.text);
        this.displayReadingAnalysis(analysis);
        
        // Prepare text for word highlighting
        const textDisplay = document.getElementById('story-text-display');
        if (textDisplay && this.highlightsEnabled) {
            const preparedText = this.storyReader.prepareStoryForReading(
                this.highlightPhoneticBlends(story.text)
            );
            textDisplay.innerHTML = preparedText;
        }
    }

    displayReadingAnalysis(analysis) {
        const existingAnalysis = document.querySelector('.reading-analysis');
        if (existingAnalysis) {
            existingAnalysis.remove();
        }

        const analysisDiv = document.createElement('div');
        analysisDiv.className = 'reading-analysis';
        analysisDiv.innerHTML = `
            <h4>📊 Reading Analysis</h4>
            <div class="analysis-metrics">
                <span class="metric">Level: ${analysis.gradeLevel}</span>
                <span class="metric">Difficulty: ${analysis.difficulty}</span>
                <span class="metric">Words: ${analysis.metrics.words}</span>
                <span class="metric">Sentences: ${analysis.metrics.sentences}</span>
            </div>
            ${analysis.recommendations.length > 0 ? `
                <div class="recommendations">
                    <strong>💡 Tips:</strong>
                    <ul>${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>
                </div>
            ` : ''}
        `;

        const readingControls = document.querySelector('.reading-controls');
        if (readingControls) {
            readingControls.appendChild(analysisDiv);
        }
    }
}

// CSS Styles for AI features (to be added to styles.css)
const aiStyles = `
/* AI Feature Styles */
.word-highlight {
    background: linear-gradient(120deg, #ffeb3b 0%, #ffc107 100%);
    color: #333;
    padding: 2px 4px;
    border-radius: 3px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.reading-analysis {
    background: #f0f8ff;
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    border-left: 4px solid #4a90e2;
}

.analysis-metrics {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin: 10px 0;
}

.metric {
    background: #e3f2fd;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.9rem;
    color: #1976d2;
}

.reading-level-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #4a90e2;
    color: white;
    padding: 4px 8px;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: bold;
}

.recommendations ul {
    margin: 5px 0;
    padding-left: 20px;
}

.recommendations li {
    margin: 3px 0;
    font-size: 0.9rem;
}

.reading-complete-feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(74, 144, 226, 0.95);
    color: white;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    z-index: 1000;
    animation: fadeInScale 0.3s ease;
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.feedback-content button {
    background: white;
    color: #4a90e2;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    margin-top: 10px;
    cursor: pointer;
    font-weight: bold;
}
`;

// Initialize enhanced version
// document.addEventListener('DOMContentLoaded', () => {
//     const enhancedApp = new EnhancedStoryLearner();
// });