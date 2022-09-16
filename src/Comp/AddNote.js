import { useContext, useState } from "react";
import { AppContext } from "../JS/AppContext";
import { v4 as uuidv4 } from "uuid";

const AddNote = () => {
  const { noteState, setNoteState } = useContext(AppContext);
  const [desc, setDesc] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();

    if (!noteState) {
      setNoteState([
        {
          id: uuidv4(),
          desc,
          note,
          tags,
        },
      ]);
    } else {
      setNoteState((prev) => [
        ...prev,
        {
          id: uuidv4(),
          desc,
          note,
          tags,
        },
      ]);
    }

    setDesc("");
    setNote("");
    setTags("");
  };

  return (
    <div className="add-note">
      <h2 className="text-center">Add Note</h2>
      <form>
        <div className="note-desc my-4">
          <label
            htmlFor="price"
            className="block text-base w-1/4 text-gray-700"
          >
            Note description
          </label>
          <input
            type="text"
            name="noteDesc"
            id="noteDesc"
            className="block w-1/4 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base "
            placeholder="Note Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className="note-content my-4">
          <label
            htmlFor="price"
            className="block text-base w-1/4 text-gray-700"
          >
            Note content
          </label>
          <input
            type="text"
            name="noteContent"
            id="noteContent"
            className="block w-1/4 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base "
            placeholder="Note Description"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
        </div>
        <div className="note-tag my-4">
          <label
            htmlFor="price"
            className="block text-base w-1/4 text-gray-700"
          >
            Note Tag
          </label>
          <input
            type="text"
            name="noteTag"
            id="noteTag"
            className="block w-1/4 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base "
            placeholder="Note Description"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-zinc-500 text-white text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          value="submit"
          onClick={(e) => handleAddNote(e)}
        >
          Add note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
