// Footer.js
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Mandri Life. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
