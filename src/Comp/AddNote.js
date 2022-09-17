import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../JS/AppContext";
import NoteDesc from "./NoteDesc";
import NoteContent from "./NoteContent";
import NoteTags from "./NoteTags";

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
        <NoteDesc desc={desc} setDesc={setDesc} />
        <NoteContent note={note} setNote={setNote} />
        <NoteTags tags={tags} setTags={setTags} />
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
