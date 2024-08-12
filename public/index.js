import { checkLogin } from './login/login.js';
import { checkSeExisteRegistro } from './registro/registro.js';

const linkLogin = document.getElementById('link_login');

if (await checkSeExisteRegistro()) {
    if (await checkLogin()) {
        linkLogin.href = './logout/logout.html';
        linkLogin.innerText = 'Logout';
    } else {
        linkLogin.href = './login/login.html';
        linkLogin.innerText = 'Login';
    }
} else {
    linkLogin.href = './registro/registro.html';
    linkLogin.innerText = 'Registrar';
}