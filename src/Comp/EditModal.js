import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext } from "react";
import { AppContext } from "../JS/AppContext";
import NoteDesc from "./NoteDesc";
import NoteContent from "./NoteContent";
import NoteTags from "./NoteTags";

const EditModal = ({ isOpen, setIsOpen, noteId }) => {
  const { noteState, setNoteState } = useContext(AppContext);
  const [desc, setDesc] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    const updatedState = noteState.map((obj) => {
      if (obj.id === noteId) {
        return { ...obj, desc, note, tags };
      }
      return obj;
    });

    setNoteState(updatedState);
    setDesc("");
    setNote("");
    setTags("");
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(!isOpen);
            setDesc("");
            setNote("");
            setTags("");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Note
                  </Dialog.Title>

                  <div className="modal-content mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                    <NoteDesc desc={desc} setDesc={setDesc} />
                    <NoteContent note={note} setNote={setNote} />
                    <NoteTags tags={tags} setTags={setTags} />
                  </div>

                  <div className="modal-footer mt-4 float-right">
                    <button
                      type="button"
                      className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setDesc("");
                        setNote("");
                        setTags("");
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={(e) => handleSave(e)}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditModal;
