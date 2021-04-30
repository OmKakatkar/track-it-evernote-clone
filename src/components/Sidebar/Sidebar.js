import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../SidebarItem/SidebarItem";

const Sidebar = ({
  classes,
  notes,
  selectedNoteIndex,
  deleteNote,
  selectNote,
  newNote,
}) => {
  const [addNote, setAddNote] = useState({
    addingNote: false,
    title: null,
  });

  const {
    newChatBtn,
    unreadMessage,
    newNoteBtn,
    sidebarContainer,
    newNoteInput,
    newNoteSubmitBtn,
  } = classes;

  const newNoteBtnClick = () => {
    console.log("Clicked");
    setAddNote({ ...addNote, addingNote: !addNote.addingNote });
  };

  const updateTitle = (txt) => {
    // console.log("Clicked Again");
    setAddNote({ ...addNote, title: txt });
  };

  const newNoteSubmitClick = () => {
    console.log("Click me more Senpai " + addNote.title);
  };

  return (
    <div className={sidebarContainer}>
      <Button className={newNoteBtn} onClick={newNoteBtnClick}>
        {addNote.addingNote ? "Cancel" : "Add Note"}
      </Button>
      {addNote.addingNote && (
        <div>
          <input
            type="text"
            className={newNoteInput}
            placeholder="Enter Note Title"
            onKeyUp={(e) => updateTitle(e.target.value)}
          ></input>
          <Button className={newNoteSubmitBtn} onClick={newNoteSubmitClick}>
            Submit
          </Button>
        </div>
      )}
      <List>
        {notes.map((note, index) => {
          return (
            <div key={index}>
              <SidebarItem
                note={note}
                index={index}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={selectNote}
                deleteNote={deleteNote}
                newNote={newNote}
              ></SidebarItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
