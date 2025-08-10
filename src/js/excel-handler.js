// Excel Handler for ShikshaSathi Forms
// This file handles form data storage in Excel format without requiring a backend server

class ExcelDataHandler {
    constructor() {
        this.tutorData = this.loadData('tutorRegistrations');
        this.schoolData = this.loadData('schoolRegistrations');
        this.parentStudentData = this.loadData('parentStudentRegistrations');
        
        // Initialize data structure if empty
        if (!this.tutorData.length) {
            this.tutorData = [this.getTutorHeaders()];
        }
        if (!this.schoolData.length) {
            this.schoolData = [this.getSchoolHeaders()];
        }
        if (!this.parentStudentData.length) {
            this.parentStudentData = [this.getParentStudentHeaders()];
        }
    }

    // Load data from localStorage
    loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error loading ${key}:`, error);
            return [];
        }
    }

    // Save data to localStorage
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
            return false;
        }
    }

    // Get headers for Tutor Registration
    getTutorHeaders() {
        return [
            'Timestamp',
            'Full Name',
            'Gender',
            'Qualification',
            'Qualification Other',
            'Marital Status',
            'Subjects',
            'Subjects Other',
            'Teaching Standard',
            'Work Preference',
            'Training Program',
            'Eligibility Coaching',
            'Address',
            'Contact Number',
            'Email ID'
        ];
    }

    // Get headers for Partner School
    getSchoolHeaders() {
        return [
            'Timestamp',
            'School Name',
            'Pattern',
            'Contact Person',
            'Designation',
            'School Address',
            'Email',
            'Contact Number',
            'Teachers Required',
            'Subjects',
            'Subjects Other',
            'Salary Range',
            'Experience Required'
        ];
    }

    // Get headers for Parent/Student
    getParentStudentHeaders() {
        return [
            'Timestamp',
            'Parent Name',
            'Student Name',
            'Student Class',
            'School Name',
            'Pattern',
            'Tuition Subjects',
            'Tuition Subjects Other',
            'Tuition Location',
            'Residential Address',
            'Contact Number',
            'Alternate Number',
            'Email ID',
            'Specific Remarks'
        ];
    }

    // Add Tutor Registration data
    addTutorData(formData) {
        const timestamp = new Date().toLocaleString();
        const row = [
            timestamp,
            formData.fullName || '',
            formData.gender || '',
            formData.qualification || '',
            formData.qualificationOther || '',
            formData.maritalStatus || '',
            this.formatCheckboxValues(formData.subjects),
            formData.subjectsOtherText || '',
            this.formatCheckboxValues(formData.teachingStandard),
            formData.workPreference || '',
            formData.trainingProgram || '',
            this.formatCheckboxValues(formData.eligibilityCoaching),
            formData.address || '',
            formData.contactNumber || '',
            formData.emailId || ''
        ];

        this.tutorData.push(row);
        this.saveData('tutorRegistrations', this.tutorData);
        
        // Update Excel file in localStorage (don't download automatically)
        this.updateExcelFile('tutorRegistrations', 'Tutor_Registrations.xlsx');
        
        return true;
    }

    // Add Partner School data
    addSchoolData(formData) {
        const timestamp = new Date().toLocaleString();
        const row = [
            timestamp,
            formData.schoolName || '',
            formData.pattern || '',
            formData.contactPerson || '',
            formData.designation || '',
            formData.schoolAddress || '',
            formData.partnerEmail || '',
            formData.partnerContact || '',
            this.formatCheckboxValues(formData.teachersRequired),
            this.formatCheckboxValues(formData.partnerSubjects),
            formData.partnerSubjectsOtherText || '',
            formData.salaryRange || '',
            formData.experienceRequired || ''
        ];

        this.schoolData.push(row);
        this.saveData('schoolRegistrations', this.schoolData);
        
        // Update Excel file in localStorage (don't download automatically)
        this.updateExcelFile('schoolRegistrations', 'Partner_Schools.xlsx');
        
        return true;
    }

    // Add Parent/Student data
    addParentStudentData(formData) {
        const timestamp = new Date().toLocaleString();
        const row = [
            timestamp,
            formData.parentName || '',
            formData.studentName || '',
            formData.studentClass || '',
            formData.schoolName || '',
            formData.pattern || '',
            this.formatCheckboxValues(formData.tuitionSubjects),
            formData.tuitionSubjectsOtherText || '',
            this.formatCheckboxValues(formData.tuitionLocation),
            formData.residentialAddress || '',
            formData.contactNumber || '',
            formData.alternateNumber || '',
            formData.emailId || '',
            formData.specificRemarks || ''
        ];

        this.parentStudentData.push(row);
        this.saveData('parentStudentRegistrations', this.parentStudentData);
        
        // Update Excel file in localStorage (don't download automatically)
        this.updateExcelFile('parentStudentRegistrations', 'Parent_Student_Registrations.xlsx');
        
        return true;
    }

    // Format checkbox values for display
    formatCheckboxValues(values) {
        if (!values) return '';
        if (Array.isArray(values)) {
            return values.join(', ');
        }
        return values;
    }

    // Update Excel file in localStorage (without downloading)
    updateExcelFile(dataKey, filename) {
        try {
            // Check if SheetJS is available
            if (typeof XLSX === 'undefined') {
                console.log('SheetJS not loaded, updating localStorage only');
                return false;
            }
            
            // Get the data to update
            let data = [];
            switch(dataKey) {
                case 'tutorRegistrations':
                    data = this.tutorData;
                    break;
                case 'schoolRegistrations':
                    data = this.schoolData;
                    break;
                case 'parentStudentRegistrations':
                    data = this.parentStudentData;
                    break;
                default:
                    console.error('Unknown data key:', dataKey);
                    return false;
            }
            
            // Create workbook and worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            
            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            
            // Convert to binary string and store in localStorage
            const excelBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
            
            // Store the Excel file data in localStorage
            const storageKey = `excel_${dataKey}`;
            localStorage.setItem(storageKey, excelBinary);
            
            console.log(`✅ Excel file updated for ${dataKey} and stored in localStorage`);
            return true;
            
        } catch (error) {
            console.error('Error updating Excel file:', error);
            return false;
        }
    }

    // Download Excel file (only when explicitly requested)
    async downloadExcelFile(dataKey, filename) {
        try {
            // Check if SheetJS is available
            if (typeof XLSX === 'undefined') {
                console.log('SheetJS not loaded, saving to localStorage only');
                return;
            }

            let data, headers;
            switch (dataKey) {
                case 'tutorRegistrations':
                    data = this.tutorData;
                    headers = this.getTutorHeaders();
                    break;
                case 'schoolRegistrations':
                    data = this.schoolData;
                    headers = this.getSchoolHeaders();
                    break;
                case 'parentStudentRegistrations':
                    data = this.parentStudentData;
                    headers = this.getParentStudentHeaders();
                    break;
                default:
                    console.error('Unknown data key:', dataKey);
                    return;
            }

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(data);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

            // Generate Excel file and download
            XLSX.writeFile(wb, filename);
            
            console.log(`Excel file ${filename} downloaded successfully`);
        } catch (error) {
            console.error('Error downloading Excel file:', error);
            // Fallback: show data in console
            this.showDataInConsole(dataKey);
        }
    }

    // Fallback: show data in console
    showDataInConsole(dataKey) {
        let data;
        switch (dataKey) {
            case 'tutorRegistrations':
                data = this.tutorData;
                break;
            case 'schoolRegistrations':
                data = this.schoolData;
                break;
            case 'parentStudentRegistrations':
                data = this.parentStudentData;
                break;
        }
        
        console.log(`${dataKey} data:`, data);
        console.log('Copy this data and paste into Excel manually if needed.');
    }

    // Get all data for admin view
    getAllData() {
        return {
            tutorRegistrations: this.tutorData,
            schoolRegistrations: this.schoolData,
            parentStudentRegistrations: this.parentStudentData
        };
    }

    // Export all data as CSV (fallback method)
    exportAllAsCSV() {
        const allData = this.getAllData();
        let csvContent = '';

        // Export each dataset
        Object.keys(allData).forEach(key => {
            csvContent += `\n\n=== ${key.toUpperCase()} ===\n\n`;
            const data = allData[key];
            if (data.length > 0) {
                csvContent += data.map(row => row.join(',')).join('\n');
            }
        });

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'ShikshaSathi_All_Data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Clear all data (admin function)
    clearAllData() {
        if (confirm('Are you sure you want to clear all registration data? This action cannot be undone.')) {
            this.tutorData = [this.getTutorHeaders()];
            this.schoolData = [this.getSchoolHeaders()];
            this.parentStudentData = [this.getParentStudentHeaders()];
            
            this.saveData('tutorRegistrations', this.tutorData);
            this.saveData('schoolRegistrations', this.schoolData);
            this.saveData('parentStudentRegistrations', this.parentStudentData);
            
            alert('All data has been cleared.');
            return true;
        }
        return false;
    }

    // Get statistics
    getStatistics() {
        return {
            totalTutorRegistrations: this.tutorData.length - 1, // Subtract header row
            totalSchoolRegistrations: this.schoolData.length - 1,
            totalParentStudentRegistrations: this.parentStudentData.length - 1,
            totalRegistrations: (this.tutorData.length + this.schoolData.length + this.parentStudentData.length) - 3,
            lastUpdated: new Date().toLocaleString()
        };
    }
}

// Initialize the Excel handler
const excelHandler = new ExcelDataHandler();

// Export for use in other files
window.ExcelDataHandler = ExcelDataHandler;
window.excelHandler = excelHandler; 