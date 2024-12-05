import React, { Suspense, lazy, useState } from 'react';
import './index.css';
import "./App.css"
import Navbar from './components/Navbar';

const Posts = lazy(() => import('./components/Posts'));
const Users = lazy(() => import('./components/Users'));
const Photos = lazy(() => import('./components/Photos'));
const TimeSlicing = lazy(()=> import('./components/TimeSlicing'))
const VirtualizedPhotos = lazy(()=>import ("./components/VirtualizedPhotos"))


export default function App() {
  const [page, setPage] = useState('users');

  return (
    <div className="container">
      <Navbar setPage={setPage} />
      
      <Suspense fallback={<div className="loading">Loading...</div>}>
      {page==="users" && <Users/>}
      {page === 'list' && <VirtualizedPhotos />}
      {page==="posts"  && <Posts/>}
      {page ==='photos' && <Photos/>}
      {page==='time-slicing' && <TimeSlicing/>}
      </Suspense>
    </div>
  );
}
