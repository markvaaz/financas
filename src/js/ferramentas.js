function create(elementName, attributes){
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
}
export {create}