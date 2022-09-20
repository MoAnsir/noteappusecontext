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

const App = ({ testData }) => {
  const [noteState, setNoteState] = useState(testData ? testData : null);

  useEffect(() => {
    if (!testData) {
      get("test").then((val) => {
        setNoteState(val);
      });
    }
  }, []);

  useEffect(() => {
    if (noteState) {
      set("test", noteState);
    }
  }, [noteState]);

  return (
    <AppContext.Provider value={{ noteState, setNoteState }}>
      <div className="container  w-full h-full mx-auto bg-gray-200 rounded-xl shadow border p-8">
        <h1 className="text-center text-6xl font-normal leading-normal mt-0 mb-2">
          Note App
        </h1>
        <AddNote />
        <ListNotes />
      </div>
    </AppContext.Provider>
  );
};

export default App;
