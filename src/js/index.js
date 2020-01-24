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
    sm.innerHTML = calculos.sobraDaRenda(card);
    dm.innerHTML = calculos.dividaMensal(card);
    dt.innerHTML = calculos.dividaTotal(card);
  },
  cards:function(){
    let cardContainer = document.getElementById("cards");
    let titleVencimentos = document.getElementById("title-vencimentos");
    let resultado = false;
    if(card){
      for(let i = 0; i < card.length; i++){
        if(card[i].vencimento >= data.dia){
          resultado = true;
        }
      }
    }
    if(resultado){
      titleVencimentos.innerHTML = "Vencimentos de "+data.mes();
      for(let i = 0; i < card.length; i++){
        if(card[i].vencimento >= data.dia && card[i].parcelas > card[i].parcelasPagas, card[i].vencimento <= data.dia && card[i].ultimoMesPago < (data.mesNumero+1)){
          console.log("1")
          if(card[i].ultimoMesPago < (data.mesNumero+1) || card[i].ultimoMesPago === null){
            console.log("2")
            let novoCard = this.create(card[i]);
            console.log(card[i]);
            cardContainer.appendChild(novoCard);
          }
        }
      }
    }else{
      console.log("cheogu aqui")
      titleVencimentos.innerHTML = "Proximos vencimentos em "+data.mes(1);
      for(let i = 0; i < card.length; i++){
        if(card[i].parcelas > card[i].parcelasPagas){
          let novoCard = this.create(card[i]);
          cardContainer.appendChild(novoCard);
        }
      }
    }
  },
  create:function(item){
    let novoCard = create("div", {className:"card shadow", appendChild:[
      create("div", {className:"descricao", innerHTML:`<i class="fas fa-grip-horizontal"></i> <span>${item.descricao}</span>`}),
      create("div", {className:"valor", innerHTML:`Valor <span>${calculos.converter(item.valor)}</span>`}),
      create("div", {className:"proxima-parcela", innerHTML:`Proxima parcela <span>${calculos.converter(item.valor / item.parcelas)}</span>`}),
      create("div", {className:"valor-pago", innerHTML:`Valor pago <span>${calculos.converter(item.parcelasPagas !== 0 ? ((item.valor / item.parcelas) * item.parcelasPagas) : 0)}</span>`}),
      create("div", {className:"parcelas", innerHTML:`Parcelas <span>${item.parcelas}</span>`}),
      create("div", {className:"parcelas-pagas", innerHTML:`Parcelas pagas <span>${item.parcelasPagas}</span>`}),
      create("div", {className:"vencimento", innerHTML:`Dia de vencimento <span>${item.vencimento}</span>`}),
      create("div", {className:"juros", innerHTML:`Juros <span>${item.juros} %</span>`}),
      create("div", {className:"historico", innerHTML:`Historico <span>${item.historico !== null ? item.historico : "Indisponível"}</span>`})
    ]});
    return novoCard;
  }
}
load.resumo();
load.cards();
