import AddNote from "./Comp/AddNote";
import ListNotes from "./Comp/ListNotes";
import EditNotes from "./Comp/EditModal";
import { initialData, AppContext } from "./JS/AppContext";
import { useState, useEffect } from "react";
import { get, set } from "idb-keyval";
import { v4 as uuidv4 } from "uuid";
import "./CSS/App.css";

const App = () => {
  const [noteState, setNoteState] = useState();
  console.log("🚀 ~ file: App.js ~ line 12 ~ App ~ noteState", noteState);

  return (
    <AppContext.Provider value={{ noteState, setNoteState }}>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <h1 className="text-center text-6xl font-normal leading-normal mt-0 mb-2">
          Note App
        </h1>
        <AddNote />
        {noteState ? <ListNotes /> : "No notes"}
        {/* <EditNotes /> */}
      </div>
    </AppContext.Provider>
  );
};

export default App;
