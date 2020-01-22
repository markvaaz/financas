
//let config = require("./config");
import {config as config} from "./config.js";
import {card as card} from "./cards.js";
import {load as load} from "./front.js";
import {create as create} from "./tools.js";

window.config = config;
window.card = card;
window.load = load;
window.create = create;
console.log(card)

let calculos = {
  salario:function(){
    let resultado = 0
    for(let i = 0; i < card.length; i++){ 
      if(card[i].parcelas > card[i].parcelasPagas){
        resultado += card[i].valor / card[i].parcelas;
      }
    }
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
load.resumo();