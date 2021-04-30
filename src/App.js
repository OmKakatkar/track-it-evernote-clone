import React, { useState, useEffect } from "react";
import "./App.css";
import Editor from "./components/Editor/Editor";
import Sidebar from "./components/Sidebar/Sidebar";
import { projectFirestore } from "./firebaseConfig";

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("notes")
      // .orderBy("createdAt")
      .onSnapshot((snap) => {
        const notes = snap.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(notes);
        setNotes(notes);
      });
    return () => unsub();
  }, []);

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
    console.log("Selected "+selectedNote+" "+selectedNoteIndex);
  };
  const deleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete ${note.title}`)) {
      console.log("Deleted " + note.title);
    }
  };
  const newNote = () => {
    console.log("Created");
  };

  const noteUpdate = (id, noteObj) => {
    console.log(id,noteObj);
  }

  return (
    <div className="App">
      <Sidebar
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
      />
      {
        selectedNote && <Editor
        selectedNote={selectedNote}
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        noteUpdate={noteUpdate}
      ></Editor>
      }
    </div>
  );
}

export default App;
