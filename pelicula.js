// peliculas.js
document.addEventListener('DOMContentLoaded', () => {
    const pageKey = 'recursosPage';
    let recursos = JSON.parse(localStorage.getItem(pageKey)) || [];

    const peliculasList = document.getElementById('peliculasList');

    function renderPeliculas() {
        peliculasList.innerHTML = '';

        const peliculas = recursos.filter(recurso => recurso.formato === 'Película');

        peliculas.forEach((pelicula, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${pelicula.nombre}</strong>
                <br>Género: ${pelicula.genero.join(', ')}
                <br>Plataforma: ${pelicula.plataforma.join(', ')}
                <br>Estado: ${pelicula.estado}
                <br>Fecha: ${pelicula.fecha || 'No especificada'}
                <br>Valoración: ${'★'.repeat(pelicula.valoracion)}${'☆'.repeat(5 - pelicula.valoracion)}
                <br>Reseña: ${pelicula.resena || 'No especificada'}
            `;
            peliculasList.appendChild(li);
        });
    }

    renderPeliculas();
});
