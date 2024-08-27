document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí deberías validar las credenciales del usuario con un backend real.
    // Para este ejemplo, simplemente verificaremos si el usuario y la contraseña no están vacíos.
    if (username && password) {
        // Redirigir a la página principal si el inicio de sesión es exitoso.
        window.location.href = 'page.html';
    } else {
        alert('Por favor, ingrese un usuario y una contraseña válidos.');
    }
});