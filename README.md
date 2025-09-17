# Kids Story Learner

A web application designed to help kids learn to read by highlighting phonetic blends in stories.

## Features

- **📝 Story Upload**: Create and upload stories with text and optional images
- **📚 Story Management**: View, read, and delete stored stories
- **🎨 Phonetic Highlighting**: Automatic highlighting of starting and ending blends
- **💾 Local Storage**: Stories are saved in browser's local storage
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices

## How It Works

1. **Upload Stories**: Add story title, text content, and optional images
2. **Browse Stories**: View all uploaded stories in a grid layout
3. **Read with Highlights**: Stories display with phonetic blends highlighted:
   - **Green highlights**: Starting blends (bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sc, sk, sl, sm, sn, sp, st, sw, tr, tw, ch, sh, th, wh, ph)
   - **Orange highlights**: Ending blends (ing, tion, sion, ness, ment, ly, ed, er, est, an, en, on, ck, ng, nk, mp, nd, nt)
4. **Toggle Function**: Turn highlights on/off for comparison

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
- **Storage**: Browser Local Storage API
- **Responsive**: CSS Grid and Flexbox
- **No Dependencies**: Pure vanilla JavaScript implementation

## File Structure

```
├── index.html          # Main application page
├── styles.css          # Styling and responsive design
├── script.js           # Application logic and functionality
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```