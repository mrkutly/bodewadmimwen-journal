import React from "react";
import { TextArea, TextInput } from "waskode";

const NoteInput = ({ note, idx, updateNote }) => (
  <>
    <TextInput
      label="Note title"
      name="note-title"
      value={note.title}
      onChange={(e) => updateNote("title", e.target.value, idx)}
      validationError={!note.title ? "Required" : null}
    />
    <TextArea
      label="Note content"
      name="note-content"
      value={note.content}
      onChange={(e) => updateNote("content", e.target.value, idx)}
      validationError={!note.content ? "Required" : null}
    />
  </>
);

export default NoteInput;
