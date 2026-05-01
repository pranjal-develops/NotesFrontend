import React from 'react'
import Note from './Note';

interface note {
  id: number;
  title: string;
  description: string;
}

interface NoteProps{
    notes: note[],
    loading:boolean,
    setEditingnote: React.Dispatch<React.SetStateAction<note | null>>;
}

const Notes:React.FC<NoteProps> = ({notes,loading, setEditingnote}) => {
  return (
    <>
    {notes.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                <p className="text-xl font-medium mb-2">No notes yet</p>
                <p className="text-sm">Click the + button to add your first note.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 pb-20">
                {notes.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    onClk={() => setEditingnote(note)}

                    // onClk={onClk}
                  />
                ))}
              </div>
            )}
    </>
  )
}

export default Notes