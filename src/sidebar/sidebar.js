// import React, { Component } from 'react'
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebarItem/sidebarItem";

const SidebarComponent = (props) => {
  const { classes } = props;
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    setTitle(null);
    setAddingNote(!addingNote);
  };

  const updateTitle = (text) => {
    setTitle(text);
  };

  const newNote = () => {
    props.newNote(title);
    setTitle(null);
    setAddingNote(false);
  };

  const selectNote = (note, index) => {
    props.selectNote(note, index);
  };

  const deleteNote = (note) => {
    props.deleteNote(note);
  };

  if (props.notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={newNoteBtnClick} className={addingNote ? classes.newNoteCancelBtn :classes.newNoteBtn}>
          {addingNote ? "Cancel" : "Add Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              className={classes.newNoteInput}
              type="text"
              placeholder="Please Enter the title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        {console.log(props.notes)}
        <List>
          {props.notes.map((note, index) => {
            return (
              <div key={index}>
                <SidebarItemComponent
                  note={note}
                  index={index}
                  selectedNoteIndex={props.selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={deleteNote}
                ></SidebarItemComponent>
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default withStyles(styles)(SidebarComponent);
