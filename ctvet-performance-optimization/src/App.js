import React,{useState} from 'react';
import './index.css';
import "./App.css"
import Navbar from './components/Navbar';




export default function App() {
  const [page, setPage] = useState('posts');

  return (
    <div className="container">
      <Navbar setPage={setPage} />
  
    </div>
  );
}
