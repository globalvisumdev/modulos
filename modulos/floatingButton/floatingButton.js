function actionToggle(){
    var action = document.querySelector(".actionFB");
    action.classList.toggle("active")
}

var scrollPos = 0;
const floatingButton = document.getElementById("floatingButton");


document.addEventListener("mouseup", function(event) {
  var action = document.querySelector(".actionFB");
  if (!floatingButton.contains(event.target) && action.classList.contains("active")) {
    actionToggle()
  }

});

window.addEventListener('scroll', function(){

  // ARRIBA
  if ((document.body.getBoundingClientRect()).top > scrollPos){
    if(floatingButton.classList.contains("hidden")){
        floatingButton.classList.remove("animate__zoomOut");
        floatingButton.classList.remove("hidden");
        floatingButton.classList.add("animate__zoomIn");
    }
  }
  // ABAJO
  else{
    if(!floatingButton.classList.contains("hidden")){
      floatingButton.classList.remove("animate__zoomIn");
      floatingButton.classList.add("animate__zoomOut");
      setTimeout(()=>{
        floatingButton.classList.add("hidden");
      }, 500);
    }
  }
  scrollPos = (document.body.getBoundingClientRect()).top;
  
});

function actionToggleActionMenu(idMenu){
  var action = document.getElementById(idMenu);
  action.classList.toggle("active") ;

  var activeMenu = document.querySelectorAll("#bodyTable .active")
  activeMenu.forEach(menu =>{
    if (menu.id != idMenu) {
      menu.classList.remove("active");
    }
  } );

  document.addEventListener("mouseup", function(event) {
  
    if (!action.contains(event.target) ) {
      action.classList.remove("active");
    }
  });

 
}
