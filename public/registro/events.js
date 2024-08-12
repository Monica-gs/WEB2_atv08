import { realizaLogin } from './login.js';

const btLogin = document.querySelector('form button');
btLogin.addEventListener('click', (e) => {
    e.preventDefault();
    realizaLogin();
});