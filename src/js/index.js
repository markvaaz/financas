// Imports que serão substituidos por HTTP request
import {config as config} from "./server/config.js";
import {card as card} from "./server/cards.js";
// Importa ferramentas
import {tools as tools} from "./ferramentas.js";

let create = tools.create;
let data = tools.data;
let calculos = tools.calculos;

// Objeto resposável por carregar as informações no front-end
let load = {
  resumo:function(){
    // Renda Liquida
    let rl = document.getElementById("rl");
    // Sobra da Renda
    let sm = document.getElementById("sm");
    // Divida Mensal
    let dm = document.getElementById("dm");
    // Divida Total
    let dt = document.getElementById("dt");
    
    rl.innerHTML = calculos.converter(config.renda);
    if(calculos.sobraDaRenda(card).includes("-")){
      sm.style.color = "red";
      sm.innerHTML = calculos.sobraDaRenda(card);
    }else{
      sm.style.color = "green";
      sm.innerHTML = calculos.sobraDaRenda(card);
    }
    dm.innerHTML = calculos.dividaMensal(card);
    dt.innerHTML = calculos.dividaTotal(card);
  },
  cards:function(){
    let cardContainer = document.getElementById("cards");
    let titleVencimentos = document.getElementById("title-vencimentos");
    let check = true;
    card.forEach(cardItem => {
      let parcelasForamPagas = cardItem.parcelas === cardItem.parcelasPagas; 
      // Verifica deste ano
      if(!parcelasForamPagas && (cardItem.ultimoMesPago < data.mesNumero && cardItem.ultimoAnoPago === data.ano || (cardItem.ultimoAnoPago === null && cardItem.ultimoMesPago === null && cardItem.ultimoDiaPago === null))){
        cardContainer.appendChild(this.create(cardItem));
        if(!check) check = true;
      }else if(!parcelasForamPagas && (cardItem.ultimoAnoPago < data.ano && cardItem.ultimoAnoPago !== null)){
        cardContainer.appendChild(this.create(cardItem));
        if(!check) check = true;
      }
      calculos.jurosReais(cardItem);
    });
    if(check){
      titleVencimentos.innerHTML = "Proximos vencimentos";
    }else{
      titleVencimentos.innerHTML = "Nenhum pagamento pendente";
    }
  },
  create:function(item){
    let novoCard = create("div", {className:"card shadow", appendChild:[
      create("div", {className:"descricao", innerHTML:`<i class="fas fa-grip-horizontal"></i> <span>${item.descricao}</span>`}),
      create("div", {className:"valor", innerHTML:`Valor <span>${calculos.converter(item.valor)}</span>`}),
      create("div", {className:"proxima-parcela", innerHTML:`Proxima parcela <span>${calculos.converter(calculos.jurosReais(item))}</span>`}),
      create("div", {className:"vencimento", innerHTML:`Data de vencimento <span>${item.vencimento}/${item.ultimoMesPago === null ? data.ultimoMesPago < 10 ? "0" + (data.ultimoMesPago+1) : item.primeiroMes < 10 ? "0" + (item.primeiroMes+1) : item.primeiroMes : item.ultimoMesPago === 11 ? "01" : item.ultimoMesPago + 2}</span>`}),
      create("div", {className:"valor-pago", innerHTML:`Valor pago <span>${calculos.converter(item.parcelasPagas !== 0 ? ((item.valor / item.parcelas) * item.parcelasPagas) : 0)}</span>`}),
      create("div", {className:"parcelas", innerHTML:`Parcelas <span>${item.parcelas}</span>`}),
      create("div", {className:"parcelas-pagas", innerHTML:`Parcelas pagas <span>${item.parcelasPagas}</span>`}),
      create("div", {className:"juros", innerHTML:`Juros <span>${item.juros} %</span>`}),
      create("div", {className:"historico", innerHTML:`Historico <span>${item.historico !== null ? item.historico : "Indisponível"}</span>`})
    ]});
    return novoCard;
  }
};

load.resumo();
load.cards();
