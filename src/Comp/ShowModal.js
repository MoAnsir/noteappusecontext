import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ShowModal = ({ isOpen, setIsOpen, showNoteData }) => {
  return (
    <div>
      {!showNoteData ? null : (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setIsOpen(!isOpen);
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
                      Note Content
                    </Dialog.Title>

                    <div className="modal-content mt-2">
                      <p className="text-sm text-gray-500">
                        Description: {showNoteData[0].desc}
                      </p>
                      <p className="text-sm text-gray-500">
                        Description: {showNoteData[0].note}
                      </p>
                      <p className="text-sm text-gray-500">
                        Description: {showNoteData[0].tags}
                      </p>
                    </div>

                    <div className="modal-footer mt-4 float-right">
                      <button
                        type="button"
                        className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default ShowModal;
