function buttonProgress(){
  const buttonProgress = document.querySelector(".buttonProgress");
  buttonProgress.classList.add("active");
  setTimeout(()=>{
    buttonProgress.classList.remove("active");
    buttonProgress.querySelector("i").classList.replace("bx-cloud-download", "bx-check-circle")
    buttonProgress.querySelector("span").innerText = "Completado";
  },4000);
}
