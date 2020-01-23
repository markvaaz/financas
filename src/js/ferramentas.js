// import será substituido por HTTP request
import {config as config} from "./server/config.js";
let functionData = new Date();
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
    sobraDaRenda:function(calc){
      let resultado = 0
      for(let i = 0; i < calc.length; i++){ 
        if(calc[i].parcelas > calc[i].parcelasPagas){
          resultado += calc[i].valor / calc[i].parcelas;
        }
      }
      return this.calculos.converter((config.renda - resultado) + config.rendaExtra);
    },
    dividaMensal:function(calc){
      let resultado = 0
      for(let i = 0; i < calc.length; i++) resultado += calc[i].valor / calc[i].parcelas;
      return this.calculos.converter(resultado);
    },
    dividaTotal:function(calc){
      let resultado = 0;
      for(let i = 0; i < calc.length; i++) resultado += calc[i].valor - ((calc[i].valor / calc[i].parcelas) * calc[i].parcelasPagas);
      return this.calculos.converter(resultado);
    },
    juros:function(item){
      let parcelas = item.valor / item.parcelas;
      return this.calculos.converter((parcelas * (item.juros / 100)).toFixed(2))
    },
    converter:function(item){
      return item.toLocaleString('pt-BR', {minimumFractionDigits: 2,  maximumFractionDigits: 2, style: 'currency', currency: 'BRL'});
    }
  },
  data:{
    dia:functionData.getDate(),
    mes:function(soma){
      let meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
      if(!soma){
        return meses[functionData.getMonth()];
      }else{
        return meses[functionData.getMonth() + soma];
      }
    },
    ano:functionData.getFullYear()
  }
}
export {tools};