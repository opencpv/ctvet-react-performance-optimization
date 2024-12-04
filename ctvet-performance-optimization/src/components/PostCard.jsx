import React, { memo } from 'react';

const PostCard = memo(({ post }) => {
  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
});

export default PostCard;