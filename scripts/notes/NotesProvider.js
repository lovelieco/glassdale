// hold array of notes.
// get all of the notes from DB
//add new notes to DB
let notes = [];

const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")

    eventHub.dispatchEvent(noteStateChangedEvent)
}

export const getNotes = () => {
    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })

}

export const useNotes = () =>{
    return notes.slice();
}

export const saveNote = noteObj => {
	return fetch(`http://localhost:8088/notes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(noteObj)
	})
    .then( () =>{
        return getNotes()
    })
.then(dispatchStateChangeEvent)
}

export const deleteNote = noteId => {
    return fetch (`http://localhost:8088/notes/${noteId}`,{
        method: "DELETE"
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}

