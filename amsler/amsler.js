/**
 * Amsler Grid Test Implementation
 * 
 * This module provides functionality for the Amsler grid visual test,
 * including grid rendering and anomaly reporting.
 * 
 * Key Features:
 * - Canvas-based grid rendering
 * - Modal for anomaly reporting
 * - Console logging for data capture
 * - Accessible form controls
 */

class AmslerTest {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.modal = null;
        
        this.initializeElements();
        this.bindEvents();
        this.drawGrid();
    }

    /**
     * Initialize DOM elements and canvas context
     */
    initializeElements() {
        this.canvas = document.getElementById('amslerGrid');
        this.ctx = this.canvas.getContext('2d');
        this.modal = document.getElementById('anomalyModal');
        
        this.elements = {
            reportBtn: document.getElementById('reportAnomaly'),
            closeModal: document.getElementById('closeModal'),
            cancelBtn: document.getElementById('cancelReport'),
            form: document.getElementById('anomalyForm'),
            eyeUsed: document.getElementById('eyeUsed'),
            distortionType: document.getElementById('distortionType'),
            additionalNotes: document.getElementById('additionalNotes')
        };
    }

    /**
     * Bind event listeners to interactive elements
     */
    bindEvents() {
        // Report anomaly button
        this.elements.reportBtn.addEventListener('click', () => {
            this.openModal();
        });

        // Close modal events
        this.elements.closeModal.addEventListener('click', () => {
            this.closeModal();
        });

        this.elements.cancelBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Form submission
        this.elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitAnomalyReport();
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    /**
     * Render the Amsler grid on canvas
     * Creates a standard 20x20 grid with central fixation point
     */
    drawGrid() {
        const canvas = this.canvas;
        const ctx = this.ctx;
        
        // Set canvas background to white
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grid parameters
        const gridSize = 20; // 20x20 grid (standard)
        const cellSize = canvas.width / gridSize;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw grid lines (black on white)
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        
        // Vertical lines
        ctx.beginPath();
        for (let i = 0; i <= gridSize; i++) {
            const x = i * cellSize;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }
        ctx.stroke();
        
        // Horizontal lines
        ctx.beginPath();
        for (let i = 0; i <= gridSize; i++) {
            const y = i * cellSize;
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();
        
        // Draw central fixation point (black dot)
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        console.log('Amsler grid rendered successfully');
    }

    /**
     * Open the anomaly reporting modal
     */
    openModal() {
        this.modal.style.display = 'block';
        this.elements.eyeUsed.focus();
        console.log('Anomaly report modal opened');
    }

    /**
     * Close the modal and reset form
     */
    closeModal() {
        this.modal.style.display = 'none';
        this.elements.form.reset();
        console.log('Anomaly report modal closed');
    }

    /**
     * Process anomaly report submission
     * Logs data to console as per requirements
     */
    submitAnomalyReport() {
        const reportData = {
            timestamp: new Date().toISOString(),
            eyeUsed: this.elements.eyeUsed.value,
            distortionType: this.elements.distortionType.value,
            additionalNotes: this.elements.additionalNotes.value.trim(),
            testType: 'amsler_grid'
        };

        // Log the collected data to console (as per requirements)
        console.log('=== AMSLER GRID ANOMALY REPORT ===');
        console.log('Timestamp:', reportData.timestamp);
        console.log('Eye tested:', reportData.eyeUsed);
        console.log('Distortion type:', reportData.distortionType);
        console.log('Additional notes:', reportData.additionalNotes || 'None');
        console.log('=====================================');

        // Store in memory (localStorage for persistence)
        this.storeReport(reportData);

        // Show confirmation and close modal
        alert('Anomaly report submitted successfully. Data logged to console.');
        this.closeModal();
    }

    /**
     * Store report data in browser's local storage
     * @param {Object} reportData - The anomaly report data
     */
    storeReport(reportData) {
        try {
            const existingReports = JSON.parse(localStorage.getItem('amslerReports') || '[]');
            existingReports.push(reportData);
            localStorage.setItem('amslerReports', JSON.stringify(existingReports));
            console.log('Report stored in local storage');
        } catch (error) {
            console.error('Error storing report:', error);
        }
    }

    /**
     * Retrieve all stored reports (for future use)
     * @returns {Array} Array of stored anomaly reports
     */
    static getStoredReports() {
        try {
            return JSON.parse(localStorage.getItem('amslerReports') || '[]');
        } catch (error) {
            console.error('Error retrieving reports:', error);
            return [];
        }
    }
}

/**
 * Initialize the Amsler test when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Amsler Grid Test...');
    
    // Create new test instance
    const amslerTest = new AmslerTest();
    
    // Log initialization completion
    console.log('Amsler Grid Test initialized successfully');
    
    // Make test instance globally accessible for debugging
    window.amslerTest = amslerTest;
});