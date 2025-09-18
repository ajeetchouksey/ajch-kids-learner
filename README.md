# Kids Story Learner

A web application designed to help kids learn to read by highlighting phonetic blends in stories.

## Features

- **📝 Story Upload**: Create and upload stories with text and optional images
- **🔍 OCR Text Extraction**: Extract text from uploaded images using Tesseract.js
- **📚 Story Management**: View, read, and delete stored stories
- **🎨 Phonetic Highlighting**: Automatic highlighting of starting and ending blends
- **💾 Local Storage**: Stories are saved in browser's local storage
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices

## How It Works

1. **Upload Stories**: Add story title, text content, and optional images
2. **OCR Text Extraction**: Upload an image with text and click "🔍 Extract Text from Image" to automatically extract and populate the story text
3. **Browse Stories**: View all uploaded stories in a grid layout
4. **Read with Highlights**: Stories display with phonetic blends highlighted:
   - **Green highlights**: Starting blends (bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sc, sk, sl, sm, sn, sp, st, sw, tr, tw, ch, sh, th, wh, ph)
   - **Orange highlights**: Ending blends (ing, tion, sion, ness, ment, ly, ed, er, est, an, en, on, ck, ng, nk, mp, nd, nt)
5. **Toggle Function**: Turn highlights on/off for comparison

## Getting Started

1. Open `index.html` in a web browser
2. Or serve using a local web server:
   ```bash
   python3 -m http.server 8000
   ```
3. Navigate to `http://localhost:8000`

## Example Usage

The app comes with sample stories to demonstrate the functionality:
- "The Smart Cat" - Shows various phonetic blends
- "The Flying Bird" - Demonstrates different blend patterns

## Educational Benefits

- Helps children identify phonetic patterns
- Improves reading fluency through visual cues
- Encourages story creation and reading comprehension
- Supports self-paced learning

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **OCR Library**: Tesseract.js for client-side text extraction
- **Storage**: Browser Local Storage API
- **Responsive**: CSS Grid and Flexbox
- **No Dependencies**: Pure vanilla JavaScript implementation with optional OCR enhancement

## AI/ML Capabilities

The Kids Story Learner application has significant potential for AI and Machine Learning enhancements. We've analyzed the current implementation and identified numerous opportunities to enhance the learning experience:

### 🤖 **Current AI Features**
- **OCR Text Extraction**: Tesseract.js for converting images to text
- **Phonetic Pattern Recognition**: Rule-based highlighting of reading blends

### 🚀 **Potential AI Enhancements**
- **Text-to-Speech**: Natural voice reading with word highlighting
- **Reading Level Assessment**: Automatic difficulty analysis and grading
- **Personalized Learning**: Adaptive recommendations based on progress
- **Enhanced OCR**: AI-powered text detection and correction
- **Vocabulary Analysis**: Smart word difficulty identification
- **Learning Analytics**: Progress tracking and insights

### 📚 **Documentation**
- [**AI/ML Capabilities Overview**](AI_ML_CAPABILITIES.md) - Comprehensive analysis of potential features
- [**Implementation Guide**](IMPLEMENTATION_GUIDE.md) - Step-by-step integration instructions
- [**AI Features Summary**](AI_ML_SUMMARY.md) - Executive summary and roadmap
- [**Live Demo**](examples/ai-demo.html) - Interactive demonstration of AI features

### 🎮 **Try the AI Demo**
See the potential AI features in action by opening [`examples/ai-demo.html`](examples/ai-demo.html) in your browser. The demo showcases:
- Text-to-Speech with customizable speed and pitch
- Real-time reading level analysis
- Enhanced phonetic highlighting
- Learning analytics dashboard

## File Structure

```
├── index.html              # Main application page
├── styles.css              # Styling and responsive design
├── script.js               # Application logic and functionality
├── README.md               # Documentation
├── .gitignore              # Git ignore rules
├── AI_ML_CAPABILITIES.md   # Detailed AI/ML feature analysis
├── AI_ML_SUMMARY.md        # Executive summary of AI capabilities
├── IMPLEMENTATION_GUIDE.md # Step-by-step AI integration guide
└── examples/
    ├── ai-demo.html        # Interactive AI features demonstration
    └── ai-features-demo.js # Complete AI implementation examples
```