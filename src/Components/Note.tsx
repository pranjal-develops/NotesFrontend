import React from 'react';
import type {Note as NoteType} from '../types';

interface noteProps {
  note: NoteType;
  onClk: () => void;
}

// interface noteProps{
//     id: number;
//     title: string;
//     description: string;
// }

// const Note: React.FC<noteProps> = ({note, onClk}) => {
//   return (
//     <div className=' flex flex-col h-[250px] min-w-[250px] m-2 p-5 rounded-lg bg-white  hover:bg-gray-200 dark:bg-[#121212] hover:dark:bg-[#1E1E1E] border-gray-200 border-3 dark:border-[#2C2C2C]' onClick={onClk}>
//         <h2 className='text-[1.5rem] font-bold p-0 break-words dark:text-[#EAEAEA] overflow-hidden w-full'>{note.title}</h2>
//         <div className="desc text-gray-500 dark:text-[#B0B0B0] overflow-auto">
//             {note.description}
//         </div>
//     </div>
//   )
// }

const Note: React.FC<noteProps> = ({note, onClk}) => {
  return (
    // <div className='group relative flex flex-col h-70 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden' onClick={onClk}>
    <div className='group relative flex flex-col max-h-100 p-6 bg-white dark:bg-[hsl(0,0%,10%)] rounded-2xl border border-[hsl(0,0%,92%)] dark:border-[hsl(0,0%,15%)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden' onClick={onClk}>
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 leading-tight">
        {note.title}
      </h2>

      <div className="flex-1 overflow-y-auto text-gray-600 dark:text-gray-400 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 pr-2">
        {note.description}
      </div>
      {note.drawingData && (
  <div className="mt-3 mb-2 rounded-lg border border-gray-100 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-[hsl(0,0%,15%)]">
    <img src={note.drawingData} alt="Note drawing" className="w-full h-auto max-h-40 object-contain" />
  </div>
)}

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Click to edit</span>
      </div>
    </div>
  )
}


export default Note