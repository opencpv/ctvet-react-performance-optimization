import React, { 
  useState, 
  useEffect, 
  useTransition, 
  useCallback, 
  useMemo 
} from 'react';
import Skeleton from './Skeleton';
import PostCard from './PostCard';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  // Memoize fetchPosts function to maintain referential equality
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Memoize the filtering function
  const filterPosts = useCallback((searchString, postList) => {
    return postList.filter(post => 
      post.title.toLowerCase().includes(searchString.toLowerCase())
    );
  }, []);

  // Memoize filtered results
  const filteredResults = useMemo(() => {
    return filterPosts(searchTerm, posts);
  }, [filterPosts, searchTerm, posts]);

  useEffect(() => {
    startTransition(() => {
      setFilteredPosts(filteredResults);
    });
  }, [filteredResults]);

  // Memoize search handler
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Memoize skeleton array
  const skeletonArray = useMemo(() => {
    return Array(6).fill(0).map((_, i) => <Skeleton key={i} />);
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search posts..."
        onChange={handleSearch}
      />
      <div className="grid">
        {isPending ? (
          skeletonArray
        ) : (
          filteredPosts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Posts;