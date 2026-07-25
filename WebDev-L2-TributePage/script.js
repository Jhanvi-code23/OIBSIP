//Scroll Progress Bar

window.addEventListener("scroll",()=>{
    const scrollTop=document.documentElement.scrollTop;
    const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    const progress=(scrollTop/scrollHeight)*100;
    document.getElementById("progress-bar").style.width=progress+'%';
}); 

const buttons=document.querySelectorAll(".readMore");

const overlay=document.querySelector(".popup-overlay");

const popupImage=document.getElementById("popupImage");

const popupTitle=document.getElementById("popupTitle");

const popupYear=document.getElementById("popupYear");

const popupText=document.getElementById("popupText");

const close=document.querySelector(".close-popup");


buttons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        popupTitle.textContent=button.dataset.title;

        popupYear.textContent=button.dataset.year;

        popupImage.src=button.dataset.image;

        popupText.textContent=button.dataset.description;

        overlay.classList.add("show");

        document.body.style.overflow="hidden";

    });

});


close.addEventListener("click",()=>{

    overlay.classList.remove("show");

    document.body.style.overflow="auto";

});


overlay.addEventListener("click",(e)=>{

    if(e.target===overlay){

        overlay.classList.remove("show");

        document.body.style.overflow="auto";

    }

});


document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        overlay.classList.remove("show");

        document.body.style.overflow="auto";

    }

});