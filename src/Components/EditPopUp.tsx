import React, { useRef, useState } from "react";
import axios from "axios";
import DrawingCanvas , {type CanvasHandle} from "./Canvas";
import type { Note as NoteType } from '../types';

interface EditPopupProps {
  note: NoteType;
  onClose: () => void;
  onUpdate: (updatednote: NoteType ) => void;
  onDelete: (id:number) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ note, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [isClosing, setIsClosing] = useState(false)
  const [showCanvas, setShowCanvas] = useState(note.drawingData ? true : false);

  const canvasRef = useRef<CanvasHandle>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatednote = { ...note, title, description, drawingData: showCanvas ? canvasRef.current?.getSaveData() : note.drawingData };

    try {
      const response = await axios.put(`http://localhost:8080/api/notes/${note.id}`, updatednote);
      console.log(response);
      
      onUpdate(updatednote);
      onClose(); // Close the popup after updating
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async() =>{
    await onDelete(note.id);
    onClose();
  }
  
  // const deletenote = async () =>{
  //   try{
  //     await axios.delete(`http://localhost:8080/api/notes/${note.id}`);
  //     window.location.reload();
  //     onClose();
  //   }catch (error){
  //     console.log(error)
  //   }
  // }

  const closePopup = () =>{
    setIsClosing(true);
    setTimeout(()=>{
        onClose();
        setIsClosing(false);
    }, 300);

  }

  // const animationClass = isClosing ? 'animate-popup-out' : 'animate-popup-in';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-out fade-out duration-200' : 'animate-in fade-in duration-200'}`}>
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closePopup}
      />

     <div className={`relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Edit Note</h2>
          <button
            type="button"
            onClick={closePopup}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
  {/* <h2 className="text-xl font-semibold mb-4">Edit note</h2> */}
  <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowCanvas(!showCanvas)}
                className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {showCanvas ? '−' : '+'}
                </span>
                {showCanvas ? 'Remove Drawing' : 'Add Drawing'}
              </button>

              {showCanvas && (
                <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                  <DrawingCanvas ref={canvasRef} initialData={note.drawingData} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              Delete
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closePopup}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg shadow-purple-500/30 transition-all"
              >
                Save
              </button>
            </div>
    {/* <button type="button" onClick={closePopup} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">
      Cancel
    </button> */}
  </div>
  </form>
</div>



    </div>
  );
};

export default EditPopup;
