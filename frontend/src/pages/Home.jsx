import React from 'react'
import { useState , useEffect } from 'react'
import api from '../api'
import { API_ENDPOINT } from '../constants'
import "../../src/styles/home.css"
const Home = () => {

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes()
  }
  , [])

  const getNotes = async () => {
    setLoading(true)
    try {
      const response = await api.get(API_ENDPOINT.GET_NOTE)
      setNotes(response.data)
    } catch (error) {
      alert("Error")
      console.log(error)
    }
    setLoading(false)
  }

  const deleteNote = async (id) => {
    try {
      await api.delete(`${API_ENDPOINT.DELETE_NOTE}${id}`);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Notes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <button className="delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home