# ShikshaSathi - Form Management System

A comprehensive form management system for ShikshaSathi.

Important: Registration buttons now open Google Forms in a new tab. The in-page forms and offline/local Excel storage are bypassed when using Google Forms. See "Google Forms Navigation" below for details and how to change URLs.

## Features

### 🎯 Three Registration Flows
1. **Register as a Tutor** → Opens Google Form
2. **Join as a Partner School** → Opens Google Form
3. **Register as a Parent/Student** → Opens Google Form

### 📊 Data Storage
- When using Google Forms: Data is collected and stored in Google Forms/Sheets per your form configuration.
- When using in-page forms (legacy option): Data can be stored locally in the browser and exported to Excel. This path is currently disabled by default.

### 🔧 Admin Dashboard
- **View All Submissions** - See data from all three forms in organized tables
- **Search & Filter** - Find specific entries quickly
- **Export Options** - Download data as Excel (.xlsx) or CSV files
- **Statistics** - Real-time counts of all registrations
- **Data Management** - Refresh, clear, and manage collected data

## How to Use

### For Users (Form Submission)
1. Open `index.html` in a web browser
2. Click one of the registration buttons:
   - "Register as a Tutor"
   - "Register as a Partner School"
   - "Register as a Parent/Student"
3. A Google Form opens in a new tab. Complete and submit the form there.
4. Submissions are stored in the corresponding Google Form/Sheet.

Note: The in-page modals and local storage submission flow described below are inactive when Google Forms redirection is enabled.

## Google Forms Navigation

The following buttons in `index.html` open Google Forms:

- Tutor Registration: `https://forms.gle/FdpQ2G7GUagdjFht5`
- Partner School Registration: `https://forms.gle/UnnpivhYwQBAZywj8`
- Parent/Student Registration: `https://forms.gle/FjxPLqaXu1r1ThedA`

Where to update URLs in `index.html`:

- Hero section buttons
- Join Us section cards

Buttons use `window.open` in their `onclick` attributes. Example:

```html
<button class="btn btn-primary" onclick="window.open('https://forms.gle/XXXXXXXX', '_blank')">
  Register as a Tutor
</button>
```

Replace `https://forms.gle/XXXXXXXX` with your actual Google Form link for each button.



## Technical Details



### File Structure
```
ShikshaSathi/
├── index.html                 # Main page with forms

├── src/
│   ├── js/
│   │   └── script.js         # Main JavaScript functionality
│   └── css/
│       └── styles.css        # Styling
└── README.md                 # This file
```

### Dependencies
- **Font Awesome** - For icons
- **Google Fonts (Inter)** - For typography

## Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers supported



## Security & Privacy
- **Local Storage Only** - Data never leaves the user's device
- **No Server Communication** - Complete offline functionality
- **User Control** - Users can clear their own data

## Troubleshooting

### Data Not Appearing (Google Forms)
- Verify submissions in your Google Form/Sheet
- Ensure the Google Form is published and accessible to users

### Data Not Appearing (Legacy in-page forms)
- Check if the browser supports localStorage
- Ensure JavaScript is enabled
- Try refreshing the page



### Form Submission Problems
- Google Forms: Verify required fields in the Google Form and sharing settings
- In-page forms (legacy): Check browser console for validation errors and data handler availability

## Future Enhancements
- Data backup and restore functionality
- Advanced filtering and sorting options
- Data visualization and charts
- Multi-language support
- Cloud storage integration (optional)

## Support
For technical support or questions about the form system, please refer to the code comments or contact the development team.

---

**Note:** This system is designed to work completely offline without any backend server. All data is stored locally in the user's browser and can be exported for external use.
