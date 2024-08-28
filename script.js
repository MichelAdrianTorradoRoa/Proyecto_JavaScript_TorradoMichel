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
