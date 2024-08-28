<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    showRegister.addEventListener('click', () => {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';
    });

    showLogin.addEventListener('click', () => {
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert('Inicio de sesión exitoso');
            window.location.href = 'page.html'; // Redirigir a la página principal
        } else {
            alert('Correo electrónico o contraseña incorrectos');
        }
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === email)) {
            alert('El correo electrónico ya está registrado');
            return;
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso. Puedes iniciar sesión ahora.');
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    });
});
=======
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
>>>>>>> df0a5d03c268efe7678e96a1f32e2ad64ada1aca
