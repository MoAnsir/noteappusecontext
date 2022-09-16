import { useContext, useState } from "react";
import { AppContext } from "../JS/AppContext";
import { v4 as uuidv4 } from "uuid";

const ListNote = () => {
  const { noteState, setNoteState } = useContext(AppContext);

  return (
    <div>
      <h1>List Note</h1>
      <ul>
        {noteState.length
          ? noteState.map((note, index) => (
              <li key={note.id}>
                <p>description: {note.desc}</p>
                <p>content: {note.note}</p>
                <p>tags: {note.tags}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default ListNote;
