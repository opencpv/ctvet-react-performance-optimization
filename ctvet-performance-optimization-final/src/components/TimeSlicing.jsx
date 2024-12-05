import { useState, useTransition } from 'react';

const TimeSlicing = () => {
  // Create our dataset just once when the component mounts
  const allNumbers = Array.from({ length: 10000 }, (_, i) => i + 1);
  
  const [filterNumber, setFilterNumber] = useState('');
  const [filteredNumbers, setFilteredNumbers] = useState(allNumbers.slice(0, 20));
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (event) => {
    const value = event.target.value;
    
    // This update happens immediately because it's outside startTransition
    setFilterNumber(value);
    
    // Wrap the expensive filtering operation in startTransition
    startTransition(() => {
      if (value === '') {
        setFilteredNumbers(allNumbers.slice(0, 20));
        return;
      }

      // Instead of adding delay to each iteration, we'll do the filtering first
      const numberToCheck = parseInt(value || 1);
      const filtered = allNumbers.filter(num => num % numberToCheck === 0);
      
      // Then simulate our expensive operation once
      const start = performance.now();
      while (performance.now() - start < 100) {
        // Single delay instead of per-item delay
      }
      
      setFilteredNumbers(filtered.slice(0, 20));
    });
  };

  return (
    <div className="time-slicing-container">
      <div className="demo-card">
        <h2 className="demo-title">Number Filter with Time Slicing</h2>
        <p className="demo-description">
          Enter a number to see values divisible by it. Notice how the input stays responsive
          even during the filtering process.
        </p>
        
        <div className="input-wrapper">
          <input
            type="number"
            value={filterNumber}
            onChange={handleFilterChange}
            placeholder="Enter a number..."
            className="number-input"
            min="1"
          />
          {isPending && <div className="loader">Processing...</div>}
        </div>

        <div className="numbers-grid">
          {filteredNumbers.map(number => (
            <div key={number} className="number-card">
              {number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlicing;