import { useState, useEffect } from 'react';
import { Grid, AutoSizer, WindowScroller } from 'react-virtualized';

function VirtualizedPhotos() {
 const [photos, setPhotos] = useState([]);
 const [page, setPage] = useState(1);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   fetchPhotos();
 }, [page]);

 async function fetchPhotos() {
   try {
     setLoading(true);
     const newPhotos = Array.from({ length: 20 }, (_, i) => ({
       id: (page - 1) * 20 + i + 1,
       thumbnailUrl: `https://picsum.photos/400/400?random=${(page - 1) * 20 + i}`,
       title: `Photo ${(page - 1) * 20 + i + 1}`
     }));
     setPhotos(prev => [...prev, ...newPhotos]);
   } finally {
     setLoading(false);
   }
 }

 const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
   const index = rowIndex * 4 + columnIndex;
   const photo = photos[index];
   if (!photo) return null;

   return (
     <div key={key} style={style} className="photo-grid-item">
       <img
         src={photo.thumbnailUrl}
         alt={photo.title}
         loading="lazy"
         className="photo-img"
       />
     </div>
   );
 };

 return (
   <WindowScroller>
     {({ height, isScrolling, scrollTop }) => (
       <AutoSizer disableHeight>
         {({ width }) => (
           <Grid
             autoHeight
             height={height}
             width={width}
             columnCount={4}
             columnWidth={width / 4}
             rowCount={Math.ceil(photos.length / 4)}
             rowHeight={width / 4}
             cellRenderer={cellRenderer}
             scrollTop={scrollTop}
             isScrolling={isScrolling}
             onScroll={({ clientHeight, scrollHeight, scrollTop }) => {
               if (scrollHeight - scrollTop - clientHeight < 300 && !loading) {
                 setPage(p => p + 1);
               }
             }}
           />
         )}
       </AutoSizer>
     )}
   </WindowScroller>
 );
}

export default VirtualizedPhotos;