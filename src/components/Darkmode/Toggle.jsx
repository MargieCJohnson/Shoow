import React from 'react';
import './Toggle.css';

const Toggle = ({ checked, onChange }) => (
 <div class="container-darkmode">
  <label class="switcher">
    <input 
    type="checkbox" 
    class="dn"
    checked={checked}
    onChange={onChange} 
    id="dn"
  />
    <div>
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
          <defs></defs>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
        </svg>
    </div>
  </label>
</div>
);

export default Toggle;
