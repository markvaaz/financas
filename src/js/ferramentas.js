// import será substituido por HTTP request
import {config as config} from "./server/config.js";
// Para saber mais sobre a função create acesse https://github.com/markvaaz/financas
let tools = {
  create:function(elementName, attributes){
    let element = document.createElement(elementName);
    if(attributes !== undefined){
      if (
        attributes.className && element.setAttribute("class", attributes.className),
        attributes.onclick && element.setAttribute("onclick", attributes.onclick),
        attributes.href && element.setAttribute("href", attributes.href),
        attributes.style && element.setAttribute("style", attributes.style),
        attributes.name && element.setAttribute("name", attributes.name),
        attributes.id && element.setAttribute("id", attributes.id),
        attributes.innerHTML && (element.innerHTML = attributes.innerHTML),
        element.value === "" && attributes.value && element.setAttribute("value", attributes.value),
        element.placeholder === "" && attributes.placeholder && element.setAttribute("placeholder", attributes.placeholder)
      );
      if(typeof attributes.appendChild == "object"){
        for(let i = 0; i < attributes.appendChild.length; i++){
          element.appendChild(attributes.appendChild[i]);
        }
      }
    }
    return element;
  },
  calculos:{
    converter:function(item){
      return item.toLocaleString('pt-BR', {minimumFractionDigits: 2,  maximumFractionDigits: 2, style: 'currency', currency: 'BRL'});
    },
    sobraDaRenda:function(calc){
      let resultado = 0;
      calc.forEach(calcItem => {
        let juros = this.jurosReais(calcItem);
        resultado += calcItem.parcelasPagas < calcItem.parcelas ? juros : 0;
      });
      return this.converter(config.renda - resultado);
    },
    dividaMensal:function(calc){
      let resultado = 0;
      calc.forEach(calcItem => {
        let juros = this.jurosReais(calcItem);
        resultado += calcItem.parcelasPagas < calcItem.parcelas ? juros : 0;
      });
      return this.converter(resultado);
    },
    dividaTotal:function(calc){
      let resultado = 0;
      calc.forEach(calcItem => {
        let juros = this.jurosReais(calcItem);
        resultado += calcItem.parcelasPagas > calcItem.parcelas ? 0 : juros * (calcItem.parcelas - calcItem.parcelasPagas);
      });
      return this.converter(resultado);
    },
    juros:function(calc){
      return calc.juros + "%";
    },
    jurosReais:function(item){
      let parcelas = item.valor / item.parcelas;
      let parcelasForamPagas = item.parcelas <= item.parcelasPagas;
      
      if(!parcelasForamPagas && ((item.ultimoMesPago < tools.data.mesNumero) || (item.ultimoAnoPago < tools.data.ano))){
        if(item.tipoDeJuros === 0){
          let ultimoDiaPago = new Date(item.ultimoMesPago+"/"+item.ultimoDiaPago+"/"+item.ultimoAnoPago);
          let diaAtual = new Date();
          let timeDiff = Math.abs(diaAtual.getTime() - ultimoDiaPago.getTime());
          let diasSemPagar = Math.ceil(timeDiff / (1000 * 3600 * 24));
          
          return item.juros > 0 ? parcelas + (parcelas * ((item.juros / 100) * diasSemPagar)) : parcelas;
        }else if(item.tipoDeJuros === 1){
          let mesesSemPagar = item.ultimoMesPago > tools.data.mesNumero ? item.vencimento < tools.data.dia ? (tools.data.mesNumero + 13) - (item.ultimoMesPago+1) : (tools.data.mesNumero + 12) - (item.ultimoMesPago+1) : (tools.data.mesNumero+1) - (item.ultimoMesPago+1);
          console.log(mesesSemPagar);
          return item.juros > 0 ? parcelas + (parcelas * ((item.juros / 100) * mesesSemPagar)) : parcelas;
        }
      }else{
        return parcelas;
      }
    }
  },
  data:{
    dia:new Date().getDate(),
    mes:function(soma){
      let meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
      if(!soma){
        return meses[new Date().getMonth()];
      }else{
        return meses[new Date().getMonth() + soma];
      }
    },
    mesNumero:new Date().getMonth(),
    ano:new Date().getFullYear()
  }
};
export {tools};
