// js/results.js - Versión mejorada con presentación de resultados enriquecida
class ResultsManager {
    constructor() {
        this.results = [];
    }

    displayResults(aids) {
        this.results = aids.filter(aid => aid); 
        this.renderResults();
    }

    renderResults() {
        const container = document.getElementById('results-container');
        
        if (!this.results || this.results.length === 0) {
            container.innerHTML = `
                <div class="result-card no-results">
                    <div class="result-title">No se encontraron ayudas específicas</div>
                    <div class="result-description">
                        Basándonos en tus respuestas, no hemos encontrado ayudas que coincidan con tu perfil. Te recomendamos consultar directamente con los servicios sociales de tu comunidad autónoma para obtener más información.
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.results.map(aid => {
            // Valores por defecto para garantizar que no haya 'undefined'
            const nombre = aid.nombre || 'Nombre no disponible';
            const descripcion = aid.descripcion || 'No hay descripción disponible.';
            const enlace = aid.enlace || '#';
            const cuantia = aid.cuantia || 'Variable';
            const organismo = aid.organismo || 'No especificado';
            const tipo = aid.tipo || 'General';
            const tipoClass = `tag-${tipo.toLowerCase()}`;

            return `
                <div class="result-card">
                    <div class="result-card-header">
                        <h3 class="result-title">${nombre}</h3>
                        <span class="result-tag ${tipoClass}">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
                    </div>
                    <p class="result-description">${descripcion}</p>
                    <div class="result-details">
                        <div class="detail-item">
                            <strong>Cuantía:</strong>
                            <span>${cuantia}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Organismo:</strong>
                            <span>${organismo}</span>
                        </div>
                    </div>
                    <a href="${enlace}" class="result-link" target="_blank" rel="noopener">
                        Ver información oficial →
                    </a>
                </div>
            `;
        }).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.resultsManager = new ResultsManager();
});
