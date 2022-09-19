import AddNote from "./Comp/AddNote";
import ListNotes from "./Comp/ListNotes";
import { initialData, AppContext } from "./JS/AppContext";
import { useState, useEffect } from "react";
import { get, set } from "idb-keyval";
import "./CSS/App.css";
// TODO:
// add local storage
// do jest tests
// do cypress tests
// fix design - cards for the notes

const App = () => {
  const [noteState, setNoteState] = useState();

  return (
    <AppContext.Provider value={{ noteState, setNoteState }}>
      <div className="container  w-screen h-screen mx-auto bg-gray-200 rounded-xl shadow border p-8">
        <h1 className="text-center text-6xl font-normal leading-normal mt-0 mb-2">
          Note App
        </h1>
        <AddNote />
        {/* {noteState ? <ListNotes /> : "No notes"}*/}
        <ListNotes />
      </div>
    </AppContext.Provider>
  );
};

export default App;
