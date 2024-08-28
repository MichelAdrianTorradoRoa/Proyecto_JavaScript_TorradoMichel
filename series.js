// series.js
document.addEventListener('DOMContentLoaded', () => {
    const pageKey = 'recursosPage'; // Asegúrate de que coincida con la clave usada en el almacenamiento
    let recursos = JSON.parse(localStorage.getItem(pageKey)) || [];

    const seriesList = document.getElementById('seriesList');

    function renderSeries() {
        seriesList.innerHTML = '';

        const series = recursos.filter(recurso => recurso.formato === 'Serie');

        series.forEach((serie, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${serie.nombre}</strong>
                <br>Género: ${serie.genero.join(', ')}
                <br>Plataforma: ${serie.plataforma.join(', ')}
                <br>Estado: ${serie.estado}
                <br>Fecha: ${serie.fecha || 'No especificada'}
                <br>Valoración: ${'★'.repeat(serie.valoracion)}${'☆'.repeat(5 - serie.valoracion)}
                <br>Reseña: ${serie.resena || 'No especificada'}
            `;
            seriesList.appendChild(li);
        });
    }

    renderSeries();
});
