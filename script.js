const notesContainer = document.querySelector(".note-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('note');
}
showNotes();
function updateStorage() {
    localStorage.setItem("note",notesContainer.innerHTML);
}

createBtn.addEventListener('click',function(){
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.setAttribute("inputmode","text");

    img.src = "images/delete.png";
    img.setAttribute("type","button");
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();
});

notesContainer.addEventListener("click",function (e){
    // if(e.target.tagName === "IMG"){
    //     e.target.closest("p").remove();
    //     updateStorage();
        if (e.target.tagName === "IMG") {
            e.preventDefault();
            const p = e.target.closest("p");
        if (!p) return;

            p.classList.add("removing"); // 애니메이션 시작

    // 애니메이션 끝난 뒤 삭제
            setTimeout(() => {
                p.remove();
                updateStorage(); // 상태 저장
    }, 300); // CSS에서 설정한 transition 시간과 같아야 함
    
    }else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box")
        notes.forEach(function (nt){
            nt.onkeyup = function () {
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})



