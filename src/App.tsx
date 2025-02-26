import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Formpage from "./Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Formpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
