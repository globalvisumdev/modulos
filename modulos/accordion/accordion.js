
function accordionActions(){
  const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");
      
  accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {
      
      // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
      
      const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
      if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
        currentlyActiveAccordionItemHeader.classList.toggle("active");
        currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        currentlyActiveAccordionItemHeader.nextElementSibling.classList.toggle("activeBody");
      }
  
      accordionItemHeader.classList.toggle("active");
      
      const accordionItemBody = accordionItemHeader.nextElementSibling;
      
      accordionItemBody.classList.toggle("activeBody");
      if(accordionItemHeader.classList.contains("active")) {
        accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
      }
      else {
        accordionItemBody.style.maxHeight = 0;
      }
      
    });
  });
}

function crearAcordionItem(titulo, iconoTitulo, contenido){

  let item = document.createElement("div");
  item.classList.add("accordion-item");

  let itemHeader = document.createElement("div");
  itemHeader.classList.add("accordion-item-header");
  
  let icono = document.createElement("i");
  icono.classList.add("fa-solid");
  icono.classList.add(iconoTitulo);
  itemHeader.appendChild(icono);
  
  let tituloHeader = document.createElement("div");
  tituloHeader.classList.add("tituloHeader")
  tituloHeader.innerHTML = titulo;
  itemHeader.appendChild(tituloHeader);

  let itemBody = document.createElement("div");
  itemBody.classList.add("accordion-item-body");

  let itemBodyContent = document.createElement("div");
  itemBodyContent.classList.add("accordion-item-body-content");
  itemBodyContent.appendChild(contenido);
  itemBody.appendChild(itemBodyContent);

  let divIconoOpen = document.createElement("div");
  divIconoOpen.classList.add("icono")
  divIconoOpen.setAttribute("id", "first");
  let iconoOpen = document.createElement("i");
  iconoOpen.classList.add("fa-solid");
  iconoOpen.classList.add("fa-minus");

  let divIconoOpen2 = document.createElement("div");
  divIconoOpen2.classList.add("icono")
  divIconoOpen2.setAttribute("id", "second");
  let iconoOpen2 = document.createElement("i");
  iconoOpen2.classList.add("fa-solid");
  iconoOpen2.classList.add("fa-minus");

  divIconoOpen.appendChild(iconoOpen)
  divIconoOpen2.appendChild(iconoOpen2)
  itemHeader.appendChild(divIconoOpen)
  itemHeader.appendChild(divIconoOpen2)




  item.appendChild(itemHeader);
  item.appendChild(itemBody);

  return item;

}
