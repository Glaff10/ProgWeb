(function () {

  const FPS = 300;
  const HEIGHT = 300;
  const WIDTH = 1024;
  const PROB_NUVEM = 1;

  let gameLoop;
  let deserto;
  let dino;
  let turno;
  let pontuacao;
  let nuvens = [];
  let turnoLoop;
  let turnoState = 0; // 0 - dia, 1 - noite
  let frame = 0;
  let gameState = 0; // 0- not started, 1 - running, 2 - paused
  let Score = 0;
  let speedAcc = FPS;

  function init() {
    deserto = new Deserto();
    dino = new Dino();
    turno = new Turno();
    pontuacao = new Pontuacao();
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if(gameState === 0){
        gameState = 1;
        gameLoop = setInterval(run, 1000 / FPS);
        turnoLoop = setInterval(trocarTurno, 60000);
      }
      else if(gameState === 1){
        if(dino.status === 0) dino.status = 1;
      }
      else if(gameState === 2){
        gameState = 1;
        gameLoop = setInterval(run, 1000 / (speedAcc));
      }
    }
    
    if(e.key === "ArrowDown"){
      if(gameState === 1){
        if(dino.status === 0) dino.status = 3;
      }
    }
    
    if(e.key.toLowerCase() === 'p' && gameState === 1){
      gameState = 2;
      clearInterval(gameLoop);
    }
  })

  window.addEventListener("keyup", (e) => {
    if(e.key === "ArrowDown"){
      if(dino.status === 3) {
        dino.status = 0; 
        dino.element.style.width = '66px'
      }
    }
  })


  class Deserto {
    constructor() {
      this.element = document.createElement("div")
      this.element.className = "deserto";
      this.element.style.width = `${WIDTH}px`;
      this.element.style.height = `${HEIGHT}px`;
      document.getElementById("game").appendChild(this.element);

      this.chao = document.createElement("div")
      this.chao.className = "chao";
      this.chao.style.backgroundPositionX = 0;
      this.element.appendChild(this.chao);
    }
    mover() {
      this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`
    }
  
  }

  class Dino {
    #status
    constructor() {
      this.backgroundPositionsX = {
        correndo1: "-1391px",
        correndo2: "-1457px",
        pulando: "-1259px",
        agachando1: "-1654px",
        agachando2: "-1744px"
      }
      this.#status = 0; // 0-correndo, 1-subindo, 2-descendo
      this.alturaMinima = 2;
      this.alturaMaxima = 100;
      this.element = document.createElement("div")
      this.element.className = "dino";
      this.element.style.width = "66px";
      this.element.style.backgroundPositionX = this.backgroundPositionsX.correndo1;
      this.element.style.backgroundPositionY = "-2px";
      this.element.style.bottom = `${this.alturaMinima}px`
      deserto.element.appendChild(this.element)
    }
    /**
     * @param {number} value
     */
    set status(value) {
      if (value >= 0 && value <= 3) this.#status = value;
    }
    get status() {
      return this.#status;
    }
    correr() {
      if (this.#status === 0 && frame % 20 === 0) this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.correndo1 ? this.backgroundPositionsX.correndo2 : this.backgroundPositionsX.correndo1;
      else if (this.#status === 1) {
        this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
        this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
        if (parseInt(this.element.style.bottom) >= this.alturaMaxima) this.status = 2;
      }
      else if (this.#status === 2) {
        this.element.style.bottom = `${parseInt(this.element.style.bottom) - 1}px`;
        if (parseInt(this.element.style.bottom) <= this.alturaMinima) this.status = 0;
      }
      else if (this.#status === 3){
        this.element.style.width = '87px';
        this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.agachando1 ? this.backgroundPositionsX.agachando2 : this.backgroundPositionsX.agachando1;
      }
    }
  }

  class Nuvem {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "nuvem";
      this.element.style.right = 0;
      this.element.style.top = `${parseInt(Math.random() * 200)}px`
      deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
    }
  }

  class Turno {
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "turno";
      deserto.element.appendChild(this.element);
    }

    passarTurnoParaNoite(){
      let r, g, b;

      r = 0;
      g = 0;
      b = 0;

      deserto.element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`

    }
    passarTurnoParaDia(){
      let r, g, b;

      r = 255;
      g = 255;
      b = 255;

      deserto.element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    }

    aumentarVelocidade(){
      speedAcc = speedAcc + 0.05
      gameLoop = setInterval(run, 1000 / speedAcc);
    }
  }

  class Pontuacao {
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "pontuacao";
      deserto.element.appendChild(this.element);
    }
    
    updateScore() {
      Score++;
      this.element.textContent = `${Score}`;
    }
  }

  function removerElements() {
    const telaRight = 1030;
    const nuvensLength = nuvens.length;
  
    for (let i = 0; i < nuvensLength; i++) {
      const nuvem = nuvens[i];
      if (parseInt(nuvem.element.style.right) > telaRight) {
        nuvem.element.remove();
        nuvens.splice(i, 1);
      }
    }
  }
  

  function trocarTurno(){
    if(turnoState === 0){
      turno.passarTurnoParaNoite();
      turno.aumentarVelocidade();
      turnoState = 1;
    }
    else{
      turno.passarTurnoParaDia();
      turno.aumentarVelocidade();
      turnoState = 0;
    }
  }

  function run() {
    telaRight = 1000
    frame = frame + 1
    
    if(frame % 30 === 0) pontuacao.updateScore();
    if (frame === FPS) frame = 0;
    
    deserto.mover()
    dino.correr()
    
    if (Math.random() * 100 <= PROB_NUVEM) nuvens.push(new Nuvem());
    if (frame % 2 === 0) nuvens.forEach(nuvem => nuvem.mover());
    removerElements();

  }

  init()

})()