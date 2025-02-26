import React, { useState } from "react";

import Demo from "./Demo";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const App: React.FC = () => {
  return (
    <div>
      <Demo />
      {/* <h1>Lab Management</h1> */}
      {/* <DynamicForm defaultValues={selectedLab || undefined} onSubmit={handleFormSubmit} />
      <ul>
        {labs.map((lab) => (
          <li key={lab.id}>
            {lab.labName} - {lab.location}
            <button onClick={() => setSelectedLab(lab)}>Edit</button>
            <button onClick={() => dispatch(deleteLab(lab.id))}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
