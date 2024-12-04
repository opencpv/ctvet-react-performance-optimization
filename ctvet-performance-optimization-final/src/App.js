import React, { Suspense, lazy, useState } from 'react';
import './index.css';
import "./App.css"
import Navbar from './components/Navbar';
import VirtualizedPhotos from './components/PhotosVirtualizedList';

const Posts = lazy(() => import('./components/Posts'));
const Users = lazy(() => import('./components/Users'));
const Photos = lazy(() => import('./components/Photos'));

export default function App() {
  const [page, setPage] = useState('posts');

  return (
    <div className="container">
      <Navbar setPage={setPage} />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        {page === 'posts' && <Posts />}
        {page === 'users' && <Users />}
        {page === 'photos' && <Photos />}
        {page === 'list' && <VirtualizedPhotos />}
      </Suspense>
    </div>
  );
}
