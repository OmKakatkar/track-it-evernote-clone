import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../../helpers";

const SidebarItem = ({
  classes,
  index,
  note,
  selectedNoteIndex,
  deleteNote,
  selectNote,
  newNote,
}) => {
  const { listItem, textSection, deleteIcon } = classes;

  return (
    <div key={index}>
      <ListItem
        className={listItem}
        selected={selectedNoteIndex === index}
        alignItems="flex-start"
      >
        <div className={textSection} onClick={() => selectNote(note, index)}>
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30) + "...")}
          ></ListItemText>
        </div>
        <DeleteIcon
          onClick={() => deleteNote(note)}
          className={deleteIcon}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SidebarItem);
