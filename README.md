# ShikshaSathi - Form Management System

A comprehensive form management system for ShikshaSathi that collects data from three different user types and stores it in Excel format without requiring a backend server.

## Features

### 🎯 Three Registration Forms
1. **Register as a Tutor** - For unemployed graduates to become private tutors
2. **Join as a Partner School** - For schools to partner with ShikshaSathi
3. **Join as a Parent/Student** - For parents and students to access tutoring services

### 📊 Data Storage
- **No Backend Required** - All data is stored locally in the browser
- **Excel Format** - Data is automatically formatted for Excel export
- **Local Storage** - Data persists between browser sessions
- **Real-time Updates** - Data is immediately available after form submission

### 🔧 Admin Dashboard
- **View All Submissions** - See data from all three forms in organized tables
- **Search & Filter** - Find specific entries quickly
- **Export Options** - Download data as Excel (.xlsx) or CSV files
- **Statistics** - Real-time counts of all registrations
- **Data Management** - Refresh, clear, and manage collected data

## How to Use

### For Users (Form Submission)
1. Open `index.html` in a web browser
2. Click on any of the three registration buttons:
   - "Register as a Tutor"
   - "Join as a Partner School" 
   - "Join as a Parent/Student"
3. Fill out the form with required information
4. Click "Submit" to save your registration
5. Your data will be automatically stored and available in the admin dashboard

### For Administrators
1. Access the admin dashboard by clicking "Admin" in the navigation menu
2. **Enter the admin password** when prompted (default: `ShikshaSathi2024`)
3. View real-time statistics on the dashboard
4. Navigate between different data tabs:
   - **Tutors** - View all tutor registrations
   - **Schools** - View all partner school registrations
   - **Parents/Students** - View all parent/student registrations
5. Use search boxes to find specific entries
6. Export data using various formats:
   - Individual Excel files for each form type
   - Combined Excel file with multiple sheets
   - CSV exports for each form type
   - Combined CSV export
7. **Logout** when finished to secure the dashboard

## Technical Details

### Data Storage
- **Local Storage Keys:**
  - `tutorRegistrations` - Tutor form submissions
  - `schoolRegistrations` - Partner school submissions
  - `parentStudentRegistrations` - Parent/student submissions

### File Structure
```
ShikshaSathi/
├── index.html                 # Main page with forms
├── admin-dashboard.html       # Admin dashboard
├── src/
│   ├── js/
│   │   ├── script.js         # Main JavaScript functionality
│   │   └── excel-handler.js  # Excel data handling
│   └── css/
│       └── styles.css        # Styling
└── README.md                 # This file
```

### Dependencies
- **SheetJS (XLSX)** - For Excel file generation
- **Font Awesome** - For icons
- **Google Fonts (Inter)** - For typography

## Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers supported

## Data Export Options

### Excel Export
- Individual Excel files for each form type
- Combined Excel file with multiple sheets
- Proper column headers and formatting

### CSV Export
- Standard CSV format compatible with Excel, Google Sheets, etc.
- Individual CSV files for each form type
- Combined CSV export option

## Security & Privacy
- **Local Storage Only** - Data never leaves the user's device
- **No Server Communication** - Complete offline functionality
- **User Control** - Users can clear their own data
- **Password Protection** - Admin dashboard requires password (default: `ShikshaSathi2024`)

## Troubleshooting

### Data Not Appearing
- Check if the browser supports localStorage
- Ensure JavaScript is enabled
- Try refreshing the page

### Export Issues
- Ensure SheetJS library is loaded for Excel export
- Use CSV export as fallback if Excel fails
- Check browser console for error messages

### Form Submission Problems
- Verify all required fields are filled
- Check browser console for validation errors
- Ensure the form is properly connected to the data handler

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
