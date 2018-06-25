import { initializedEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from './notes'

const noteId = location.hash.substring(1)
const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

initializedEditPage(noteId)

noteTitle.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

noteBody.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

removeElement.addEventListener('click', () => {
    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializedEditPage(noteId)
    } 
})
