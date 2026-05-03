import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setAddNote } from '../store/slice/noteSlice';
import DrawingCanvas, {type CanvasHandle} from './Canvas';
const Add = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isClosing, setIsClosing] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false);

  const canvasRef = useRef<CanvasHandle>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const drawingData = showCanvas ? canvasRef.current?.getSaveData() : null;
    const newnote = { title, description, drawingData };
    try {
      await axios.post(`http://localhost:8080/api/notes`, newnote);
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setIsClosing(true)
    setTimeout(() => {
      dispatch(setAddNote());
      setIsClosing(false);
    }, 200);
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-out fade-out duration-200' : 'animate-in fade-in duration-200'}`}>
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closePopup}
      />

      <div className={`relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add New Note</h2>
          <button
            onClick={closePopup}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title{' '}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400"
                autoFocus
                />
                </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description{' '}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your thoughts..."
                rows={4}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none"
              />
                </label>
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
                  <DrawingCanvas ref={canvasRef} />
                </div>
              )}
            </div>
              </div>

          <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
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
              Create Note
            </button>
          </div>
              </form>
              </div>
      </div>
  )
}

export default Add