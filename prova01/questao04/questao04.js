/* Código não funcional */
/* Nota: 0.4 */

var div = document.getElementById("quadro");
var verde = document.getElementById("Verde");
var vermelho = document.getElementById("Vermelho");
var azul = document.getElementById("Azul");

verde.addEventListener("click", function () {
    div.setBackgroundColor = (0, 1, 0, 0)
})()
vermelho.addEventListener("click", function () {
    div.setBackgroundColor = (1, 0, 0, 0)
})()
azul.addEventListener("click", function () {
    div.setBackgroundColor = (0, 0, 1, 0)
})()
