import { urlBaseAPI, urlBaseFront } from "../url/base.js";

function realizaLogout() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    fetch(`${urlBaseAPI}/user/logout`, opcoes)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            window.location = `${urlBaseFront}/index.html`;
        })
}

export { realizaLogout };

