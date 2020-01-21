
//let config = require("./config");

import {config as config} from "./config.js";
window.config = config;

console.log(config);

let card = [
  {
    descricao:"",
    valor:1500,
    parcelas:10,
    parcelasPagas:0,
    vencimento:0,
    juros:0
  },
  {
    descricao:"",
    valor:2595,
    parcelas:6,
    parcelasPagas:3,
    vencimento:0,
    juros:0.5
  }
]
let calculos = {
  salario:function(){
    let resultado = 0
    for(let i = 0; i < card.length; i++) resultado += card[i].valor / (card[i].parcelas - card[i].parcelasPagas);
    return calculos.converter((config.renda - resultado) + config.rendaExtra);
  },
  dividaMensal:function(){
    let resultado = 0
    for(let i = 0; i < card.length; i++) resultado += card[i].valor / card[i].parcelas;
    return calculos.converter(resultado);
  },
  divida:function(){
    let resultado = 0;
    for(let i = 0; i < card.length; i++) resultado += card[i].valor - ((card[i].valor / card[i].parcelas) * card[i].parcelasPagas);
    return calculos.converter(resultado);
  },
  juros:function(item){
    let parcelas = item.valor / item.parcelas;
    return calculos.converter((parcelas * (item.juros / 100)).toFixed(2))
  },
  converter:function(item){
    return item.toLocaleString('pt-BR', {minimumFractionDigits: 2,  maximumFractionDigits: 2, style: 'currency', currency: 'BRL'});
  }
}
function load(){
  let rl = document.getElementById("rl");
  let sm = document.getElementById("sm");
  let dm = document.getElementById("dm");
  let dt = document.getElementById("dt");
  
  rl.innerHTML = calculos.converter(config.renda);
  sm.innerHTML = calculos.salario();
  dm.innerHTML = calculos.dividaMensal();
  dt.innerHTML = calculos.divida();
}
console.log(calculos.salario());
window.onload = load();
