import React, { useState, useEffect, useTransition } from 'react';
import Skeleton from './Skeleton';
import PostCard from './PostCard';
function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    startTransition(() => {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    });
  }, [searchTerm, posts]);

  async function fetchPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search posts..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid">
        {isPending ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i} />)
        ) : (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;