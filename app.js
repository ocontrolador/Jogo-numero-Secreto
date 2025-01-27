const listaDeNumeroSorteados = [];
const numeroLimite = 30;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//funções com parametros e sem retorno
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    speakText(texto, 'pt-BR', 1.2);
};

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo Do Número Secreto' );
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
};

//funções sem parametros e sem retorno 
function verificarChute() {
    //input está no HTML
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ?'Tentativas' : 'Tentativa';
        let mensagemTentativas = `Voce descobriu o Número Secreto com ${tentativas} ${palavraTentativa}!`;
        speakText(mensagemTentativas);
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }

    if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `O número Secreto é menor ${chute}!`);
    } else {
        exibirTextoNaTela('p', `O número Secreto é maior que ${chute}!`);
    }

    tentativas++;
    limparCampo();         
};

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let escolheNumero = true;
    let numeroEscolhido;

    while (escolheNumero) {      
      numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
      escolheNumero = listaDeNumeroSorteados.includes(numeroEscolhido);
      console.log('Número Sorteado:', numeroEscolhido);
      console.log('Escolhe Número:', escolheNumero);
    }

    listaDeNumeroSorteados.push(numeroEscolhido);
    console.log('Número Sorteado:', numeroEscolhido);
    console.log('Lista de Números Sorteados:', listaDeNumeroSorteados);
    return numeroEscolhido;    
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
   
/*
function speakText(text, lang = 'pt-BR', rate = 1.2) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
        return;      
    }
    console.log("Web Speech API não suportada neste navegador.");
}
*/

/**
 * Função para sintetizar texto em fala usando a Web Speech API.
 * 
 * @param {string} text - O texto que será convertido em fala.
 * @param {string} lang - (Opcional) O idioma da fala no formato BCP 47. Exemplo: 'pt-BR' para português do Brasil. O valor padrão é 'pt-BR'.
 * @param {number} rate - (Opcional) A velocidade da fala (0.1 a 10). O valor padrão é 1.2.
 *
 * Exemplos de uso:
 * speakText("Olá, tudo bem?", "pt-BR", 1); // Fala em português do Brasil com velocidade normal
 * speakText("Hello, how are you?", "en-US", 1.4); // Fala em inglês americano com velocidade mais rápida
 * speakText("Bonjour tout le monde", "fr-FR"); // Fala em francês com velocidade padrão
 *
 * Idiomas suportados (alguns exemplos):
 * - 'en-US': Inglês (Estados Unidos)
 * - 'pt-BR': Português (Brasil)
 * - 'es-ES': Espanhol (Espanha)
 * - 'fr-FR': Francês (França)
 * - 'de-DE': Alemão
 */
function speakText(text, lang = 'pt-BR', rate = 1.2) {
    if ('speechSynthesis' in window) {
        if (!text) {
            console.log("Texto vazio ou inválido.");
            return;
        }

        // Cancela qualquer fala em andamento
        window.speechSynthesis.cancel();

        try {
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = rate;

            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error("Erro ao tentar sintetizar fala:", error);
        }
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

