/**
 * Color & Contrast Vision Test Implementation
 * 
 * This module provides two visual tests:
 * A. Color differentiation: subtle color tone variations
 * B. Contrast sensitivity: decreasing contrast patterns
 * 
 * Features:
 * - Simple scoring system
 * - Console logging for data capture
 * - Accessible interface design
 * - Responsive layout support
 */

class ColorContrastTest {
    constructor() {
        this.currentTest = 'color';
        this.colorScore = 0;
        this.contrastLevel = 100;
        this.contrastThreshold = 100;
        this.colorTestCompleted = false;
        this.contrastTestCompleted = false;
        
        // Test data
        this.colorBlocks = [];
        this.currentColorTest = 0;
        this.totalColorTests = 5;
        this.currentOrientation = '';
        
        this.initializeElements();
        this.bindEvents();
        this.switchTest('color');
    }

    /**
     * Initialize DOM elements and references
     */
    initializeElements() {
        this.elements = {
            // Test selection
            testOptions: document.querySelectorAll('.test-option'),
            colorTest: document.getElementById('colorTest'),
            contrastTest: document.getElementById('contrastTest'),
            
            // Color test elements
            startColorTest: document.getElementById('startColorTest'),
            resetColorTest: document.getElementById('resetColorTest'),
            colorTestArea: document.getElementById('colorTestArea'),
            colorGrid: document.getElementById('colorGrid'),
            colorScore: document.getElementById('colorScore'),
            colorFeedback: document.getElementById('colorFeedback'),
            
            // Contrast test elements
            startContrastTest: document.getElementById('startContrastTest'),
            resetContrastTest: document.getElementById('resetContrastTest'),
            contrastTestArea: document.getElementById('contrastTestArea'),
            contrastCanvas: document.getElementById('contrastCanvas'),
            contrastLevel: document.getElementById('contrastLevel'),
            orientationButtons: document.querySelectorAll('.orientation-btn'),
            contrastFeedback: document.getElementById('contrastFeedback'),
            
            // Results
            resultsSummary: document.getElementById('resultsSummary'),
            finalColorScore: document.getElementById('finalColorScore'),
            finalContrastScore: document.getElementById('finalContrastScore'),
            overallAssessment: document.getElementById('overallAssessment')
        };

        this.contrastCtx = this.elements.contrastCanvas.getContext('2d');
    }

    /**
     * Bind event listeners to interactive elements
     */
    bindEvents() {
        // Test selection
        this.elements.testOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const testType = e.currentTarget.dataset.test;
                this.switchTest(testType);
            });
            
            // Keyboard accessibility
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const testType = e.currentTarget.dataset.test;
                    this.switchTest(testType);
                }
            });
        });

        // Color test events
        this.elements.startColorTest.addEventListener('click', () => this.startColorTest());
        this.elements.resetColorTest.addEventListener('click', () => this.resetColorTest());

        // Contrast test events
        this.elements.startContrastTest.addEventListener('click', () => this.startContrastTest());
        this.elements.resetContrastTest.addEventListener('click', () => this.resetContrastTest());
        
        this.elements.orientationButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orientation = e.target.dataset.orientation;
                this.submitContrastAnswer(orientation);
            });
        });
    }

    /**
     * Switch between color and contrast tests
     * @param {string} testType - 'color' or 'contrast'
     */
    switchTest(testType) {
        this.currentTest = testType;
        
        // Update test option appearance
        this.elements.testOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.test === testType) {
                option.classList.add('active');
            }
        });

        // Show/hide test sections
        if (testType === 'color') {
            this.elements.colorTest.style.display = 'block';
            this.elements.contrastTest.style.display = 'none';
        } else {
            this.elements.colorTest.style.display = 'none';
            this.elements.contrastTest.style.display = 'block';
        }

        console.log(`Switched to ${testType} test`);
    }

    /**
     * Start the color differentiation test
     * Creates blocks with subtle color variations
     */
    startColorTest() {
        this.currentColorTest = 0;
        this.colorScore = 0;
        this.colorTestCompleted = false;
        
        this.elements.colorTestArea.style.display = 'block';
        this.elements.startColorTest.disabled = true;
        this.elements.startColorTest.textContent = 'Test Running...';
        
        this.generateColorTest();
        this.updateColorScore();
        
        console.log('Color differentiation test started');
    }

    /**
     * Generate a color differentiation test
     * Creates a grid with one different colored block
     */
    generateColorTest() {
        if (this.currentColorTest >= this.totalColorTests) {
            this.completeColorTest();
            return;
        }

        const grid = this.elements.colorGrid;
        grid.innerHTML = '';
        
        // Create 3x3 grid
        const gridSize = 3;
        const totalBlocks = gridSize * gridSize;
        
        // Choose random position for different block
        const differentBlock = Math.floor(Math.random() * totalBlocks);
        
        // Generate base color and variation
        const baseColor = this.generateRandomColor();
        const differentColor = this.generateSimilarColor(baseColor, 15 + (this.currentColorTest * 10));
        
        for (let i = 0; i < totalBlocks; i++) {
            const block = document.createElement('div');
            block.className = 'color-block';
            block.style.backgroundColor = (i === differentBlock) ? differentColor : baseColor;
            block.dataset.different = (i === differentBlock) ? 'true' : 'false';
            block.setAttribute('role', 'button');
            block.setAttribute('tabindex', '0');
            block.setAttribute('aria-label', `Color block ${i + 1}`);
            
            block.addEventListener('click', () => this.selectColorBlock(block));
            block.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectColorBlock(block);
                }
            });
            
            grid.appendChild(block);
        }

        console.log(`Color test ${this.currentColorTest + 1}/${this.totalColorTests} generated`);
    }

    /**
     * Handle color block selection
     * @param {HTMLElement} block - Selected color block
     */
    selectColorBlock(block) {
        const isDifferent = block.dataset.different === 'true';
        
        // Disable all blocks
        const allBlocks = this.elements.colorGrid.querySelectorAll('.color-block');
        allBlocks.forEach(b => {
            b.style.pointerEvents = 'none';
            b.setAttribute('tabindex', '-1');
        });
        
        // Show feedback
        if (isDifferent) {
            this.colorScore++;
            block.style.border = '3px solid green';
            this.elements.colorFeedback.textContent = '✓ Correct! You identified the different color.';
            this.elements.colorFeedback.style.color = 'green';
        } else {
            block.style.border = '3px solid red';
            this.elements.colorFeedback.textContent = '✗ Incorrect. The different block is highlighted.';
            this.elements.colorFeedback.style.color = 'red';
            
            // Highlight correct block
            allBlocks.forEach(b => {
                if (b.dataset.different === 'true') {
                    b.style.border = '3px solid green';
                }
            });
        }
        
        this.updateColorScore();
        
        // Log the result
        console.log(`Color test ${this.currentColorTest + 1}: ${isDifferent ? 'Correct' : 'Incorrect'}`);
        
        // Move to next test after delay
        setTimeout(() => {
            this.currentColorTest++;
            this.generateColorTest();
        }, 2000);
    }

    /**
     * Update color test score display
     */
    updateColorScore() {
        this.elements.colorScore.textContent = this.colorScore;
    }

    /**
     * Complete the color test
     */
    completeColorTest() {
        this.colorTestCompleted = true;
        this.elements.colorTestArea.style.display = 'none';
        this.elements.startColorTest.disabled = false;
        this.elements.startColorTest.textContent = 'Start Color Test';
        
        const percentage = Math.round((this.colorScore / this.totalColorTests) * 100);
        this.elements.finalColorScore.textContent = `${this.colorScore}/${this.totalColorTests} (${percentage}%)`;
        
        console.log('=== COLOR TEST COMPLETED ===');
        console.log(`Final score: ${this.colorScore}/${this.totalColorTests} (${percentage}%)`);
        console.log('============================');
        
        this.updateResults();
    }

    /**
     * Reset color test
     */
    resetColorTest() {
        this.currentColorTest = 0;
        this.colorScore = 0;
        this.colorTestCompleted = false;
        this.elements.colorTestArea.style.display = 'none';
        this.elements.startColorTest.disabled = false;
        this.elements.startColorTest.textContent = 'Start Color Test';
        this.elements.colorGrid.innerHTML = '';
        this.elements.colorFeedback.textContent = '';
        this.updateColorScore();
        
        console.log('Color test reset');
    }

    /**
     * Start the contrast sensitivity test
     */
    startContrastTest() {
        this.contrastLevel = 100;
        this.contrastTestCompleted = false;
        
        this.elements.contrastTestArea.style.display = 'block';
        this.elements.startContrastTest.disabled = true;
        this.elements.startContrastTest.textContent = 'Test Running...';
        
        this.generateContrastTest();
        
        console.log('Contrast sensitivity test started');
    }

    /**
     * Generate contrast sensitivity test pattern
     */
    generateContrastTest() {
        const orientations = ['horizontal', 'vertical', 'diagonal'];
        this.currentOrientation = orientations[Math.floor(Math.random() * orientations.length)];
        
        this.drawContrastPattern(this.currentOrientation, this.contrastLevel);
        this.elements.contrastLevel.textContent = `${this.contrastLevel}%`;
        
        // Clear previous selection
        this.elements.orientationButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
        });
        
        this.elements.contrastFeedback.textContent = '';
        
        console.log(`Contrast pattern generated: ${this.currentOrientation} at ${this.contrastLevel}%`);
    }

    /**
     * Draw contrast pattern on canvas
     * @param {string} orientation - Pattern orientation
     * @param {number} contrast - Contrast level (0-100)
     */
    drawContrastPattern(orientation, contrast) {
        const canvas = this.elements.contrastCanvas;
        const ctx = this.contrastCtx;
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas with gray background
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, width, height);
        
        const stripeWidth = 15;
        const contrastValue = contrast / 100;
        const lightGray = Math.round(128 + (127 * contrastValue * 0.5));
        const darkGray = Math.round(128 - (127 * contrastValue * 0.5));
        
        ctx.fillStyle = `rgb(${lightGray}, ${lightGray}, ${lightGray})`;
        
        if (orientation === 'horizontal') {
            for (let y = 0; y < height; y += stripeWidth * 2) {
                ctx.fillRect(0, y, width, stripeWidth);
            }
        } else if (orientation === 'vertical') {
            for (let x = 0; x < width; x += stripeWidth * 2) {
                ctx.fillRect(x, 0, stripeWidth, height);
            }
        } else if (orientation === 'diagonal') {
            // Create diagonal stripes
            for (let i = -height; i < width + height; i += stripeWidth * 2) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i + stripeWidth, 0);
                ctx.lineTo(i + stripeWidth + height, height);
                ctx.lineTo(i + height, height);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }
    }

    /**
     * Submit contrast test answer
     * @param {string} answer - User's orientation guess
     */
    submitContrastAnswer(answer) {
        const isCorrect = answer === this.currentOrientation;
        
        // Disable buttons
        this.elements.orientationButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.orientation === answer) {
                btn.classList.add('selected');
            }
        });
        
        // Show feedback
        if (isCorrect) {
            this.elements.contrastFeedback.textContent = '✓ Correct orientation identified!';
            this.elements.contrastFeedback.style.color = 'green';
            
            // Reduce contrast and continue
            this.contrastLevel = Math.max(5, this.contrastLevel - 20);
            
            setTimeout(() => {
                this.generateContrastTest();
            }, 1500);
        } else {
            this.elements.contrastFeedback.textContent = `✗ Incorrect. Pattern was: ${this.currentOrientation}`;
            this.elements.contrastFeedback.style.color = 'red';
            this.contrastThreshold = this.contrastLevel + 20; // Last successful level
            
            setTimeout(() => {
                this.completeContrastTest();
            }, 2000);
        }
        
        console.log(`Contrast test: Answer=${answer}, Correct=${this.currentOrientation}, Level=${this.contrastLevel}%`);
    }

    /**
     * Complete the contrast test
     */
    completeContrastTest() {
        this.contrastTestCompleted = true;
        this.elements.contrastTestArea.style.display = 'none';
        this.elements.startContrastTest.disabled = false;
        this.elements.startContrastTest.textContent = 'Start Contrast Test';
        
        this.elements.finalContrastScore.textContent = `${this.contrastThreshold}% threshold`;
        
        console.log('=== CONTRAST TEST COMPLETED ===');
        console.log(`Final threshold: ${this.contrastThreshold}%`);
        console.log('===============================');
        
        this.updateResults();
    }

    /**
     * Reset contrast test
     */
    resetContrastTest() {
        this.contrastLevel = 100;
        this.contrastThreshold = 100;
        this.contrastTestCompleted = false;
        this.elements.contrastTestArea.style.display = 'none';
        this.elements.startContrastTest.disabled = false;
        this.elements.startContrastTest.textContent = 'Start Contrast Test';
        this.contrastCtx.clearRect(0, 0, this.elements.contrastCanvas.width, this.elements.contrastCanvas.height);
        
        console.log('Contrast test reset');
    }

    /**
     * Update overall results display
     */
    updateResults() {
        if (this.colorTestCompleted || this.contrastTestCompleted) {
            this.elements.resultsSummary.style.display = 'block';
        }
        
        if (this.colorTestCompleted && this.contrastTestCompleted) {
            this.generateOverallAssessment();
        }
    }

    /**
     * Generate overall assessment based on both tests
     */
    generateOverallAssessment() {
        const colorPercentage = (this.colorScore / this.totalColorTests) * 100;
        let assessment = '';
        
        if (colorPercentage >= 80 && this.contrastThreshold <= 40) {
            assessment = '✅ Excellent color and contrast vision detected.';
        } else if (colorPercentage >= 60 && this.contrastThreshold <= 60) {
            assessment = '👍 Good color and contrast performance.';
        } else {
            assessment = '⚠️ Some visual challenges detected. Consider professional evaluation.';
        }
        
        this.elements.overallAssessment.textContent = assessment;
        
        // Log comprehensive results
        console.log('=== COMPREHENSIVE TEST RESULTS ===');
        console.log(`Color score: ${this.colorScore}/${this.totalColorTests} (${colorPercentage}%)`);
        console.log(`Contrast threshold: ${this.contrastThreshold}%`);
        console.log(`Assessment: ${assessment}`);
        console.log('==================================');
    }

    /**
     * Generate a random color
     * @returns {string} RGB color string
     */
    generateRandomColor() {
        const r = Math.floor(Math.random() * 200) + 50;
        const g = Math.floor(Math.random() * 200) + 50;
        const b = Math.floor(Math.random() * 200) + 50;
        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Generate a similar color with slight variation
     * @param {string} baseColor - Base RGB color
     * @param {number} variation - Amount of variation
     * @returns {string} Similar RGB color
     */
    generateSimilarColor(baseColor, variation) {
        // Extract RGB values
        const rgb = baseColor.match(/\d+/g).map(Number);
        
        // Add variation to one channel
        const channel = Math.floor(Math.random() * 3);
        const delta = Math.random() > 0.5 ? variation : -variation;
        
        rgb[channel] = Math.max(0, Math.min(255, rgb[channel] + delta));
        
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
}

/**
 * Initialize the color and contrast test when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Color & Contrast Test...');
    
    // Create new test instance
    const colorContrastTest = new ColorContrastTest();
    
    // Log initialization completion
    console.log('Color & Contrast Test initialized successfully');
    
    // Make test instance globally accessible for debugging
    window.colorContrastTest = colorContrastTest;
});