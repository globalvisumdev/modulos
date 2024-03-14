

 document.addEventListener("click",function (e){
   if(e.target.classList.contains("gallery-item")){
   	  const src = e.target.getAttribute("src");
   	  document.querySelector(".modal-img").src = src;

	  let divid = e.target.getAttribute("divid");
	  let modulo = e.target.getAttribute("modulo");
	  document.querySelector("#btnDeleteModal").setAttribute("onclick",`deleteDiv('${divid}','${modulo}')`)

   	  const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
   	  myModal.show();
   }
   if(document.querySelector(".modal-backdrop")){
	document.querySelector(".modal-backdrop").classList.remove("modal-backdrop");
   }
 })
