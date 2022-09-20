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
          {/* <h1 className="text-center mb-5">List Note</h1> */}
          <ul className="block md:flex md:flex-wrap md:justify-evenly">
            {noteState.length
              ? noteState.map((note, index) => (
                  <li
                    key={note.id}
                    className="w-full md:w-1/4 shadow-lg mr-5 mb-10 bg-white rounded-lg p-5"
                  >
                    <div
                      className="note-content"
                      onClick={() => handleShowModal(note.id)}
                    >
                      <p className="text-center">{note.desc}</p>
                      <p className="text-center">{note.note}</p>
                      <p className="text-center">{note.tags}</p>
                    </div>
                    <div className="text-center">
                      <button
                        className="mt-4 bg-gray-500 text-white text-base px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleEdit(note.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="mt-4 bg-red-500 text-white text-base px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleDelete(note.id)}
                      >
                        Delete
                      </button>
                    </div>
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
