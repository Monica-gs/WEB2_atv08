import { checkLogin } from "../login/login.js";
import { urlBaseAPI, urlBaseFront } from "../url/base.js";

let dados = [];

function desenhaTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < dados.length; i++) {
        const tr = document.createElement('tr');
        const btEx = document.createElement('button');
        const btEd = document.createElement('button');

        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');

        btEx.innerText = '-';
        btEx.setAttribute('data-id', dados[i].id);
        btEx.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            alternaModal();
            enviaDadosParaDelecao(id);
        });

        btEd.innerText = '.';
        btEd.setAttribute('data-index', i);
        btEd.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            alternaModal();
            preencheFormParaEdicao(index);
        });

        // console.log(dados[i])
        td1.innerText = dados[i].id;
        td2.innerText = dados[i].nomeC;
        td3.innerText = dados[i].reitorC;
        td4.innerText = dados[i].disciplina.nome;
        td5.innerText = dados[i].tipo;
        td6.append(btEd, btEx);

        tr.append(td1, td2, td3, td4, td5, td6);
        tbody.append(tr);
    }
}

function carregaDisciplinas() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    fetch(`${urlBaseAPI}/disciplinas`, opcoes)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            //alert(json);
            const select = document.getElementById('DisciplinaId');
            select.innerHTML = '';
            for (let i = 0; i < json.length; i++) {
                const option = document.createElement('option');
                option.innerText = json[i].nome;
                option.value = json[i].id;
                select.append(option);                
            } 
            dados = json;           
        })
}

function carregaDados() {
    const opcoes = {
        method: 'get',
        credentials: 'include'
    };
    fetch(`${urlBaseAPI}/cursos`, opcoes)
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((json) => {
            console.log(json);
            //alert(json);
            dados = json;
            desenhaTabela();
        })
}

function enviaDadosParaCadastro() {
    const dados = new FormData(document.querySelector('form'));
    const opcoes = {
        method: 'post',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/cursos`, opcoes)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            alert('Curso cadastrada!');
            carregaDados();
        })
    alternaModal();
}

function enviaDadosParaDelecao(id) {
    const dados = new FormData();
    dados.append('id', id);
    const opcoes = {
        method: 'delete',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/cursos`, opcoes)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            alert('Curso deletada!');
            carregaDados();
        })
    alternaModal();
}

function preencheFormParaEdicao(index) {
    document.querySelector('#id').value = dados[index].id;
    document.querySelector('#nomeC').value = dados[index].nomeC;
    document.querySelector('#reitorC').value = dados[index].reitorC;
    document.querySelector('#DisciplinaId').value = dados[index].DisciplinaId;
    document.querySelector('#tipo').value = dados[index].tipo;
}

function enviaDadosParaEdicao() {
    const dados = new FormData(document.querySelector('form'));
    const opcoes = {
        method: 'put',
        credentials: 'include',
        body: new URLSearchParams(dados)
    };
    fetch(`${urlBaseAPI}/cursos`, opcoes)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((json) => {
            //console.log(json);
            alert('Curso alterada!');
            carregaDados();
        })
    alternaModal();
}

function alternaModal() {
    document.querySelector('#modal').classList.toggle('mostrarModal');
}

document.querySelector('form button').addEventListener('click', (e) => {
    e.preventDefault();
    if (document.querySelector('#id').value) {
        enviaDadosParaEdicao();
    } else {
        enviaDadosParaCadastro();
    }
    document.querySelector('#id').value = '';
    e.target.parentNode.reset();
});

document.querySelector('#btNovo').addEventListener('click', alternaModal);
window.addEventListener('load', () => {
    checkLogin()
    .then((res)=>{
        if(res){
            console.log(dados)
            carregaDisciplinas();
            carregaDados();
        } else {
            window.location = `${urlBaseFront}/login/login.html`;
        }
    })    
});

