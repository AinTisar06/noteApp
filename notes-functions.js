
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJson = localStorage.getItem("notes");

  if(notesJson !== null) {
    return JSON.parse(notesJson);
  } else {
    return [];
  } 
}

// Save Notes to localStorage
const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Remove a note from the list
const removeNote = id => {
  const noteIndex = notes.findIndex(note => {
    return note.id === id;
  })
  if(noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
}

// Generate the DOM structure for a note
const generateNoteDOM = note => {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("span");
  const button = document.createElement("button");

  // Setup the remove note button
  button.textContent = "x";
  noteEl.appendChild(button);
  button.addEventListener("click", () => {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  })

  // Setup the note title text
  if(note.title.lenght > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  
  noteEl.appendChild(textEl);
  return noteEl;
}

// Render Notes
const renderNotes = (notes, filters) => {
  const noteContainer = document.querySelector("#notes");
  const filteredNotes = notes.filter(item => {
    return item.title.toLowerCase().includes(filters.searchText.toLowerCase());
  })
  
  noteContainer.innerHTML = "";
  
  filteredNotes.forEach(item => {
    const noteEl = generateNoteDOM(item);
    noteContainer.appendChild(noteEl);
  })
}
