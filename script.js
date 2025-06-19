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
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();
});

notesContainer.addEventListener("click",function (e){
    if(e.target.tagName === "IMG"){
        e.target.closest("p").remove();
        updateStorage();
    }else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box")
        notes.forEach(function (nt){
            nt.onkeyup = function () {
                updateStorage();
            }
        })

    }
})

// document.addEventListener("keydown",function(event){
//     if(event.key === "Enter"){
//         document.execCommand("insertLineBreak");
//         event.preventDefault();
//     }
// })

notes.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
    event.preventDefault();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // 줄바꿈 요소(<br>)를 생성하고 삽입
    const br = document.createElement("br");
    range.deleteContents();
    range.insertNode(br);

    // 커서를 새 줄 뒤에 놓기 위해 새로운 range 설정
    range.setStartAfter(br);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    }
});