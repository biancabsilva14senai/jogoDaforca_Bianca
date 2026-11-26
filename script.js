let palavras = ["Banana", "Computador", "Cachorro", "Porta", "Mouse", "Ferreiro", "Damasco", "Algoritimo", "Gato", "Tatu", "Vespa", "Morango", "Guitarra", "Doce", "Salgado"];

let palavraSecreta = "";
let vidasRestantes = 6;
let palavraOculta = [];
let letrasTestadas = [];

const telaPalavra = document.querySelector("#palavra-secreta");
const telaVidas = document.querySelector("#vidas");
const telaErradas = document.querySelector("#letras-erradas");
const campoLetra = document.querySelector("#campo-letra");
const btnTestar = document.querySelector("#btn-testar");
const statusMensagens = document.querySelector("#status");
const btnReiniciar = document.querySelector("#btn-reiniciar");

btnTestar.addEventListener("click", testarLetra);
btnReiniciar.addEventListener("click", iniciarJogo);

campoLetra.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        testarLetra();
    }
});

function iniciarJogo() {
    let indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[indiceAleatorio].toUpperCase();

    vidasRestantes = 6;
    palavraOculta = [];
    letrasTestadas = [];

    for (let i = 0; i < palavraSecreta.length; i++) {
        palavraOculta.push("_");
    }

    telaVidas.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        telaVidas.innerHTML += `<span class="coracao">❤️</span>`;
    }

    telaPalavra.innerHTML = palavraOculta.join(" ");
    telaErradas.innerHTML = "";
    statusMensagens.innerHTML = "";

    campoLetra.disabled = false;
    btnTestar.disabled = false;
    campoLetra.value = "";
    campoLetra.focus();
}

function testarLetra() {
    let letra = campoLetra.value.toUpperCase().trim();
    campoLetra.value = "";
    campoLetra.focus();

    if (letra === "" || !/^[A-ZÇ]$/.test(letra)) {
        return;
    }

    if (letrasTestadas.includes(letra)) {
        statusMensagens.innerHTML = `<p style="color: orange;">Você já tentou a letra <strong>${letra}</strong>!</p>`;
        return;
    }

    statusMensagens.innerHTML = "";
    letrasTestadas.push(letra);

    let encontrou = false;

    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
            palavraOculta[i] = letra;
            encontrou = true;
        }
    }

    if (encontrou) {
        telaPalavra.innerHTML = palavraOculta.join(" ");
    } else {
        vidasRestantes--;
        
        let coracoes = document.querySelectorAll(".coracao");
        coracoes[vidasRestantes].classList.add("sumir");

        telaErradas.innerHTML += `${letra} `;
    }

    if (vidasRestantes === 0) {
        statusMensagens.innerHTML = `<p style="color: red;"><strong>PERDEDOR!</strong> Suas vidas acabaram. A palavra era: <strong>${palavraSecreta}</strong>.</p>`;
        finalizarControles();
    } else if (!palavraOculta.includes("_")) {
        statusMensagens.innerHTML = `<p style="color: green;"><strong>VENCEDOR!</strong> Parabéns, você descobriu a palavra!</p>`;
        finalizarControles();
    }
}

function finalizarControles() {
    btnTestar.disabled = true;
    campoLetra.disabled = true;
}

iniciarJogo();