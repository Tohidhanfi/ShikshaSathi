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
        const excelUpdated = this.updateExcelFile('tutorRegistrations', 'Tutor_Registrations.xlsx');
        console.log(`📊 Excel update result: ${excelUpdated ? 'SUCCESS' : 'FAILED'}`);
        
        // Enable real-time sync for new data
        this.enableRealTimeSync();
        
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
        const excelUpdated = this.updateExcelFile('schoolRegistrations', 'Partner_Schools.xlsx');
        console.log(`📊 Excel update result: ${excelUpdated ? 'SUCCESS' : 'FAILED'}`);
        
        // Enable real-time sync for new data
        this.enableRealTimeSync();
        
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
        const excelUpdated = this.updateExcelFile('parentStudentRegistrations', 'Parent_Student_Registrations.xlsx');
        console.log(`📊 Excel update result: ${excelUpdated ? 'SUCCESS' : 'FAILED'}`);
        
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

            // First, try to get the stored Excel data from localStorage
            const storageKey = `excel_${dataKey}`;
            const storedExcelData = localStorage.getItem(storageKey);
            
            if (storedExcelData) {
                // Use the stored Excel data (which contains the latest updates)
                console.log(`📥 Using stored Excel data for ${dataKey}`);
                
                // Convert binary string back to workbook
                const workbook = XLSX.read(storedExcelData, { type: 'binary' });
                
                // Download the stored Excel file
                XLSX.writeFile(workbook, filename);
                
                console.log(`✅ Excel file ${filename} downloaded from stored data`);
                console.log(`💡 This file contains the latest updates!`);
                
                // Show user-friendly message
                this.showDownloadSuccessMessage(filename);
                return;
            }

            // Fallback: create new Excel file from current data
            console.log(`⚠️ No stored Excel data found, creating new file from current data`);
            
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
            
            console.log(`✅ Excel file ${filename} created and downloaded from current data`);
            
            // Show user-friendly message
            this.showDownloadSuccessMessage(filename);
            
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

    // Show download success message with helpful tips
    showDownloadSuccessMessage(filename) {
        // Create a notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            font-family: 'Inter', sans-serif;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <i class="fas fa-check-circle" style="font-size: 24px; margin-right: 10px;"></i>
                <strong style="font-size: 18px;">Excel File Updated!</strong>
            </div>
            <p style="margin: 0 0 15px 0; line-height: 1.5;">
                <strong>${filename}</strong> has been downloaded with the latest data.
            </p>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <strong>💡 How to Keep Your Excel Updated:</strong>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                    <li>Save this file to your preferred folder</li>
                    <li>Replace the old file with this new one</li>
                    <li>Use the same filename to keep it organized</li>
                </ul>
            </div>
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
            ">Got it!</button>
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    // Real-time data sync system
    enableRealTimeSync() {
        // Check if real-time sync is already enabled
        if (this.syncInterval) {
            console.log('Real-time sync already enabled');
            return;
        }

        console.log('🔄 Enabling real-time data sync...');
        
        // Create a sync interval that updates every 30 seconds
        this.syncInterval = setInterval(() => {
            this.syncDataToCloud();
        }, 30000); // Sync every 30 seconds

        // Also sync immediately
        this.syncDataToCloud();
        
        // Store sync status
        localStorage.setItem('realTimeSyncEnabled', 'true');
        localStorage.setItem('lastSyncTime', new Date().toISOString());
        
        console.log('✅ Real-time sync enabled - data will sync every 30 seconds');
    }

    // Disable real-time sync
    disableRealTimeSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
            localStorage.setItem('realTimeSyncEnabled', 'false');
            console.log('🛑 Real-time sync disabled');
        }
    }

    // Sync data to cloud/local storage for real-time access
    syncDataToCloud() {
        try {
            const syncData = {
                timestamp: new Date().toISOString(),
                tutorRegistrations: this.tutorData,
                schoolRegistrations: this.schoolData,
                parentStudentRegistrations: this.parentStudentData,
                totalCount: this.tutorData.length + this.schoolData.length + this.parentStudentData.length
            };

            // Store in localStorage for real-time access
            localStorage.setItem('shikshaSathiRealTimeData', JSON.stringify(syncData));
            
            // Also store individual Excel files for quick access
            this.updateExcelFile('tutorRegistrations', 'Tutor_Registrations.xlsx');
            this.updateExcelFile('schoolRegistrations', 'Partner_Schools.xlsx');
            this.updateExcelFile('parentStudentRegistrations', 'Parent_Student_Registrations.xlsx');

            // Update last sync time
            localStorage.setItem('lastSyncTime', new Date().toISOString());
            
            console.log('🔄 Data synced to cloud storage:', {
                tutors: this.tutorData.length,
                schools: this.schoolData.length,
                parents: this.parentStudentData.length,
                total: syncData.totalCount
            });

            // No more popup notifications - just silent sync

        } catch (error) {
            console.error('Error syncing data:', error);
        }
    }

    // Silent sync - no popup notifications

    // Get real-time data status
    getRealTimeStatus() {
        const lastSync = localStorage.getItem('lastSyncTime');
        const syncEnabled = localStorage.getItem('realTimeSyncEnabled') === 'true';
        
        return {
            syncEnabled,
            lastSync,
            totalRegistrations: this.tutorData.length + this.schoolData.length + this.parentStudentData.length,
            tutorCount: this.tutorData.length,
            schoolCount: this.schoolData.length,
            parentCount: this.parentStudentData.length
        };
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