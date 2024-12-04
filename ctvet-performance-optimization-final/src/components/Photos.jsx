import { useState, useEffect } from 'react';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  async function fetchPhotos() {
    try {
      setLoading(true);
      // Creating array of 20 items for pagination
      const newPhotos = Array.from({ length: 20 }, (_, i) => ({
        id: (page - 1) * 20 + i + 1,
        thumbnailUrl: `https://picsum.photos/200/200?random=${(page - 1) * 20 + i}`,
        title: `Photo ${(page - 1) * 20 + i + 1}`
      }));
      setPhotos(prev => [...prev, ...newPhotos]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="photo-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} loading="lazy" />
          </div>
        ))}
      </div>
      {loading ? (
        <div className="loading">Loading more photos...</div>
      ) : (
        <button 
          className="load-more"
          onClick={() => setPage(p => p + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Photos;