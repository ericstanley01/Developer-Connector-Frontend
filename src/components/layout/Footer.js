import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
 return (
  <div>
   <footer className="bg-dark text-white mt-5 p-4 text-center">
    Copyright &copy; {new Date().getFullYear()} <Link to="/"> Dev Connector</Link>
   </footer>
  </div>
 )
}
