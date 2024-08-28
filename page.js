document.addEventListener('DOMContentLoaded', () => {
    const pageKey = 'recursosPage'; // Cambia este valor para cada página si es necesario
    let recursos = JSON.parse(localStorage.getItem(pageKey)) || [];

    // Función para guardar los recursos en el localStorage
    function saveRecursos() {
        localStorage.setItem(pageKey, JSON.stringify(recursos));
        renderRecursos();
    }

    const formatoSelect = document.getElementById('formato');
    const plataformaContainer = document.getElementById('plataformaContainer');
    const generoSerieSelect = document.getElementById('generoSerieSelect');
    const generoPeliculaSelect = document.getElementById('generoPeliculaSelect');
    const generoLibroSelect = document.getElementById('generoLibroSelect');
    const generoContainer = document.getElementById('generoContainer');
    const plataformaSerie = document.getElementById('plataformaSerie');
    const plataformaPelicula = document.getElementById('plataformaPelicula');
    const plataformaLibro = document.getElementById('plataformaLibro');
    const recursoForm = document.getElementById('recursoForm');
    const fechaInput = document.getElementById('fecha');
    const valoracionInput = document.getElementById('valoracion');
    const resenaTextarea = document.getElementById('resena');
    const estadoSelect = document.getElementById('estado');
    const estrellas = document.querySelectorAll('#estrellas .estrella');
    const listaRecursos = document.getElementById('recursoList');
    const filtros = {
        nombre: document.getElementById('buscar'),
        estado: document.getElementById('filtroEstado'),
        formato: document.getElementById('filtroFormato'),
        plataforma: document.getElementById('filtroPlataforma')
    };
    formatoSelect.addEventListener('change', (e) => {
        const selectedFormat = e.target.value;

        // Mostrar u ocultar contenedores según el formato seleccionado
        if (selectedFormat === 'Serie') {
            generoContainer.classList.remove('hidden');
            plataformaContainer.classList.remove('hidden');
            generoSerie.classList.remove('hidden');
            plataformaSerie.classList.remove('hidden');
            generoPelicula.classList.add('hidden');
            plataformaPelicula.classList.add('hidden');
            generoLibro.classList.add('hidden');
            plataformaLibro.classList.add('hidden');
        } else if (selectedFormat === 'Película') {
            generoContainer.classList.remove('hidden');
            plataformaContainer.classList.remove('hidden');
            generoSerie.classList.add('hidden');
            plataformaSerie.classList.add('hidden');
            generoPelicula.classList.remove('hidden');
            plataformaPelicula.classList.remove('hidden');
            generoLibro.classList.add('hidden');
            plataforma
        }
    });

    function handleStarInteraction() {
        const estado = estadoSelect.value;
        const interactivo = estado === 'Terminado';

        estrellas.forEach(estrella => {
            estrella.classList.toggle('disabled', !interactivo);
            estrella.removeEventListener('mouseover', handleMouseOver);
            estrella.removeEventListener('mouseout', handleMouseOut);
            estrella.removeEventListener('click', handleClick);

            if (interactivo) {
                estrella.addEventListener('mouseover', handleMouseOver);
                estrella.addEventListener('mouseout', handleMouseOut);
                estrella.addEventListener('click', handleClick);
            }
        });

        function handleMouseOver() {
            const valor = this.getAttribute('data-valor');
            estrellas.forEach(st => {
                st.classList.toggle('hover', st.getAttribute('data-valor') <= valor);
            });
        }

        function handleMouseOut() {
            estrellas.forEach(st => {
                st.classList.remove('hover');
            });
        }

        function handleClick() {
            const valor = this.getAttribute('data-valor');
            valoracionInput.value = valor;
            estrellas.forEach(st => {
                st.classList.toggle('selected', st.getAttribute('data-valor') <= valor);
            });
        }
    }

    function toggleFields() {
        const estado = estadoSelect.value;
        const shouldEnable = estado === 'Terminado';

        ['fecha', 'valoracion', 'resena'].forEach(id => {
            const field = document.getElementById(id);
            if (field) field.disabled = !shouldEnable;
        });

        handleStarInteraction();

        if (!shouldEnable) {
            fechaInput.value = '';
            valoracionInput.value = '';
            estrellas.forEach(st => st.classList.remove('selected'));
            resenaTextarea.value = '';
        }
    }

    function updateGeneroOptions() {
        const formato = formatoSelect.value;
    
        document.getElementById('generoSerie').classList.toggle('hidden', formato !== 'Serie');
        document.getElementById('generoPelicula').classList.toggle('hidden', formato !== 'Película');
        document.getElementById('generoLibro').classList.toggle('hidden', formato !== 'Libro');
        generoContainer.classList.toggle('hidden', formato === '');
    
        // Mostrar/ocultar los selects de género
        document.getElementById('generoSerieSelect').classList.toggle('active', formato === 'Serie');
        document.getElementById('generoPeliculaSelect').classList.toggle('active', formato === 'Película');
        document.getElementById('generoLibroSelect').classList.toggle('active', formato === 'Libro');
    
        // Mostrar/ocultar los selects de plataforma
        document.getElementById('plataformaSerie').classList.toggle('active', formato === 'Serie');
        document.getElementById('plataformaPelicula').classList.toggle('active', formato === 'Película');
        document.getElementById('plataformaLibro').classList.toggle('active', formato === 'Libro');
    }
    function renderRecursos() {
        listaRecursos.innerHTML = '';
        const filteredRecursos = recursos.filter(recurso => {
            return (!filtros.nombre.value || recurso.nombre.toLowerCase().includes(filtros.nombre.value.toLowerCase())) &&
                   (!filtros.estado.value || recurso.estado === filtros.estado.value) &&
                   (!filtros.formato.value || recurso.formato === filtros.formato.value) &&
                   (!filtros.plataforma.value || recurso.plataforma.includes(filtros.plataforma.value));
        });

        filteredRecursos.forEach((recurso, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${recurso.nombre}</strong> (${recurso.formato})
                <br>Género: ${recurso.genero.join(', ')}
                <br>Plataforma: ${recurso.plataforma.join(', ')}
                <br>Estado: ${recurso.estado}
                <br>Fecha: ${recurso.fecha || 'No especificada'}
                <br>Valoración: ${'★'.repeat(recurso.valoracion)}${'☆'.repeat(5 - recurso.valoracion)}
                <br>Reseña: ${recurso.resena || 'No especificada'}
                <br><button onclick="editRecurso(${index})">Editar</button>
                <button onclick="deleteRecurso(${index})">Eliminar</button>
            `;
            listaRecursos.appendChild(li);
        });
    }

    function validateFecha(fecha) {
        const fechaActual = new Date().toISOString().split('T')[0];
        return fecha <= fechaActual;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const formato = formatoSelect.value;

        const generoOptions = formato === 'Libro' ? generoLibroSelect :
                              formato === 'Película' ? generoPeliculaSelect : 
                              formato === 'Serie' ? generoSerieSelect : null;

        const genero = generoOptions ? Array.from(generoOptions.selectedOptions).map(option => option.value) : [];
        const plataformaOptions = formato === 'Libro' ? document.getElementById('plataformaLibro') : 
                                 formato === 'Película' ? document.getElementById('plataformaPelicula') : null;
                                 
        const plataforma = plataformaOptions ? Array.from(plataformaOptions.selectedOptions).map(option => option.value) : [];
        const estado = estadoSelect.value;
        const fecha = fechaInput.value;
        const valoracion = parseInt(valoracionInput.value, 10) || 0;
        const resena = resenaTextarea.value;

        if (estado === 'Terminado') {
            if (fecha === '' || !validateFecha(fecha) || isNaN(valoracion) || valoracion < 1 || valoracion > 5 || resena === '') {
                alert('Por favor complete todos los campos requeridos y asegúrese de que la fecha de terminación sea válida.');
                return;
            }
        } else {
            if (fecha !== '' || valoracion !== 0 || resena !== '') {
                alert('Cuando el estado no es "Terminado", no debe ingresar fecha, valoración ni reseña.');
                return;
            }
        }

        const nuevoRecurso = {
            nombre,
            formato,
            genero,
            plataforma,
            estado,
            fecha: estado === 'Terminado' ? fecha : '',
            valoracion: estado === 'Terminado' ? valoracion : 0,
            resena: estado === 'Terminado' ? resena : ''
        };

        recursos.push(nuevoRecurso);
        saveRecursos();
    }

    window.editRecurso = function(index) {
        const recurso = recursos[index];
        if (!recurso) return;

        document.getElementById('nombre').value = recurso.nombre || '';
        formatoSelect.value = recurso.formato || '';
        updateGeneroOptions();
        const generoSelect = formatoSelect.value === 'Serie' ? generoSerieSelect : 
                            formatoSelect.value === 'Película' ? generoPeliculaSelect : 
                            generoLibroSelect;

        if (generoSelect) {
            Array.from(generoSelect.options).forEach(option => {
                option.selected = recurso.genero.includes(option.value);
            });
        }
        
        const plataformaSelect = document.getElementById('plataforma');
        if (plataformaSelect) {
            Array.from(plataformaSelect.options).forEach(option => {
                option.selected = recurso.plataforma.includes(option.value);
            });
        }

        estadoSelect.value = recurso.estado || '';
        fechaInput.value = recurso.fecha || '';
        valoracionInput.value = recurso.valoracion || '';
        resenaTextarea.value = recurso.resena || '';
    };

    window.deleteRecurso = function(index) {
        if (confirm('¿Estás seguro de que quieres eliminar este recurso?')) {
            recursos.splice(index, 1);
            saveRecursos();
        }
    };

    formatoSelect.addEventListener('change', updateGeneroOptions);
    estadoSelect.addEventListener('change', toggleFields);
    recursoForm.addEventListener('submit', handleFormSubmit);
    Object.values(filtros).forEach(filtro => filtro.addEventListener('change', renderRecursos));

    renderRecursos();
});

