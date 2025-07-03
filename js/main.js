// js/main.js - Control principal de la aplicación
class AyudasEspanaApp {
    constructor() {
        this.currentSection = 'welcome-section';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showSection('welcome-section');
    }

    bindEvents() {
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.showSection('questionnaire-section');
                if (window.questionnaire) {
                    window.questionnaire.start();
                }
            });
        }

        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restart();
            });
        }

        // --- NUEVA FUNCIONALIDAD: Logo clicable ---
        const logo = document.getElementById('logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault(); // Evita que el enlace recargue la página
                this.restart();
            });
        }
    }

    showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    showResults(results) {
        this.showSection('results-section');
        if (window.resultsManager) {
            window.resultsManager.displayResults(results);
        }
    }

    restart() {
        if (window.questionnaire) {
            window.questionnaire.reset();
        }
        this.showSection('welcome-section');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new AyudasEspanaApp();
});
