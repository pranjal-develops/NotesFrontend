import { useState, useEffect } from "react";
import EditPopup from "../Components/EditPopUp";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Add from "../Components/Add";
import Note from "../Components/Note";
import DrawingCanvas from "../Components/Canvas";

interface note {
  id: number;
  title: string;
  description: string;
}

function Home() {
  const [notes, setnotes] = useState<note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingnote, setEditingnote] = useState<note | null>(null);
  const [addnote, setAddnote] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/notes");
        setnotes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [addnote]);

  // if (loading) return <>Loading...</>;

  const handleUpdate = (updatednote: note) => {
    setnotes(
      notes.map((note) => (note.id === updatednote.id ? updatednote : note)),
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/${id}`);
      setnotes(notes.filter((note) => note.id !== id)); // Remove the deleted note from the state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full bg-[hsl(0,0%,90%)] text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-500">
        <Navbar onAddNote={() => setAddnote(true)} />
        {/* <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8"> */}
        <main className="flex-1 overflow-y-auto">
          {/* <div className="max-w-7xl mx-auto h-full"> */}
          {/* <div className=" p-3 bg-[hsl(0,0%,95%)] rounded-3xl w-full mx-auto h-full"> */}
          <div className=" p-3 mx-2 mr-5 bg-[hsl(0,0%,95%)] dark:bg-[hsl(0,0%,5%)] rounded-3xl w-full h-full">
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
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      {/* <DrawingCanvas /> */}
      {/* Render the edit popup if there's a note to edit */}
      {editingnote && (
        <EditPopup
          note={editingnote}
          onClose={() => setEditingnote(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
      {addnote && <Add onClose={() => setAddnote(false)} />}
    </>
  );
}

export default Home;
