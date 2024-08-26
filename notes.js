document.getElementById('saveNoteButton').addEventListener('click', saveNote);

function saveNote() {
    const noteText = document.getElementById('transcript').value; // Changed to match the id 'transcript'
    if (noteText.trim()) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        document.getElementById('transcript').value = ''; // Clear the textarea after saving
    }
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            ${note}
            <span class="deleteButton" onclick="deleteNote(${index})">x</span>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

document.addEventListener('DOMContentLoaded', displayNotes);
