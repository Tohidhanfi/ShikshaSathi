// Excel Export System for ShikshaSathi Forms
// This system collects form data and exports it to Excel format

class ExcelExporter {
    constructor() {
        this.tutorData = [];
        this.schoolData = [];
        this.parentStudentData = [];
        this.initializeData();
    }

    // Initialize data from localStorage if available
    initializeData() {
        this.tutorData = JSON.parse(localStorage.getItem('shikshaSathi_tutorData')) || [];
        this.schoolData = JSON.parse(localStorage.getItem('shikshaSathi_schoolData')) || [];
        this.parentStudentData = JSON.parse(localStorage.getItem('shikshaSathi_parentStudentData')) || [];
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('shikshaSathi_tutorData', JSON.stringify(this.tutorData));
        localStorage.setItem('shikshaSathi_schoolData', JSON.stringify(this.schoolData));
        localStorage.setItem('shikshaSathi_parentStudentData', JSON.stringify(this.parentStudentData));
    }

    // Add tutor registration data
    addTutorData(formData) {
        const data = {
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            fullName: formData.fullName || '',
            gender: formData.gender || '',
            qualification: formData.qualification || '',
            qualificationOther: formData.qualificationOther || '',
            maritalStatus: formData.maritalStatus || '',
            subjects: Array.isArray(formData.subjects) ? formData.subjects.join(', ') : formData.subjects || '',
            subjectsOther: formData.subjectsOtherText || '',
            teachingStandard: Array.isArray(formData.teachingStandard) ? formData.teachingStandard.join(', ') : formData.teachingStandard || '',
            workPreference: formData.workPreference || '',
            trainingProgram: formData.trainingProgram || '',
            eligibilityCoaching: Array.isArray(formData.eligibilityCoaching) ? formData.eligibilityCoaching.join(', ') : formData.eligibilityCoaching || '',
            address: formData.address || '',
            contactNumber: formData.contactNumber || '',
            emailId: formData.emailId || ''
        };
        
        this.tutorData.push(data);
        this.saveData();
        return data;
    }

    // Add school partnership data
    addSchoolData(formData) {
        const data = {
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            schoolName: formData.schoolName || '',
            pattern: formData.pattern || '',
            contactPerson: formData.contactPerson || '',
            designation: formData.designation || '',
            schoolAddress: formData.schoolAddress || '',
            contactNumber: formData.contactNumber || '',
            emailId: formData.emailId || '',
            subjectsRequired: Array.isArray(formData.subjectsRequired) ? formData.subjectsRequired.join(', ') : formData.subjectsRequired || '',
            subjectsOther: formData.subjectsOtherText || '',
            standards: formData.standards || '',
            studentCount: formData.studentCount || '',
            partnershipType: formData.partnershipType || ''
        };
        
        this.schoolData.push(data);
        this.saveData();
        return data;
    }

    // Add parent/student registration data
    addParentStudentData(formData) {
        const data = {
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            parentName: formData.parentName || '',
            studentName: formData.studentName || '',
            studentClass: formData.studentClass || '',
            schoolName: formData.schoolName || '',
            pattern: formData.pattern || '',
            tuitionSubjects: Array.isArray(formData.tuitionSubjects) ? formData.tuitionSubjects.join(', ') : formData.tuitionSubjects || '',
            tuitionSubjectsOther: formData.tuitionSubjectsOtherText || '',
            tuitionLocation: Array.isArray(formData.tuitionLocation) ? formData.tuitionLocation.join(', ') : formData.tuitionLocation || '',
            preferredTime: formData.preferredTime || '',
            address: formData.address || '',
            contactNumber: formData.contactNumber || '',
            emailId: formData.emailId || ''
        };
        
        this.parentStudentData.push(data);
        this.saveData();
        return data;
    }

    // Get statistics
    getStats() {
        return {
            tutor: this.tutorData.length,
            school: this.schoolData.length,
            parentStudent: this.parentStudentData.length,
            total: this.tutorData.length + this.schoolData.length + this.parentStudentData.length
        };
    }

    // Export data to CSV format (Excel compatible)
    exportToCSV(data, filename) {
        if (data.length === 0) {
            alert('No data to export!');
            return;
        }

        // Get headers from first data object
        const headers = Object.keys(data[0]);
        
        // Create CSV content
        let csvContent = headers.join(',') + '\n';
        
        data.forEach(row => {
            const values = headers.map(header => {
                let value = row[header] || '';
                // Escape commas and quotes in values
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                return value;
            });
            csvContent += values.join(',') + '\n';
        });

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Export tutor data
    exportTutorData() {
        this.exportToCSV(this.tutorData, `tutor_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // Export school data
    exportSchoolData() {
        this.exportToCSV(this.schoolData, `school_partnerships_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // Export parent/student data
    exportParentStudentData() {
        this.exportToCSV(this.parentStudentData, `parent_student_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    }

    // Export all data
    exportAllData() {
        const allData = {
            'Tutor Registrations': this.tutorData,
            'School Partnerships': this.schoolData,
            'Parent/Student Registrations': this.parentStudentData
        };

        // Create a zip file with all data
        this.createZipFile(allData);
    }

    // Create a zip file with all data (using JSZip library)
    async createZipFile(allData) {
        try {
            // Check if JSZip is available
            if (typeof JSZip === 'undefined') {
                // Fallback: export each file separately
                this.exportTutorData();
                setTimeout(() => this.exportSchoolData(), 1000);
                setTimeout(() => this.exportParentStudentData(), 2000);
                return;
            }

            const zip = new JSZip();
            
            // Add each data type to the zip
            Object.keys(allData).forEach(key => {
                if (allData[key].length > 0) {
                    const csvContent = this.convertToCSV(allData[key]);
                    zip.file(`${key.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`, csvContent);
                }
            });

            // Generate and download zip file
            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(content);
            link.setAttribute('href', url);
            link.setAttribute('download', `shiksha_sathi_data_${new Date().toISOString().split('T')[0]}.zip`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error creating zip file:', error);
            // Fallback to individual exports
            this.exportTutorData();
            setTimeout(() => this.exportSchoolData(), 1000);
            setTimeout(() => this.exportParentStudentData(), 2000);
        }
    }

    // Convert data to CSV string
    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        let csvContent = headers.join(',') + '\n';
        
        data.forEach(row => {
            const values = headers.map(header => {
                let value = row[header] || '';
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                return value;
            });
            csvContent += values.join(',') + '\n';
        });
        
        return csvContent;
    }

    // Clear all data (with confirmation)
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            this.tutorData = [];
            this.schoolData = [];
            this.parentStudentData = [];
            this.saveData();
            alert('All data has been cleared.');
            this.updateStatsDisplay();
        }
    }

    // Update statistics display
    updateStatsDisplay() {
        const stats = this.getStats();
        
        // Update any existing stats display elements
        const statsElements = document.querySelectorAll('[data-stat]');
        statsElements.forEach(element => {
            const statType = element.getAttribute('data-stat');
            if (stats[statType] !== undefined) {
                element.textContent = stats[statType];
            }
        });
    }
}

// Create global instance
window.excelExporter = new ExcelExporter();

// Export functions for global access
window.exportTutorData = () => window.excelExporter.exportTutorData();
window.exportSchoolData = () => window.excelExporter.exportSchoolData();
window.exportParentStudentData = () => window.excelExporter.exportParentStudentData();
window.exportAllData = () => window.excelExporter.exportAllData();
window.clearAllData = () => window.excelExporter.clearAllData();
window.getStats = () => window.excelExporter.getStats(); 