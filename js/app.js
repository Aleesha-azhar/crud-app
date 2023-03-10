let addNotesContainer = document.getElementById('addNoteContainer');
function showAllNotes(){
    addNotesContainer.style.display= "none";

    let allNotes;
    let notes = localStorage.getItem("notes");
    if(notes == null){
        allNotes = []
    }
    else{
        allNotes = JSON.parse(notes)
    }
     let notesContainer = document.getElementById('notes');

    notesContainer.innerHTML = '';

    allNotes.forEach(function(note, index){
        noteToBeShown = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${note.title}</h5>
           <p class="card-text">${note.descp}</p>
            <button class="btn btn-primary card_btns" onclick="deleteNotes(${index})">Delete</button>
            <button class="btn btn-primary card_btns" onclick="editNotes(${index})">Update</button>
        </div>
      </div>
     `
  notesContainer.innerHTML += noteToBeShown
     
   });


}

showAllNotes();


let addNoteBtn = document.getElementById('addNote');
addNoteBtn.addEventListener("click", function(){
    let allNotes;
    let notes = localStorage.getItem("notes");
    if(notes == null){
        allNotes = []
    }
    else{
        allNotes = JSON.parse(notes)
    }
    let title = document.getElementById('title');
    let descp = document.getElementById('descp');

 let newNoteObj = {
    title : title.value,
    descp : descp.value
}
if(addNoteBtn.innerText == "Update Note")
{
   let editCard = document.querySelector('.card')
   let editIndex = editCard.getAttribute('editIndex')
   allNotes[editIndex] =newNoteObj;
}
else{
    allNotes.push(newNoteObj);
}

localStorage.setItem("notes", JSON.stringify(allNotes))
title.value = '';
descp.value = '';
showAllNotes();

})

let navAddNoteBtn = document.getElementById('navAddNote')
navAddNoteBtn.addEventListener("click", function(){
    addNotesContainer.style.display = "block";
    addNoteBtn.innerText = 'Save'
})


function deleteNotes(noteIndex){
    let allNotes = JSON.parse(localStorage.getItem("notes"));
    allNotes.splice(noteIndex, 1)
    localStorage.setItem("notes", JSON.stringify(allNotes))
    showAllNotes();
}

function editNotes(noteIndex){
    let allNotes = JSON.parse(localStorage.getItem("notes"));
    addNotesContainer.style.display = "block";
    addNoteBtn.innerText = "Update Note"
    let title = document.getElementById('title');
    let descp = document.getElementById('descp');
    title.value = allNotes[noteIndex].title
    descp.value = allNotes[noteIndex].descp
    let editCard = document.querySelector('.card')
    editCard.setAttribute('editIndex', `${noteIndex}`)
    console.log(editCard);


}