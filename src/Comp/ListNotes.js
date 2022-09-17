import { useContext, useState } from "react";
import { AppContext } from "../JS/AppContext";
import EditModal from "./EditModal";

const ListNote = () => {
  const { noteState, setNoteState } = useContext(AppContext);
  let [isOpen, setIsOpen] = useState(false);
  const [noteId, setNoteId] = useState();

  const handleDelete = (id) => {
    const removeNoteToDelete = noteState.filter((value) => {
      return value.id !== id;
    });
    setNoteState(removeNoteToDelete);
  };

  const handleEdit = (id) => {
    setNoteId(id);
    setIsOpen(!isOpen);
  };

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
                <button type="button" onClick={() => handleEdit(note.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(note.id)}>
                  Delete
                </button>
              </li>
            ))
          : null}
      </ul>

      <EditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        noteId={noteId}
        noteState={noteState}
        setNoteState={setNoteState}
      />
    </div>
  );
};

export default ListNote;
