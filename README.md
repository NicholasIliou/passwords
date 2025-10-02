# Password Strength Checker & Generator

A comprehensive web-based tool for checking password strength and generating secure passwords. Features real-time strength analysis, breach checking via the "Have I Been Pwned" API, and a smart password generator with customizable options.

## 🚀 Features

### Password Strength Checker
- **Real-time Analysis**: Instant feedback as you type
- **Comprehensive Scoring**: 100-point scoring system based on multiple criteria
- **Visual Strength Meter**: Color-coded strength indicator (Weak/Fair/Good/Strong)
- **Detailed Criteria**: Visual checklist showing which requirements are met
- **Breach Detection**: Integration with Have I Been Pwned API to check for compromised passwords
- **Smart Suggestions**: Personalized recommendations to improve password strength

### Password Generator
- **Customizable Length**: Generate passwords from 8 to 128 characters
- **Character Options**: Toggle uppercase, lowercase, numbers, and special characters
- **Similar Character Exclusion**: Option to exclude easily confused characters (0, O, l, 1, I)
- **Guaranteed Variety**: Ensures at least one character from each selected type
- **Instant Strength Check**: Shows strength of generated password immediately
- **One-Click Copy**: Easy clipboard copying with visual feedback

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Privacy-First**: All processing happens in your browser - no data sent to servers
- **Accessible**: Keyboard navigation and screen reader friendly

## 🛠 Tech Stack

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Modern styling with Flexbox, Grid, and CSS animations
- **Vanilla JavaScript**: No frameworks - pure, fast JavaScript
- **Web Crypto API**: Secure SHA-1 hashing for breach checking
- **Font Awesome**: Beautiful icons throughout the interface
- **Google Fonts**: Inter font family for clean typography

## 📁 Project Structure

```
password_strength/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd password_strength
   ```

2. **Open in browser**:
   Simply open `index.html` in your web browser. No build process or server required!

3. **Development**:
   - Edit files directly
   - Refresh browser to see changes
   - Use browser developer tools for debugging

### GitHub Pages Deployment

This project is designed to work perfectly with GitHub Pages:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access your site**:
   Your site will be available at: `https://yourusername.github.io/password_strength`

## 🔐 Security Features

### Password Strength Analysis
- **Length scoring**: Longer passwords get higher scores
- **Character diversity**: Bonus points for using all character types
- **Common password detection**: Warns against top 100+ common passwords
- **Unique character ratio**: Rewards passwords with high character variety
- **Pattern detection**: Advanced analysis of password patterns

### Breach Checking
- **k-Anonymity**: Only sends first 5 characters of password hash to API
- **SHA-1 Hashing**: Secure client-side hashing before API call
- **Privacy Preserving**: Your actual password never leaves your browser
- **Real-time Results**: Instant feedback on password compromise status

### Password Generation
- **Cryptographically Secure**: Uses `crypto.getRandomValues()` for true randomness
- **Guaranteed Entropy**: Ensures minimum one character from each selected type
- **Customizable Complexity**: Full control over character sets and exclusions
- **Immediate Validation**: Generated passwords are immediately strength-tested

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
- **Required APIs**: 
  - Web Crypto API (for SHA-1 hashing)
  - Clipboard API (for copy functionality)
  - Fetch API (for breach checking)

## 🎨 Customization

### Colors and Themes
Edit `styles.css` to customize:
- Primary colors (currently purple gradient)
- Strength indicator colors
- Background gradients
- Button styles

### Password Criteria
Edit `script.js` to modify:
- Scoring algorithm in `checkPasswordStrength()`
- Common passwords list
- Character sets for generation
- Validation rules

### UI Components
- Add new tabs by modifying HTML structure
- Customize animations and transitions in CSS
- Add new features by extending JavaScript functions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Have I Been Pwned API](https://haveibeenpwned.com/API/v3) for breach checking
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- Password security best practices from [NIST](https://pages.nist.gov/800-63-3/)

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you have a modern browser with required API support
3. Verify internet connection for breach checking feature
4. Open an issue on GitHub for bug reports or feature requests

---