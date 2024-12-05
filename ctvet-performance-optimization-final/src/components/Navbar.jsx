function Navbar({ setPage }) {
    return (
      <nav className="navbar">
        <button 
          className="nav-button" 
          onClick={() => setPage('posts')}
        >
          Posts
        </button>
        <button 
          className="nav-button" 
          onClick={() => setPage('users')}
        >
          Users
        </button>
        <button 
          className="nav-button" 
          onClick={() => setPage('photos')}
        >
          Photos
        </button>
        <button 
          className="nav-button" 
          onClick={() => setPage('list')}
        >
          Virttualized Photos List
        </button>
        <button 
          className="nav-button" 
          onClick={() => setPage('time-slicing')}
        >
          Time Slicing Demo
        </button>
      </nav>
    );
  }
  
  export default Navbar;