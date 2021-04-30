import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import debounce from "../../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const Editor = ({
  classes,
  selectedNote,
  selectedNoteIndex,
  notes,
  noteUpdate,
}) => {
  const { titleInput, editIcon, editorContainer } = classes;

  const [noteData, setNoteData] = useState({
    text: "",
    title: "",
    id: "",
  });

  useEffect(() => {
    setNoteData({
      text: selectedNote.body,
      title: selectedNote.title,
      id: selectedNote.id,
    });
  }, [selectedNote]);

  const updateBody = (val) => {
    setNoteData({ ...noteData, text: val });
    update();
  };

  // const update = debounce(() => {
  //   console.log("Updating Firebase");
  //   // Come back here
  // }, 1500);
  
  const update = useRef(
      debounce(() => {
          console.log("updating database!");
          noteUpdate(noteData.id, {
            title: noteData.title,
            body: noteData.body,
          });
        }, 1500)
  ).current;

  return (
    <div className={editorContainer}>
      <ReactQuill value={noteData.text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);
