import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../JS/AppContext";
import InputGroup from "./InputGroup";
import NoteDesc from "./NoteDesc";
import NoteContent from "./NoteContent";
import NoteTags from "./NoteTags";

const AddNote = () => {
  const { noteState, setNoteState } = useContext(AppContext);
  const [desc, setDesc] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");

  // const enableButton =
  //   Boolean(desc) && Boolean(note) && Boolean(tags) ? "enable" : "disable";
  // const enableButton = Boolean(desc) && Boolean(note) && Boolean(tags);
  const enableButton = !!desc && !!note && !!tags; //return as boolean value

  const handleAddNote = (e) => {
    e.preventDefault();

    if (!noteState && desc && note && tags) {
      setNoteState([
        {
          id: uuidv4(),
          desc,
          note,
          tags,
        },
      ]);
    }

    if (noteState && desc && note && tags) {
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
    <div className="add-note text-center mt-10">
      {/* <h2 className="text-center">Add Note</h2> */}
      <form>
        <div className="block md:flex justify-center">
          <InputGroup state={desc} setState={setDesc} field="desc" />
          <InputGroup state={note} setState={setNote} field="note" />
          <InputGroup state={tags} setState={setTags} field="tags" />
          {/* <NoteDesc desc={desc} setDesc={setDesc} />
          <NoteContent note={note} setNote={setNote} />
          <NoteTags tags={tags} setTags={setTags} /> */}
        </div>
        <button
          disabled={!enableButton}
          className="mt-4 bg-blue-500 text-white text-base px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
