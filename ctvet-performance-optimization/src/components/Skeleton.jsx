import React from 'react';

function Skeleton() {
  return (
    <div className="card">
      <div className="skeleton" style={{ width: '60%' }}></div>
      <div className="skeleton"></div>
      <div className="skeleton" style={{ width: '80%' }}></div>
    </div>
  );
}

export default Skeleton;