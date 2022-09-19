import { useContext, useState } from "react";
import { AppContext } from "../JS/AppContext";
import EditModal from "./EditModal";
import ShowModal from "./ShowModal";

const ListNote = () => {
  const { noteState, setNoteState } = useContext(AppContext);
  let [editModalIsOpen, setEditModalIsOpen] = useState(false);
  let [showModalIsOpen, setShowModalIsOpen] = useState(false);
  const [noteId, setNoteId] = useState();
  const [showNoteData, setShowNoteData] = useState();
  const [editNoteData, setEditNoteData] = useState();

  const handleDelete = (id) => {
    const removeNoteToDelete = noteState.filter((value) => {
      return value.id !== id;
    });
    setNoteState(removeNoteToDelete);
  };

  const handleEdit = (id) => {
    const noteToEdit = noteState.filter((value) => {
      return value.id === id;
    });
    setEditNoteData(noteToEdit);
    setNoteId(id);
    setEditModalIsOpen(!editModalIsOpen);
  };

  const handleShowModal = (id) => {
    const noteToShow = noteState.filter((value) => {
      return value.id === id;
    });
    setShowNoteData(noteToShow);
    setShowModalIsOpen(!showModalIsOpen);
  };

  return (
    <>
      {!noteState ? (
        <p>No Note's</p>
      ) : (
        <div className="mt-10">
          <h1 className="text-center">List Note</h1>
          <ul className="flex">
            {noteState.length
              ? noteState.map((note, index) => (
                  <li key={note.id} className="w-1/4">
                    <div
                      className="note-content"
                      onClick={() => handleShowModal(note.id)}
                    >
                      <p>description: {note.desc}</p>
                      <p>content: {note.note}</p>
                      <p>tags: {note.tags}</p>
                    </div>
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
          <ShowModal
            isOpen={showModalIsOpen}
            setIsOpen={setShowModalIsOpen}
            showNoteData={showNoteData}
          />
          <EditModal
            isOpen={editModalIsOpen}
            setIsOpen={setEditModalIsOpen}
            noteId={noteId}
          />
        </div>
      )}
    </>
  );
};

export default ListNote;
