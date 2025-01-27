let listaDeNumeroSorteados = [];
let numeroLimite = 30;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//funções com parametros e sem retorno
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    speakText(texto, 'pt-BR', 1.2);
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo Do Número Secreto' );
exibirTextoNaTela('p', 'Escolha um número entre 1 e 30');
}

//funções sem parametros e sem retorno 
function verificarChute() {
    //input está no HTML
    let chute = document.querySelector('input').value;

         if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!!');
            let palavraTentativa = tentativas > 1 ?'Tentativas' : 'Tentativa';
            let mensagemTentativas = `Voce descobriu o Número Secreto com ${tentativas} ${palavraTentativa}!`;
            responsiveVoice.speak(mensagemTentativas, 'Brazilian Portuguese Female', {rate:1.1});
            exibirTextoNaTela('p', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
         } else {
            if(chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número Secreto é menor!');
            } else{
                exibirTextoNaTela('p', 'O número Secreto é maior!');
            }
            tentativas++;
            limparCampo()
         }
         
}

exibirMensagemInicial();

//função sem parametros mas com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
    // length exibe a quantidade de elementos de uma lista
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumeroSorteados = [];
    }
    //includes verifica se um elemento já está na lista
    if(listaDeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        // Para adicionar um elemento ao final da array, você pode usar o método push.
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    //colocar um atributi novo 'setAttribute'
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
    
function speakText(text, lang, rate) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
        return;      
    }
    console.log("Web Speech API não suportada neste navegador.");
}
