var contentScrollStatus = {}

function loadContentScroll(idContainer,classElement, functionCallBack){
    let container = document.getElementById(idContainer);
    contentScrollStatus[idContainer] = true;

    let offset = container.querySelectorAll(`.${classElement}`).length

    
    if (offset == 0) {
        
        container.addEventListener("scroll", async() =>{
            let myScrollTop = container.scrollTop;
            let myScrollHeight = container.scrollHeight;
            let diff = myScrollHeight - myScrollTop;
            let height = container.clientHeight;
            let offPageHeight = 150;

            
            if (diff < (height + offPageHeight) && contentScrollStatus[idContainer] ) {

                container.innerHTML += `<div class="containerLoaderScrollBottom"><span class="loaderScrollBottom"></span></div>`;
                offset = container.querySelectorAll(`.${classElement}`).length
                contentScrollStatus[idContainer] = false;

                let moreRegister = await functionCallBack(offset);
                contentScrollStatus[idContainer] =  moreRegister;
                container.querySelector(".containerLoaderScrollBottom").remove();


            }
        });
    }
}