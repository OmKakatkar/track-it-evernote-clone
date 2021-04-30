import React, { useState, useEffect } from "react";

import "./App.css";

import EditorComponent from "./editor/editor";
import SidebarComponent from "./sidebar/sidebar";
import { timeStamp, fireStore } from "./firebase/config";

const App = () => {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fireStore.collection("notes")
    .orderBy('timestamp','desc')
    .onSnapshot((snap) => {
      const notes = snap.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      setNotes(notes);
    });
  }, []);

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
  };

  const noteUpdate = (id, noteObject) => {
    if (id) {
      fireStore.collection("notes").doc(id).update({
        title: noteObject.title,
        body: noteObject.body,
        timestamp: timeStamp,
      });
    }
  };

  const newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };

    const newFromDB = await fireStore.collection("notes").add({
      title: note.title,
      body: note.body,
      timestamp: timeStamp,
    });

    const newID = newFromDB.id;
    await setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(
      notes.filter((_note) => _note.id === newID)[0]
    );
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  };

  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter((_note) => _note !== note));
    if (selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1
        ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
        : setSelectedNoteIndex(null);
      setSelectedNote(null);
    }

    fireStore.collection("notes").doc(note.id).delete();
  };

  return (
    <div className="app-container">
      <SidebarComponent
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
      ></SidebarComponent>
      {selectedNote && (
        <EditorComponent
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        ></EditorComponent>
      )}
    </div>
  );
};

export default App;
