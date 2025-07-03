// js/main.js - Control principal con navegación a secciones legales
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
        // --- Botones principales ---
        document.getElementById('start-btn')?.addEventListener('click', () => {
            this.showSection('questionnaire-section');
            window.questionnaire?.start();
        });

        document.getElementById('restart-btn')?.addEventListener('click', () => this.restart());
        document.getElementById('logo')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.restart();
        });

        // --- NUEVO: Enlaces y botones de secciones legales ---
        document.getElementById('legal-notice-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('legal-notice-section');
        });
        
        document.getElementById('terms-of-use-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSection('terms-of-use-section');
        });

        document.querySelectorAll('.back-to-home').forEach(button => {
            button.addEventListener('click', () => this.restart());
        });
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showResults(results) {
        this.showSection('results-section');
        window.resultsManager?.displayResults(results);
    }

    restart() {
        window.questionnaire?.reset();
        this.showSection('welcome-section');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new AyudasEspanaApp();
});
