import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import ToDoList from "./components/ToDoList";
import Tamagotchi from "./components/Tamagotchi";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // onclick outside modal should close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && !event.target.closest(".modal-content")) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <>
      {/* <div className="bg-white rounded-xl shadow-md p-8 max-w-sm text-center">
          <h1 className="text-2xl font-bold text-slate-900">Hello, Tailwind</h1>
          <p className="mt-2 text-slate-500">
            Styled entirely with utility classes.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 hover:-translate-y-1 transition-transform duration-200"
          >
            Click me
          </button>
        </div> */}
      <div className="max-w-6xl mx-auto w-full">
        <ToDoList />

        <Tamagotchi />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="modal-content relative"
      >
        <h2 className="text-xl font-bold text-slate-900 text-center">
          Hi Hello World
        </h2>
      </Modal>
    </>
  );
}
