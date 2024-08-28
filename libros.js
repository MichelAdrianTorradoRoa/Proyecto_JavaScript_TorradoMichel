// libros.js
document.addEventListener('DOMContentLoaded', () => {
    const pageKey = 'recursosPage'; // Clave utilizada para almacenar los recursos en el localStorage
    let recursos = JSON.parse(localStorage.getItem(pageKey)) || [];

    const librosList = document.getElementById('librosList');

    function renderLibros() {
        librosList.innerHTML = '';

        // Filtrar recursos que sean del formato "Libro"
        const libros = recursos.filter(recurso => recurso.formato === 'Libro');

        libros.forEach((libro) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${libro.nombre}</strong>
                <br>Género: ${libro.genero.join(', ')}
                <br>Plataforma: ${libro.plataforma.join(', ')}
                <br>Estado: ${libro.estado}
                <br>Fecha: ${libro.fecha || 'No especificada'}
                <br>Valoración: ${'★'.repeat(libro.valoracion)}${'☆'.repeat(5 - libro.valoracion)}
                <br>Reseña: ${libro.resena || 'No especificada'}
            `;
            librosList.appendChild(li);
        });
    }

    renderLibros();
});
