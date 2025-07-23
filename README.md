# Drive OCR Share

A Progressive Web App (PWA) for capturing photos, performing OCR (Optical Character Recognition) with Japanese language support, and sharing directly to Google Drive.

## Features

- 📷 **Camera Capture**: Uses device's rear camera to capture photos
- 🔍 **OCR Processing**: In-browser text recognition using Tesseract.js with Japanese language support
- 📤 **Direct Sharing**: Share to Google Drive using Web Share API Level 2
- 📱 **PWA Support**: Install as an app on mobile devices
- 🔒 **Privacy-First**: All processing happens locally in your browser

## How to Run

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

### Production Build

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Requirements

- **HTTPS**: Camera access requires HTTPS in production (localhost works without HTTPS)
- **Modern Browser**: Chrome/Edge 93+, Safari 15.4+ (for Web Share API Level 2)
- **Camera Permission**: Grant camera access when prompted

## Technical Stack

- **Vite**: Fast build tool and dev server
- **Tesseract.js v5**: WebAssembly-based OCR engine
- **Vite PWA Plugin**: Service worker and manifest generation
- **Vanilla JavaScript**: No framework dependencies

## Browser Compatibility

- ✅ iOS 17+ Safari (PWA support)
- ✅ Android 14+ Chrome
- ✅ Desktop Chrome/Edge with webcam

## Notes

- iOS Safari requires `playsinline` and `muted` attributes on video elements
- Web Share API Level 2 (file sharing) has limited browser support
- Falls back to download when sharing is not available

## License

MIT License - See LICENSE file for details