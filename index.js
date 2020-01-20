let config = require("./config");

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
    return (config.salarioLiquido - resultado);
  },
  dividaMensal:function(){
    let resultado = 0
    for(let i = 0; i < card.length; i++) resultado += card[i].valor / card[i].parcelas;
    return resultado;
  },
  divida:function(){
    let resultado = 0;
    for(let i = 0; i < card.length; i++) resultado += card[i].valor - ((card[i].valor / card[i].parcelas) * card[i].parcelasPagas);
    return resultado;
  },
  juros:function(item){
    let parcelas = item.valor / item.parcelas;
    return (parcelas * (item.juros / 100)).toFixed(2);
  }
}

console.log("Salario liquido: "+config.salarioLiquido);
console.log("Divida mensal: "+calculos.dividaMensal());
console.log("Sobra do salario do mes: "+calculos.salario());
console.log("Divida Total: "+calculos.divida());
console.log("O item 2 tem um juros de "+calculos.juros(card[1])+" Reais ao dia");
