// for navigation bar
const openBtn = document.querySelector(".open-img");
const closeBtn = document.querySelector(".close-img");
const closeNav = document.querySelector(".close");
openBtn.addEventListener('click',()=>{
    closeNav.style.display = "flex"
})
closeBtn.addEventListener('click',()=>{
    closeNav.style.display = "none"
})

//for showing/hiding text
const displayMoreBtn =document.querySelectorAll(".showTxt");
const displayLessBtn =document.querySelectorAll(".hideTxt");
const displayMInfo = document.querySelectorAll(".extra");

displayMoreBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        displayMInfo[index].style.display = "block";
        displayLessBtn[index].style.display = "inline";
        btn.style.display = "none";
    });
});
displayLessBtn.forEach((btn,index) =>{
    btn.addEventListener("click", ()=>{
        displayMInfo[index].style.display="none";
        btn.style.display="none"
        displayMoreBtn[index].style.display="inline"
    });
});