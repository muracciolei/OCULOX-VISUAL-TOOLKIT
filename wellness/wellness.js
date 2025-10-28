// Eye Wellness and Training JavaScript

class EyeWellnessTrainer {
    constructor() {
        this.currentCategory = 'relaxation';
        this.currentExercise = null;
        this.exerciseTimer = null;
        this.exerciseTime = 0;
        this.totalTime = 0;
        this.isExerciseRunning = false;
        this.currentStep = 0;
        this.exerciseSteps = [];
        
        // Progress tracking
        this.stats = {
            totalSessions: 0,
            totalTime: 0,
            weeklyGoal: 5,
            currentStreak: 0,
            weeklyActivity: [0, 0, 0, 0, 0, 0, 0] // Last 7 days
        };
        
        this.initializeElements();
        this.bindEvents();
        this.loadProgress();
        this.updateProgressDisplay();
        this.generateWeeklyChart();
    }

    initializeElements() {
        this.elements = {
            // Category selection
            categoryCards: document.querySelectorAll('.category-card'),
            exerciseSections: document.querySelectorAll('.exercise-section'),
            
            // Exercise buttons
            exerciseButtons: document.querySelectorAll('.exercise-btn'),
            
            // Exercise player
            exercisePlayer: document.getElementById('exercisePlayer'),
            currentExerciseTitle: document.getElementById('currentExerciseTitle'),
            closePlayer: document.getElementById('closePlayer'),
            
            // Timer elements
            timeRemaining: document.getElementById('timeRemaining'),
            timerProgress: document.getElementById('timerProgress'),
            
            // Instructions
            instructionText: document.getElementById('instructionText'),
            currentStep: document.getElementById('currentStep'),
            exerciseVisual: document.getElementById('exerciseVisual'),
            
            // Controls
            playPause: document.getElementById('playPause'),
            resetExercise: document.getElementById('resetExercise'),
            skipStep: document.getElementById('skipStep'),
            
            // Progress stats
            totalSessions: document.getElementById('totalSessions'),
            totalTimeDisplay: document.getElementById('totalTime'),
            weeklyGoal: document.getElementById('weeklyGoal'),
            currentStreak: document.getElementById('currentStreak'),
            weeklyChart: document.getElementById('weeklyChart')
        };
    }

    bindEvents() {
        // Category selection
        this.elements.categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.switchCategory(category);
            });
        });

        // Exercise buttons
        this.elements.exerciseButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exercise = e.currentTarget.dataset.exercise;
                this.startExercise(exercise);
            });
        });

        // Player controls
        this.elements.closePlayer.addEventListener('click', () => this.closeExercisePlayer());
        this.elements.playPause.addEventListener('click', () => this.toggleExercise());
        this.elements.resetExercise.addEventListener('click', () => this.resetCurrentExercise());
        this.elements.skipStep.addEventListener('click', () => this.nextStep());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.elements.exercisePlayer.style.display !== 'none') {
                switch (e.key) {
                    case ' ':
                    case 'k':
                        e.preventDefault();
                        this.toggleExercise();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.resetCurrentExercise();
                        break;
                    case 'Escape':
                        this.closeExercisePlayer();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextStep();
                        break;
                }
            }
        });
    }

    switchCategory(category) {
        this.currentCategory = category;
        
        // Update category cards
        this.elements.categoryCards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.category === category) {
                card.classList.add('active');
            }
        });

        // Update exercise sections
        this.elements.exerciseSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === category) {
                section.classList.add('active');
            }
        });
    }

    startExercise(exerciseType) {
        this.currentExercise = exerciseType;
        this.exerciseSteps = this.getExerciseSteps(exerciseType);
        this.currentStep = 0;
        this.exerciseTime = this.getExerciseDuration(exerciseType);
        this.totalTime = this.exerciseTime;

        // Set exercise title
        this.elements.currentExerciseTitle.textContent = this.getExerciseTitle(exerciseType);
        
        // Show player
        this.elements.exercisePlayer.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Initialize exercise
        this.initializeExerciseVisuals();
        this.updateTimer();
        this.showStep(0);
        
        // Reset controls
        this.elements.playPause.textContent = '▶️ Iniciar';
        this.isExerciseRunning = false;
    }

    getExerciseSteps(exerciseType) {
        const exercises = {
            rule20: [
                { text: "Prepárese para la regla 20-20-20", duration: 3 },
                { text: "Mantenga la vista relajada", duration: 2 },
                { text: "Busque un objeto a 6 metros de distancia", duration: 3 },
                { text: "Enfoque el objeto lejano por 20 segundos", duration: 20 }
            ],
            palming: [
                { text: "Siéntese cómodamente con la espalda recta", duration: 5 },
                { text: "Frote las palmas hasta generar calor", duration: 10 },
                { text: "Coloque las palmas sobre los ojos cerrados", duration: 15 },
                { text: "Respire profundamente y relájese", duration: 60 },
                { text: "Visualice oscuridad completa", duration: 30 },
                { text: "Retire las manos lentamente", duration: 5 }
            ],
            breathing: [
                { text: "Siéntese cómodamente y cierre los ojos", duration: 5 },
                { text: "Inhale profundamente por 4 segundos", duration: 4 },
                { text: "Mantenga la respiración por 4 segundos", duration: 4 },
                { text: "Exhale lentamente por 6 segundos", duration: 6 },
                { text: "Repita el ciclo de respiración", duration: 120 }
            ],
            nearfar: [
                { text: "Sostenga su dedo a 15cm de su cara", duration: 5 },
                { text: "Enfoque su dedo por 3 segundos", duration: 3 },
                { text: "Enfoque un objeto lejano por 3 segundos", duration: 3 },
                { text: "Continúe alternando cerca-lejos", duration: 120 }
            ],
            figure8: [
                { text: "Imagine una figura en 8 gigante frente a usted", duration: 5 },
                { text: "Siga el contorno con los ojos lentamente", duration: 8 },
                { text: "Cambie de dirección", duration: 8 },
                { text: "Continúe el movimiento en 8", duration: 120 }
            ],
            zoom: [
                { text: "Extienda su brazo con el pulgar hacia arriba", duration: 5 },
                { text: "Enfoque el pulgar claramente", duration: 3 },
                { text: "Acerque lentamente el pulgar", duration: 5 },
                { text: "Mantenga el enfoque mientras se acerca", duration: 5 },
                { text: "Aleje lentamente manteniendo el enfoque", duration: 5 },
                { text: "Repita el movimiento", duration: 120 }
            ],
            horizontal: [
                { text: "Mantenga la cabeza quieta", duration: 3 },
                { text: "Mire hacia la izquierda", duration: 2 },
                { text: "Mire hacia la derecha", duration: 2 },
                { text: "Continúe el movimiento horizontal", duration: 120 }
            ],
            circular: [
                { text: "Mantenga la cabeza inmóvil", duration: 3 },
                { text: "Mire hacia arriba", duration: 1 },
                { text: "Trace un círculo con los ojos", duration: 8 },
                { text: "Cambie de dirección", duration: 8 },
                { text: "Continúe los movimientos circulares", duration: 120 }
            ],
            saccades: [
                { text: "Mantenga la cabeza quieta", duration: 3 },
                { text: "Mire rápidamente arriba-abajo", duration: 2 },
                { text: "Mire rápidamente izquierda-derecha", duration: 2 },
                { text: "Continúe movimientos rápidos", duration: 120 }
            ],
            blinking: [
                { text: "Parpadee normalmente 5 veces", duration: 5 },
                { text: "Cierre los ojos suavemente por 2 segundos", duration: 2 },
                { text: "Abra los ojos lentamente", duration: 1 },
                { text: "Repita el parpadeo consciente", duration: 120 }
            ],
            compression: [
                { text: "Cierre los ojos suavemente", duration: 3 },
                { text: "Apriete suavemente los párpados", duration: 5 },
                { text: "Relaje la presión", duration: 2 },
                { text: "Mantenga los ojos cerrados", duration: 3 },
                { text: "Repita la compresión", duration: 120 }
            ],
            massage: [
                { text: "Lávese las manos cuidadosamente", duration: 5 },
                { text: "Cierre los ojos", duration: 2 },
                { text: "Masajee suavemente los párpados superiores", duration: 30 },
                { text: "Masajee suavemente los párpados inferiores", duration: 30 },
                { text: "Masajee las sienes", duration: 30 },
                { text: "Termine con movimientos circulares", duration: 30 }
            ]
        };

        return exercises[exerciseType] || [];
    }

    getExerciseDuration(exerciseType) {
        const durations = {
            rule20: 28, palming: 125, breathing: 139, nearfar: 131,
            figure8: 141, zoom: 143, horizontal: 127, circular: 140,
            saccades: 127, blinking: 128, compression: 133, massage: 127
        };
        return durations[exerciseType] || 60;
    }

    getExerciseTitle(exerciseType) {
        const titles = {
            rule20: "Regla 20-20-20",
            palming: "Técnica de Palmas",
            breathing: "Respiración Visual",
            nearfar: "Enfoque Cerca-Lejos",
            figure8: "Figura en Ocho",
            zoom: "Zoom Visual",
            horizontal: "Seguimiento Horizontal",
            circular: "Movimientos Circulares",
            saccades: "Sacadas Rápidas",
            blinking: "Parpadeo Consciente",
            compression: "Compresión de Párpados",
            massage: "Masaje de Párpados"
        };
        return titles[exerciseType] || "Ejercicio Visual";
    }

    initializeExerciseVisuals() {
        const visual = this.elements.exerciseVisual;
        visual.innerHTML = '';

        switch (this.currentExercise) {
            case 'nearfar':
                visual.innerHTML = `
                    <div class="visual-target" id="nearTarget" style="left: 50%; top: 50%;"></div>
                    <div style="position: absolute; bottom: 20px; font-size: 0.9rem; color: var(--text-medium);">
                        🔵 Cerca &nbsp;&nbsp;&nbsp; 🔴 Lejos
                    </div>
                `;
                break;
                
            case 'figure8':
                visual.innerHTML = `
                    <div class="visual-target" id="figureTarget" style="left: 50%; top: 50%;"></div>
                    <svg width="200" height="120" style="position: absolute; opacity: 0.3;">
                        <path d="M 50 60 Q 100 20, 150 60 Q 100 100, 50 60" stroke="#1e40af" stroke-width="2" fill="none"/>
                    </svg>
                `;
                break;
                
            case 'horizontal':
                visual.innerHTML = `
                    <div class="visual-target" id="horizontalTarget" style="left: 20%; top: 50%;"></div>
                    <div class="visual-line" style="top: 50%; left: 10%; right: 10%; height: 2px;"></div>
                `;
                break;
                
            case 'circular':
                visual.innerHTML = `
                    <div class="visual-target" id="circularTarget" style="left: 50%; top: 30%;"></div>
                    <div style="position: absolute; width: 100px; height: 100px; border: 2px dashed var(--primary-blue); border-radius: 50%; opacity: 0.3; left: 50%; top: 50%; transform: translate(-50%, -50%);"></div>
                `;
                break;
                
            case 'breathing':
                visual.innerHTML = `
                    <div class="breathing-circle" id="breathingCircle"></div>
                    <div style="position: absolute; bottom: 20px; font-size: 0.9rem; color: var(--text-medium);">
                        Inhale cuando el círculo se expande, exhale cuando se contrae
                    </div>
                `;
                break;
                
            case 'saccades':
                visual.innerHTML = `
                    <div class="visual-target" id="saccadeTarget1" style="left: 25%; top: 25%;"></div>
                    <div class="visual-target" id="saccadeTarget2" style="left: 75%; top: 75%; opacity: 0.5;"></div>
                `;
                break;
                
            default:
                visual.innerHTML = `
                    <div style="color: var(--text-medium); font-size: 1.1rem;">
                        Siga las instrucciones de texto
                    </div>
                `;
        }
    }

    showStep(stepIndex) {
        if (stepIndex >= this.exerciseSteps.length) {
            this.completeExercise();
            return;
        }

        const step = this.exerciseSteps[stepIndex];
        this.elements.instructionText.textContent = step.text;
        this.elements.currentStep.textContent = `Paso ${stepIndex + 1} de ${this.exerciseSteps.length}`;
        
        // Update visuals based on step
        this.updateVisualForStep(stepIndex);
    }

    updateVisualForStep(stepIndex) {
        const step = this.exerciseSteps[stepIndex];
        
        switch (this.currentExercise) {
            case 'nearfar':
                const target = document.getElementById('nearTarget');
                if (target) {
                    if (step.text.includes('dedo')) {
                        target.style.backgroundColor = '#3b82f6';
                        target.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    } else {
                        target.style.backgroundColor = '#ef4444';
                        target.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    }
                }
                break;
                
            case 'horizontal':
                const hTarget = document.getElementById('horizontalTarget');
                if (hTarget && this.isExerciseRunning) {
                    hTarget.classList.add('smooth-move');
                }
                break;
                
            case 'circular':
                const cTarget = document.getElementById('circularTarget');
                if (cTarget && this.isExerciseRunning) {
                    cTarget.classList.add('rotate-animation');
                }
                break;
                
            case 'breathing':
                const breathingCircle = document.getElementById('breathingCircle');
                if (breathingCircle && this.isExerciseRunning) {
                    this.startBreathingAnimation();
                }
                break;
        }
    }

    startBreathingAnimation() {
        const circle = document.getElementById('breathingCircle');
        if (!circle) return;
        
        let isExpanding = true;
        const breathingInterval = setInterval(() => {
            if (!this.isExerciseRunning) {
                clearInterval(breathingInterval);
                return;
            }
            
            if (isExpanding) {
                circle.classList.add('expand');
            } else {
                circle.classList.remove('expand');
            }
            isExpanding = !isExpanding;
        }, 4000);
    }

    toggleExercise() {
        if (this.isExerciseRunning) {
            this.pauseExercise();
        } else {
            this.playExercise();
        }
    }

    playExercise() {
        this.isExerciseRunning = true;
        this.elements.playPause.textContent = '⏸️ Pausar';
        this.elements.playPause.classList.add('active');
        
        this.exerciseTimer = setInterval(() => {
            this.exerciseTime--;
            this.updateTimer();
            
            if (this.exerciseTime <= 0) {
                this.nextStep();
            }
        }, 1000);
        
        this.updateVisualForStep(this.currentStep);
    }

    pauseExercise() {
        this.isExerciseRunning = false;
        this.elements.playPause.textContent = '▶️ Continuar';
        this.elements.playPause.classList.remove('active');
        
        if (this.exerciseTimer) {
            clearInterval(this.exerciseTimer);
            this.exerciseTimer = null;
        }
    }

    resetCurrentExercise() {
        this.pauseExercise();
        this.currentStep = 0;
        this.exerciseTime = this.getExerciseDuration(this.currentExercise);
        this.initializeExerciseVisuals();
        this.showStep(0);
        this.updateTimer();
        this.elements.playPause.textContent = '▶️ Iniciar';
    }

    nextStep() {
        this.currentStep++;
        if (this.currentStep >= this.exerciseSteps.length) {
            this.completeExercise();
        } else {
            const step = this.exerciseSteps[this.currentStep];
            this.exerciseTime = step.duration;
            this.showStep(this.currentStep);
            this.updateTimer();
        }
    }

    updateTimer() {
        const minutes = Math.floor(this.exerciseTime / 60);
        const seconds = this.exerciseTime % 60;
        this.elements.timeRemaining.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress circle
        const totalStepTime = this.exerciseSteps[this.currentStep]?.duration || 1;
        const progress = ((totalStepTime - this.exerciseTime) / totalStepTime) * 314;
        this.elements.timerProgress.style.strokeDashoffset = 314 - progress;
    }

    completeExercise() {
        this.pauseExercise();
        
        // Update stats
        this.stats.totalSessions++;
        this.stats.totalTime += Math.round(this.totalTime / 60); // Convert to minutes
        this.updateTodaysActivity();
        this.saveProgress();
        
        // Show completion message
        this.elements.instructionText.textContent = '¡Ejercicio completado! 🎉';
        this.elements.currentStep.textContent = 'Sesión finalizada exitosamente';
        this.elements.playPause.textContent = '✅ Completado';
        this.elements.playPause.disabled = true;
        
        // Update progress display
        this.updateProgressDisplay();
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            this.closeExercisePlayer();
        }, 3000);
    }

    closeExercisePlayer() {
        this.pauseExercise();
        this.elements.exercisePlayer.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.elements.playPause.disabled = false;
    }

    updateTodaysActivity() {
        const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
        this.stats.weeklyActivity[today]++;
    }

    loadProgress() {
        const savedStats = localStorage.getItem('eyeWellnessStats');
        if (savedStats) {
            this.stats = { ...this.stats, ...JSON.parse(savedStats) };
        }
    }

    saveProgress() {
        localStorage.setItem('eyeWellnessStats', JSON.stringify(this.stats));
    }

    updateProgressDisplay() {
        this.elements.totalSessions.textContent = this.stats.totalSessions;
        this.elements.totalTimeDisplay.textContent = this.stats.totalTime;
        this.elements.weeklyGoal.textContent = this.stats.weeklyGoal;
        this.elements.currentStreak.textContent = this.calculateStreak();
    }

    calculateStreak() {
        let streak = 0;
        const today = new Date().getDay();
        
        for (let i = 0; i < 7; i++) {
            const dayIndex = (today - i + 7) % 7;
            if (this.stats.weeklyActivity[dayIndex] > 0) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    generateWeeklyChart() {
        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const maxActivity = Math.max(...this.stats.weeklyActivity, 1);
        
        this.elements.weeklyChart.innerHTML = '';
        
        this.stats.weeklyActivity.forEach((activity, index) => {
            const barHeight = (activity / maxActivity) * 80;
            const bar = document.createElement('div');
            bar.className = 'day-bar';
            bar.style.height = `${barHeight}px`;
            
            if (activity > 0) {
                bar.classList.add('active');
            }
            
            const label = document.createElement('div');
            label.className = 'day-label';
            label.textContent = daysOfWeek[index];
            
            const container = document.createElement('div');
            container.appendChild(bar);
            container.appendChild(label);
            
            this.elements.weeklyChart.appendChild(container);
        });
    }
}

// Initialize the trainer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const eyeWellnessTrainer = new EyeWellnessTrainer();
    
    // Update weekly chart every hour
    setInterval(() => {
        eyeWellnessTrainer.generateWeeklyChart();
    }, 3600000);
    
    // Add notification for exercise reminders
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    // Set up exercise reminders every 20 minutes
    let reminderCount = 0;
    setInterval(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
            reminderCount++;
            if (reminderCount % 20 === 0) { // Every 20 minutes
                new Notification('Recordatorio Visual', {
                    body: '¡Es hora de hacer un descanso visual! Recuerda la regla 20-20-20.',
                    icon: '../assets/icons/eye-icon.png' // You can add an icon later
                });
            }
        }
    }, 60000); // Check every minute
});