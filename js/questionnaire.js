// js/questionnaire.js - Lógica del cuestionario (Versión con LÓGICA EXCLUYENTE)
class QuestionnaireManager {
    constructor() {
        this.questions = [];
        this.allAids = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.init();
    }

    async init() {
        await this.loadQuestions();
        await this.loadAids();
    }

    async loadQuestions() {
        // Cuestionario completo con lógica condicional para evitar preguntas irrelevantes
        this.questions = [
            {
                id: 'estatus_migratorio',
                title: '¿Cuál es tu situación administrativa en España?',
                subtitle: 'Esto determina el acceso a programas de protección internacional, ayudas al retorno o recursos para personas en situación irregular.',
                type: 'single',
                options: [
                    { value: 'espanol_o_europeo', label: 'Soy español o ciudadano de la UE' },
                    { value: 'residencia_no_ue', label: 'Tengo residencia legal (no soy de la UE)' },
                    { value: 'solicitante_asilo', label: 'He solicitado asilo / protección internacional' },
                    { value: 'proteccion_concedida', label: 'Tengo protección internacional concedida (refugiado)' },
                    { value: 'sin_documentacion', label: 'No tengo permiso de residencia (situación irregular)' },
                    { value: 'emigrante_retornado', label: 'Soy un emigrante español retornado' }
                ]
            },
            {
                id: 'edad',
                title: '¿Cuál es tu edad?',
                subtitle: 'Este dato es clave para ayudas dirigidas a jóvenes, mayores de 45/52 años o para la jubilación.',
                type: 'single',
                options: [
                    { value: 'menor_18', label: 'Menor de 18 años' },
                    { value: '18_25', label: 'Entre 18 y 25 años' },
                    { value: '26_45', label: 'Entre 26 y 45 años' },
                    { value: '46_65', label: 'Entre 46 y 65 años' },
                    { value: 'mayor_65', label: 'Mayor de 65 años' }
                ]
            },
            {
                id: 'estado_civil',
                title: '¿Cuál es tu estado civil o situación familiar principal?',
                subtitle: 'Esto es fundamental para ayudas como la pensión de viudedad, orfandad o para familias monoparentales.',
                type: 'single',
                // --- CONDICIÓN: Solo preguntar si tiene estatus legal para acceder a pensiones ---
                condition: (answers) => ['espanol_o_europeo', 'residencia_no_ue', 'proteccion_concedida', 'emigrante_retornado'].includes(answers.estatus_migratorio),
                options: [
                    { value: 'soltero', label: 'Soltero/a' },
                    { value: 'casado_pareja', label: 'Casado/a o pareja de hecho' },
                    { value: 'viudo', label: 'Viudo/a' },
                    { value: 'divorciado_separado', label: 'Divorciado/a o separado/a' }
                ]
            },
            {
                id: 'situacion_laboral',
                title: '¿Cuál es tu situación laboral actual?',
                subtitle: 'Define el tipo de ayudas a las que podrías acceder (empleo, desempleo, autónomos, etc.).',
                type: 'single',
                // --- CONDICIÓN: Solo preguntar si puede trabajar legalmente ---
                condition: (answers) => ['espanol_o_europeo', 'residencia_no_ue', 'proteccion_concedida', 'emigrante_retornado'].includes(answers.estatus_migratorio),
                options: [
                    { value: 'empleado', label: 'Trabajando por cuenta ajena' },
                    { value: 'autonomo', label: 'Autónomo o por cuenta propia' },
                    { value: 'desempleado', label: 'Desempleado e inscrito como demandante de empleo' },
                    { value: 'estudiante', label: 'Estudiante' },
                    { value: 'jubilado', label: 'Jubilado/a' },
                    { value: 'incapacidad', label: 'Incapacidad permanente reconocida' },
                    { value: 'sin_trabajo_previo', label: 'Nunca he trabajado o no recientemente' }
                ]
            },
            {
                id: 'cotizacion_previa',
                title: '¿Cuánto tiempo has cotizado a la Seguridad Social en los últimos 6 años?',
                subtitle: 'Este dato es esencial para calcular si tienes derecho a la prestación contributiva (paro) o a otros subsidios.',
                type: 'single',
                // --- CONDICIÓN MEJORADA: Solo si puede trabajar Y está desempleado ---
                condition: (answers) => (['espanol_o_europeo', 'residencia_no_ue', 'proteccion_concedida', 'emigrante_retornado'].includes(answers.estatus_migratorio) && answers.situacion_laboral === 'desempleado'),
                options: [
                    { value: 'menos_12_meses', label: 'Menos de 12 meses' },
                    { value: '12_a_24_meses', label: 'Entre 12 y 24 meses' },
                    { value: 'mas_de_24_meses', label: 'Más de 24 meses' }
                ]
            },
            {
                id: 'ingresos_mensuales',
                title: '¿Cuáles son los ingresos mensuales de tu unidad familiar?',
                subtitle: 'El nivel de ingresos es un factor determinante para la mayoría de las ayudas sociales y rentas mínimas.',
                type: 'single',
                options: [
                    { value: 'sin_ingresos', label: 'Sin ingresos' },
                    { value: 'menos_600', label: 'Menos de 600€' },
                    { value: '600_1000', label: 'Entre 600€ y 1.000€' },
                    { value: '1000_1500', label: 'Entre 1.000€ y 1.500€' },
                    { value: 'mas_1500', label: 'Más de 1.500€' }
                ]
            },
            {
                id: 'hijos_a_cargo',
                title: '¿Tienes hijos/as a tu cargo?',
                subtitle: 'Las responsabilidades familiares son clave para ayudas de apoyo a la familia, como la deducción por maternidad o CUME.',
                type: 'single',
                options: [
                    { value: 'no', label: 'No tengo hijos a cargo' },
                    { value: 'si', label: 'Sí, tengo uno o más hijos a cargo' }
                ]
            },
            {
                id: 'hijo_con_discapacidad',
                title: '¿Alguno de tus hijos a cargo tiene una discapacidad reconocida?',
                subtitle: 'Existen ayudas y prestaciones económicas específicas para esta situación.',
                type: 'single',
                condition: (answers) => answers.hijos_a_cargo === 'si',
                options: [
                    { value: 'no', label: 'No' },
                    { value: 'si_33', label: 'Sí, con discapacidad igual o superior al 33%' },
                    { value: 'si_65', label: 'Sí, con discapacidad igual o superior al 65%' }
                ]
            },
            {
                id: 'discapacidad_personal',
                title: 'Personalmente, ¿tienes reconocido oficialmente un grado de discapacidad?',
                subtitle: 'Un grado de discapacidad reconocido da acceso a pensiones no contributivas y otras ayudas específicas.',
                type: 'single',
                options: [
                    { value: 'no', label: 'No tengo discapacidad reconocida' },
                    { value: '33_a_64', label: 'Sí, entre el 33% y el 64%' },
                    { value: 'mas_65', label: 'Sí, igual o superior al 65%' }
                ]
            },
            {
                id: 'dependencia_reconocida',
                title: '¿Hay alguien en tu unidad familiar (tú incluido) con una situación de dependencia reconocida?',
                subtitle: 'Esto incluye tanto si tú eres la persona dependiente como si cuidas de un familiar (hijo, padre, etc.) que lo es.',
                type: 'single',
                options: [
                    { value: 'no', label: 'No hay nadie en situación de dependencia' },
                    { value: 'si_grado_1', label: 'Sí, con Grado I (dependencia moderada)' },
                    { value: 'si_grado_2', label: 'Sí, con Grado II (dependencia severa)' },
                    { value: 'si_grado_3', label: 'Sí, con Grado III (gran dependencia)' }
                ]
            },
             {
                id: 'colectivo_especial',
                title: '¿Perteneces a alguno de estos colectivos?',
                subtitle: 'Algunos colectivos (familia numerosa, monoparental, etc.) tienen programas y ayudas específicas de inserción y protección.',
                type: 'single',
                options: [
                    { value: 'ninguno', label: 'No pertenezco a ninguno' },
                    { value: 'victima_violencia_genero', label: 'Víctima de violencia de género' },
                    { value: 'parado_larga_duracion', label: 'Parado de larga duración (+12 meses)' },
                    { value: 'familia_monoparental', label: 'Familia monoparental (un solo progenitor)' },
                    { value: 'familia_numerosa', label: 'Familia numerosa' }
                ]
            },
            {
                id: 'comunidad_autonoma',
                title: '¿En qué comunidad autónoma resides?',
                subtitle: 'Fundamental para mostrarte las ayudas autonómicas, que varían enormemente de una región a otra.',
                type: 'single',
                options: [
                    { value: 'andalucia', label: 'Andalucía' },
                    { value: 'aragon', label: 'Aragón' },
                    { value: 'asturias', label: 'Asturias' },
                    { value: 'baleares', label: 'Islas Baleares' },
                    { value: 'canarias', label: 'Canarias' },
                    { value: 'cantabria', label: 'Cantabria' },
                    { value: 'castilla_leon', label: 'Castilla y León' },
                    { value: 'castilla_mancha', label: 'Castilla-La Mancha' },
                    { value: 'cataluna', label: 'Cataluña' },
                    { value: 'extremadura', label: 'Extremadura' },
                    { value: 'galicia', label: 'Galicia' },
                    { value: 'madrid', label: 'Comunidad de Madrid' },
                    { value: 'murcia', label: 'Región de Murcia' },
                    { value: 'navarra', label: 'Navarra' },
                    { value: 'pais_vasco', label: 'País Vasco' },
                    { value: 'rioja', label: 'La Rioja' },
                    { value: 'valencia', label: 'Comunidad Valenciana' },
                    { value: 'ceuta', label: 'Ceuta' },
                    { value: 'melilla', label: 'Melilla' }
                ]
            }
        ];
    }

    async loadAids() {
        try {
            const response = await fetch('data/ayudas.json');
            const data = await response.json();
            this.allAids = [...(data.ayudas || []), ...(data.ayudas_autonomicas || [])];
            console.log(`Cargadas ${this.allAids.length} ayudas oficiales.`);
        } catch (error) {
            console.error('Error cargando el archivo de ayudas:', error);
            this.allAids = [];
        }
    }

    updateAidsCounter(possibleCount) {
        const totalElement = document.getElementById('aids-count-total');
        const possibleElement = document.getElementById('aids-count-possible');
        if (totalElement && possibleElement) {
            totalElement.textContent = this.allAids.length;
            possibleElement.textContent = possibleCount;
        }
    }

    start() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.updateAidsCounter(this.allAids.length);
        this.showCurrentQuestion();
    }

    showCurrentQuestion() {
        const question = this.getCurrentQuestion();
        if (!question) {
            this.finishQuestionnaire();
            return;
        }
        this.renderQuestion(question);
        this.updateProgress();
    }

    getCurrentQuestion() {
        for (let i = 0; i < this.questions.length; i++) {
            const question = this.questions[i];
            // Mostrar pregunta si aún no ha sido respondida Y si cumple la condición (si la tiene)
            if (!this.answers.hasOwnProperty(question.id)) {
                if (!question.condition || question.condition(this.answers)) {
                    this.currentQuestionIndex = i;
                    return question;
                }
            }
        }
        return null; // No hay más preguntas que mostrar
    }

    renderQuestion(question) {
        const container = document.getElementById('question-container');
        if (!container) return;
        
        container.innerHTML = `<div class="question-title">${question.title}</div><div class="question-subtitle">${question.subtitle}</div><div class="options-grid">${question.options.map(option => `<button class="option-button" data-value="${option.value}">${option.label}</button>`).join('')}</div>`;

        const optionButtons = container.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.addEventListener('click', (e) => this.selectOption(question.id, e.currentTarget.dataset.value, e));
        });
    }

    selectOption(questionId, value, event) {
        this.answers[questionId] = value;

        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        if (event.currentTarget) {
            event.currentTarget.classList.add('selected');
        }

        this.updatePotentialAids();
        
        // En lugar de ir a la siguiente por índice, volvemos a buscar la próxima pregunta sin responder
        setTimeout(() => this.showCurrentQuestion(), 300);
    }
    
    updatePotentialAids() {
        const potentialAids = this.allAids.filter(aid => {
            if (!aid.requisitos) return false;
            return Object.entries(this.answers).every(([key, userAnswer]) => {
                if (aid.requisitos.hasOwnProperty(key)) {
                    const requirement = aid.requisitos[key];
                    return Array.isArray(requirement) ? requirement.includes(userAnswer) : requirement === userAnswer;
                }
                return true;
            });
        });
        this.updateAidsCounter(potentialAids.length);
    }

    updateProgress() {
        const totalQuestions = this.questions.length;
        const answeredQuestions = Object.keys(this.answers).length;
        const currentProgress = (answeredQuestions / totalQuestions) * 100;
        
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) progressBar.style.width = `${Math.min(currentProgress, 100)}%`;
    }

    finishQuestionnaire() {
        const eligibleAids = this.getEligibleAids();
        if (window.app) window.app.showResults(eligibleAids);
    }

    getEligibleAids() {
        return this.allAids.filter(aid => {
            if (!aid.requisitos) return false;
            // Un ayuda es elegible si todos sus requisitos son cumplidos por las respuestas del usuario
            return Object.entries(aid.requisitos).every(([reqKey, reqValue]) => {
                const userAnswer = this.answers[reqKey];
                // Si la ayuda tiene un requisito para una pregunta que no se ha hecho (porque la condición la ocultó), se descarta.
                if (userAnswer === undefined) return false;
                return Array.isArray(reqValue) ? reqValue.includes(userAnswer) : userAnswer === reqValue;
            });
        }).sort((a, b) => (b.prioridad || 0) - (a.prioridad || 0));
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.updateProgress();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.questionnaire = new QuestionnaireManager();
});
