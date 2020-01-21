
//let config = require("./config");

import config from "./config.js";


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
    for(let i = 0; i < card.length; i++) resultado += card[i].valor / card[i].parcelas;
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
console.log(`
Nome: ${config.nome}
Sobra do salario desse mes: ${calculos.salario()}
Salario Liquido: ${calculos.converter(config.renda)}
Divida desse mes: ${calculos.dividaMensal()}
Divida restante total: ${calculos.divida()}
`);
