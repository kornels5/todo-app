'use strict'

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

if (!note) {
    location.assign('/index.html')
}

noteTitle.value = note.title
noteBody.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

noteTitle.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

noteBody.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)    
    } 
    
    if (!note) {
        location.assign('/index.html')
    }
    
    noteTitle.value = note.title
    noteBody.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)

})