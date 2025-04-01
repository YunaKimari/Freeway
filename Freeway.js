//imagens e sons
let imagens = {}, sons = {};

//variáveis dos carros
const xInicialCarros = 600;
const carros = [
    { x: xInicialCarros, y: 40, velocidade: 2 },
    { x: xInicialCarros, y: 96, velocidade: 2.5 },
    { x: xInicialCarros, y: 150, velocidade: 3.2 },
    { x: xInicialCarros, y: 210, velocidade: 3.3 },
    { x: xInicialCarros, y: 270, velocidade: 5 },
    { x: xInicialCarros, y: 318, velocidade: 2.3 }
];
const tamanhoCarro = { largura: 50, altura: 40 };

//variáveis do personagem
const personagem = { x: 85, y: 366, pontos: 0 };

function preload() {
    imagens.estrada = loadImage("Freeway/estrada.png");
    imagens.personagem = loadImage("Freeway/ator-1.png");
    imagens.carros = [
        loadImage("Freeway/carro-1.png"),
        loadImage("Freeway/carro-2.png"),
        loadImage("Freeway/carro-3.png"),
        loadImage("Freeway/carro-1.png"),
        loadImage("Freeway/carro-2.png"),
        loadImage("Freeway/carro-3.png")
    ];
    
    sons.trilha = loadSound("Freeway/sons/trilha.mp3");
    sons.colisao = loadSound("Freeway/sons/colidiu.mp3");
    sons.ponto = loadSound("Freeway/sons/pontos.wav");
}

function setup() {
    createCanvas(500, 400);
    sons.trilha.loop();
}

function draw() {
    background(imagens.estrada);
    desenhaPersonagem();
    desenhaCarros();
    movimentaCarros();
    movimentaPersonagem();
    verificaColisao();
    exibePontos();
    verificaPontuacao();
}

function desenhaPersonagem() {
    image(imagens.personagem, personagem.x, personagem.y, 30, 30);
}

function desenhaCarros() {
    carros.forEach((carro, i) => {
        image(imagens.carros[i], carro.x, carro.y, tamanhoCarro.largura, tamanhoCarro.altura);
    });
}

function movimentaCarros() {
    carros.forEach(carro => {
        carro.x -= carro.velocidade;
        if (carro.x < -tamanhoCarro.largura) {
            carro.x = xInicialCarros;
        }
    });
}

function movimentaPersonagem() {
    if (keyIsDown(UP_ARROW)) personagem.y -= 3;
    if (keyIsDown(DOWN_ARROW) && podeSeMover()) personagem.y += 3;
}

function verificaColisao() {
    carros.forEach(carro => {
        if (
            personagem.x < carro.x + tamanhoCarro.largura &&
            personagem.x + 30 > carro.x &&
            personagem.y < carro.y + tamanhoCarro.altura &&
            personagem.y + 30 > carro.y
        ) {
            sons.colisao.play();
            personagem.y = 366;
            if (personagem.pontos > 0) personagem.pontos--;
        }
    });
}

function exibePontos() {
    textAlign(CENTER);
    textSize(25);
    fill(255, 0, 0);
    text(personagem.pontos, width / 5, 27);
}

function verificaPontuacao() {
    if (personagem.y < 15) {
        personagem.pontos++;
        sons.ponto.play();
        personagem.y = 366;
    }
}

function podeSeMover() {
    return personagem.y < 366;
}