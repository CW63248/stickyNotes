const addNote = document.querySelector(".addNote");
const containerEl = document.querySelector(".container");
const deletenotesEl = document.querySelector(".deleteNotes");
const savedNotes = [];

// when page loads run getNoteStorage, if there are notes stored, push them to the array
document.addEventListener("DOMContentLoaded", function () {
    const returnedNotes = getNoteStorage();
    if (returnedNotes) {
        savedNotes.push(...returnedNotes);
        showSavedNotes();
    }
});


// retrieves the sticky notes from Local Storage and parses them as a JSON array
function getNoteStorage() {
    const returnedNotes = JSON.parse(localStorage.getItem("stickyNotes"))
    return returnedNotes
}

// runs addSticky function when add button is clicked 
addNote.addEventListener("click", function () {
    addSticky()
})


// show note elements with saved note content 
function showSavedNotes() {
    savedNotes.forEach(noteContent => {
        // create sticky note
        const stickyEl = document.createElement("div");
        stickyEl.classList.add("stickyNote");
        containerEl.appendChild(stickyEl);
        // create text area
        const textEl = document.createElement("textarea");
        textEl.classList.add("noteText");
        // Set the content of the text area
        textEl.value = noteContent;
        // add it inside the note element
        stickyEl.appendChild(textEl);
    });
}




// creates a new sticky note and text area and runs savenotes function 
function addSticky() {
    // create sticky note 
    const stickyEl = document.createElement("div");
    stickyEl.classList.add("stickyNote");
    containerEl.appendChild(stickyEl);
    // create text area 
    const textEl = document.createElement("textarea");
    textEl.classList.add("noteText");
    // add it inside the note element
    stickyEl.appendChild(textEl);
    // runs saveNotes function when text is entered 
    textEl.addEventListener("input", (event) => {
        saveNotes()
    });
}

// saves notes to local storage 
function saveNotes() {
    console.log("saveNotesrun")
    // get all elements with a class of notetext 
    const textAreas = document.querySelectorAll(".noteText");
    // Clear the array before adding new content
    savedNotes.length = 0;
    // add the new text to the savedNotes array 
    textAreas.forEach(textEl => {
        savedNotes.push(textEl.value);
    });
    // stringify and add to local storage 
    localStorage.setItem("stickyNotes", JSON.stringify(savedNotes));
}



// delete the last note from the array and update local storage
function deleteLastNote() {
    // Remove the last note from the array
    savedNotes.pop();
    // get all elements with a class of stickyNote 
    const stickyNotes = document.querySelectorAll(".stickyNote");
    // remove Element 
    containerEl.removeChild(stickyNotes[stickyNotes.length - 1]);
    // Update local storage
    saveNotes();
}

// run deleteLastNote if button is clicked 
deletenotesEl.addEventListener("click", deleteLastNote);






