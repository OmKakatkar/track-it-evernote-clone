// import React, { Component } from 'react'
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import debounce from "../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const EditorComponent = ({ selectedNote, classes, noteUpdate }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setTitle(selectedNote.title);
    setText(selectedNote.body);
    setId(selectedNote.id);
  }, [selectedNote]);

  const updateTitle = async (text) => {
    await setTitle(text);
    await update();
  };

  const updateBody = (val) => {
    setText(val);
    update();
  };

  const update = debounce(() => {
    noteUpdate(id, {
      title: title,
      body: text,
    });
  }, 1500);

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder="Enter note title..."
        value={title ? title : ""}
        onChange={(e) => updateTitle(e.target.value)}
      ></input>
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(EditorComponent);
