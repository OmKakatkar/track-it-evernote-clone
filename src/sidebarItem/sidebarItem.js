import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helper";

const SidebarItemComponent = (props) => {
  const {classes} = props
  const selectNote = (n, i) => {
    props.selectNote(n, i);
  };

  const deleteNote = (n) => {
    if (window.confirm(`Are you sure you want to delete ${n.title}`)) {
      props.deleteNote(n);
    }
  };

  return (
    <div key={props.index}>
      <ListItem
        className={classes.listItem}
        selected={props.selectedNoteIndex === props.index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => selectNote(props.note, props.index)}
        >
          <ListItemText
            primary={props.note.title}
            secondary={
              removeHTMLTags(props.note.body.substring(0, 30)) + "..."
            }
          ></ListItemText>
        </div>
        <DeleteIcon
          onClick={() => deleteNote(props.note)}
          className={classes.deleteIcon}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SidebarItemComponent);
