let load = {
  resumo:function(){
    let rl = document.getElementById("rl");
    let sm = document.getElementById("sm");
    let dm = document.getElementById("dm");
    let dt = document.getElementById("dt");
    
    rl.innerHTML = calculos.converter(config.renda);
    sm.innerHTML = calculos.salario();
    dm.innerHTML = calculos.dividaMensal();
    dt.innerHTML = calculos.divida();
  },
  cards:function(){
    
  }
}