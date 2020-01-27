// Rodará no back-end com uma função que retornará um JSON com todos os cards e exporta-lo
let card = [
  {
    descricao:"Pago esse mes",
    valor:1000,
    parcelas:10,
    parcelasPagas:5,
    ultimoDiaPago:15,
    ultimoMesPago:0,
    ultimoAnoPago:2020,
    vencimento:15,
    primeiroMes:0,
    juros:0,
    tipoDeJuros:0,
    historico:[]
  },
  {
    descricao:"Pago mes passado",
    valor:1000,
    parcelas:10,
    parcelasPagas:10,
    ultimoDiaPago:15,
    ultimoMesPago:11,
    ultimoAnoPago:2019,
    vencimento:15,
    primeiroMes:0,
    juros:0,
    tipoDeJuros:0,
    historico:[]
  },
  {
    descricao:"2 meses sem pagar !",
    valor:1000,
    parcelas:10,
    parcelasPagas:9,
    ultimoDiaPago:15,
    ultimoMesPago:10,
    ultimoAnoPago:2019,
    vencimento:24,
    primeiroMes:0,
    juros:1,
    tipoDeJuros:1,
    historico:[]
  },
  {
    descricao:"Nunca pago !",
    valor:1000,
    parcelas:10,
    parcelasPagas:0,
    ultimoDiaPago:null,
    ultimoMesPago:null,
    ultimoAnoPago:null,
    vencimento:26,
    primeiroMes:0,
    juros:0,
    tipoDeJuros:0,
    historico:[]
  }
];

export {card as card};