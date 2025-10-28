// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

// ✅ HashRouter ensures that refresh and direct links work on GitHub Pages
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename="/Survey">
    <App />
  </Router>
);
