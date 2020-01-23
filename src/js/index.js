// Imports que serão substituidos por HTTP request
import {config as config} from "./config.js";
import {card as card} from "./cards.js";
// Importa ferramentas uteis 
import {create as create, calculos as calculos} from "./ferramentas.js";

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
    for(let i = 0; i < card.length; i++){
      let novoCard = create("div", {className:"card shadow", appendChild:[
        create("div", {className:"descricao", innerHTML:`<i class="fas fa-grip-horizontal"></i> <span>${card[i].descricao}</span>`}),
        create("div", {className:"valor", innerHTML:`Valor <span>${calculos.converter(card[i].valor)}</span>`}),
        create("div", {className:"proxima-parcela", innerHTML:`Proxima parcela <span>${calculos.converter(card[i].valor / card[i].parcelas)}</span>`}),
        create("div", {className:"valor-pago", innerHTML:`Valor pago <span>${calculos.converter(card[i].parcelasPagas !== 0 ? ((card[i].valor / card[i].parcelas) * card[i].parcelasPagas) : 0)}</span>`}),
        create("div", {className:"parcelas", innerHTML:`Parcelas <span>${card[i].parcelas}</span>`}),
        create("div", {className:"parcelas-pagas", innerHTML:`Parcelas pagas <span>${card[i].parcelasPagas}</span>`}),
        create("div", {className:"vencimento", innerHTML:`Dia de vencimento <span>${card[i].vencimento}</span>`}),
        create("div", {className:"juros", innerHTML:`Juros <span>${card[i].juros} %</span>`}),
        create("div", {className:"historico", innerHTML:`Historico <span>${card[i].historico !== null ? card[i].historico : "Indisponível"}</span>`})
      ]});
      cardContainer.appendChild(novoCard);
    }
  }
}
load.resumo();
load.cards();