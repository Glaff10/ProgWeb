var div = getElementById("quadro");

var verde = getElementById("Verde");
var vermelho = getElementById("Vermelho");
var azul = getElementById("Azul");

verde.addEventListener("click", function(){
    div.setBackgroundColor = (0, 1, 0, 0)
})
vermelho.addEventListener("click", function(){
    div.setBackgroundColor = (1, 0, 0, 0)
})
azul.addEventListener("click", function(){
    div.setBackgroundColor = (0, 0, 1, 0)
})
