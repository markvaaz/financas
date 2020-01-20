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
    return ((config.salarioLiquido - resultado) + config.horasExtras);
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
console.log(`
Nome: ${config.nome}
Sobra do salario desse mes: ${calculos.salario()}
Salario bruto: ${config.salarioBruto}
Salario Liquido: ${config.salarioLiquido}
Divida desse mes: ${calculos.dividaMensal()}
Divida restante total: ${calculos.divida()}
`);