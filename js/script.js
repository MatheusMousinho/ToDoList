let input = document.querySelector('input[name=tarefa]');

let btn = document.querySelector('#botao');

let lista = document.querySelector('#lista');

let card = document.querySelector('.card')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


//amostrar tarefas
function renderizarTarefas(){

    //limpar a lista antes de mostrar

    lista.innerHTML = '';


    //mostrar a lista
    for(tarefa of tarefas){
        //criar o item da lista
        let itemLista = document.createElement('li');

        itemLista.setAttribute('class','list-group-item list-group-item-action');

        itemLista.onclick = function(){
            deletarTarefa(this)
        }

        let itemTexto = document.createTextNode(tarefa);

        itemLista.appendChild(itemTexto);

        lista.appendChild(itemLista);
    }
};

renderizarTarefas();


//adicionar tarefa
btn.onclick = function(){
    let novaTarefa = input.value;

    //validar se não está em branco

    if(novaTarefa !==""){
        tarefas.push(novaTarefa);

        renderizarTarefas();

        input.value= '';

        removerSpans()
            //salvar dados
        salvarDadosNoStorage();
    }else{
        removerSpans()

        let card = document.querySelector('.card');

        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informar a tarefa');

        span.appendChild(msg);

        card.appendChild(span);
    }
  
}
                       
function removerSpans(){    
    let spans = document.querySelectorAll('span');

    let card = document.querySelector('.card');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i])
    }

}

function deletarTarefa(tar){
    console.log(tar)
    //remove a tabela
    tarefas.splice(tarefas.indexOf(tar.textContent), 1)

    //renderizar tela
    renderizarTarefas();

    //salvar dados
    salvarDadosNoStorage();
}

function salvarDadosNoStorage(){

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}