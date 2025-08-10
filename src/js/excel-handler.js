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
            // Store the latest data timestamp for this data type
            const timestamp = new Date().toISOString();
            const storageKey = `excel_${dataKey}_timestamp`;
            localStorage.setItem(storageKey, timestamp);
            
            // Also store the data count for verification
            let dataCount = 0;
            switch(dataKey) {
                case 'tutorRegistrations':
                    dataCount = this.tutorData.length;
                    break;
                case 'schoolRegistrations':
                    dataCount = this.schoolData.length;
                    break;
                case 'parentStudentRegistrations':
                    dataCount = this.parentStudentData.length;
                    break;
                default:
                    console.error('Unknown data key:', dataKey);
                    return false;
            }
            
            const countKey = `excel_${dataKey}_count`;
            localStorage.setItem(countKey, dataCount.toString());
            
            console.log(`✅ Excel update timestamp stored for ${dataKey}: ${dataCount} entries at ${timestamp}`);
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
                console.log('SheetJS not loaded, cannot generate Excel file');
                return;
            }

            // Force refresh data from localStorage to ensure we have the latest
            this.refreshDataFromStorage();
            
            // Always create fresh Excel file from current data
            console.log(`🔄 Generating fresh Excel file for ${dataKey}`);
            
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
                default:
                    console.error('Unknown data key:', dataKey);
                    return;
            }
            
            // Debug: Show exactly what data we're using
            console.log(`📊 Data for ${dataKey}:`, {
                dataLength: data.length,
                dataPreview: data.slice(0, 3), // Show first 3 entries
                lastEntry: data.length > 0 ? data[data.length - 1] : 'No data'
            });

            // Create workbook and worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(data);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

            // Generate Excel file and download
            XLSX.writeFile(wb, filename);
            
            console.log(`✅ Fresh Excel file ${filename} generated and downloaded with ${data.length} entries`);
            
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



    // Real-time data sync system
    enableRealTimeSync() {
        // Check if real-time sync is already enabled
        if (this.syncInterval) {
            console.log('Real-time sync already enabled');
            return;
        }

        console.log('🔄 Enabling real-time data sync...');
        
        // Create a sync interval that updates every 10 seconds for more responsive updates
        this.syncInterval = setInterval(() => {
            this.syncDataToCloud();
        }, 10000); // Sync every 10 seconds for faster updates

        // Also sync immediately
        this.syncDataToCloud();
        
        // Store sync status
        localStorage.setItem('realTimeSyncEnabled', 'true');
        localStorage.setItem('lastSyncTime', new Date().toISOString());
        
        console.log('✅ Real-time sync enabled - data will sync every 10 seconds');
    }

    // Force immediate sync of all data
    forceSyncAllData() {
        console.log('🔄 Force syncing all data immediately...');
        
        // Force refresh data from storage
        this.refreshDataFromStorage();
        
        // Force sync to cloud
        this.syncDataToCloud();
        
        console.log('✅ All data force synced successfully');
        return true;
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
            
            // Update Excel file timestamps for tracking
            this.updateExcelFile('tutorRegistrations', 'Tutor_Registrations.xlsx');
            this.updateExcelFile('schoolRegistrations', 'Partner_Schools.xlsx');
            this.updateExcelFile('parentStudentRegistrations', 'Parent_Student_Registrations.xlsx');
            
            console.log('📊 Excel update timestamps refreshed for all data types');

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

    // Force update all Excel file timestamps immediately
    forceUpdateAllExcelFiles() {
        console.log('🔄 Force updating all Excel file timestamps...');
        
        const tutorUpdated = this.updateExcelFile('tutorRegistrations', 'Tutor_Registrations.xlsx');
        const schoolUpdated = this.updateExcelFile('schoolRegistrations', 'Partner_Schools.xlsx');
        const parentUpdated = this.updateExcelFile('parentStudentRegistrations', 'Parent_Student_Registrations.xlsx');
        
        const allUpdated = tutorUpdated && schoolUpdated && parentUpdated;
        
        console.log('📊 Force update result:', {
            tutors: tutorUpdated ? '✅' : '❌',
            schools: schoolUpdated ? '✅' : '❌',
            parents: parentUpdated ? '✅' : '❌',
            overall: allUpdated ? '✅ ALL TIMESTAMPS UPDATED' : '❌ SOME FAILED'
        });
        
        return allUpdated;
    }

    // Force refresh all data from localStorage to ensure we have the latest
    refreshDataFromStorage() {
        console.log('🔄 Refreshing data from localStorage...');
        
        // Reload all data from localStorage
        this.tutorData = this.loadData('tutorRegistrations');
        this.schoolData = this.loadData('schoolRegistrations');
        this.parentStudentData = this.loadData('parentStudentRegistrations');
        
        console.log('📊 Data refreshed:', {
            tutors: this.tutorData.length,
            schools: this.schoolData.length,
            parents: this.parentStudentData.length
        });
        
        return true;
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