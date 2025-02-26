import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface GridProps {
  rowData: any[];
  onEdit: (id: number) => void;
}

const GridComponent: React.FC<GridProps> = ({ rowData, onEdit }) => {
  const columns = [
    { headerName: "ID", field: "id", cellRenderer: (params: any) => <button onClick={() => onEdit(params.value)}>{params.value}</button> },
    { headerName: "Lab Name", field: "labName" },
    { headerName: "Location", field: "location" },
    { headerName: "Contact Person", field: "contactPerson" },
    { headerName: "Status", field: "status" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columns} />
    </div>
  );
};

export default GridComponent;
