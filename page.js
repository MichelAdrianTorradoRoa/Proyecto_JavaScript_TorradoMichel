document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const serie = document.getElementById('serie').value;
    const password = document.getElementById('password').value;

    // Aquí deberías validar las credenciales del usuario con un backend real.
    // Para este ejemplo, simplemente verificaremos si el usuario y la contraseña no están vacíos.
    if (serie) {
        // Redirigir a la página principal si el inicio de sesión es exitoso.
        window.location.href = 'serie.html';
    }
});