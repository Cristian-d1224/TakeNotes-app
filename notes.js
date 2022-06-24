const fs = require('fs')


const removeNote = (title) => {
    const notes = loadsNotes()
    const updateNotes = notes.filter(note => note.title !== title)

    if(notes.length > updateNotes.length){
        console.log("Note removed!")
        savedNotes(updateNotes)
    }else{
        console.log('No note found')
    }

}

const addNote = (title, body) => {
    const notes = loadsNotes() // --> []
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })

        savedNotes(notes)
        console.log('New note added!')
    }else{
        console.log("Note title taken")
    }


}

const savedNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadsNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        return []
    }
}

const listNotes = () => {
    const notes = loadsNotes()
    console.log('Your notes are...')
    notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {

    const notes = loadsNotes()
    const note = notes.find(note => note.title === title)


    if(note){
        console.log('Title: ' + note.title)
        console.log('Body: ' + note.body)
    }else{
        console.log('No note found')
    }
}

module.exports = {

    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}