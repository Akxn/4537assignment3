import React, { useState } from 'react';
import Login from './Login.js';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './style.css';

function App() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
}

export default App;
