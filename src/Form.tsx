import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ICellRendererParams, ColDef } from "ag-grid-community";

import { useDispatch, useSelector } from "react-redux";
import { addLab, updateLab } from "./Redux/Slice";
import { RootState } from "./Redux/Store";
import { Lab } from "./Types";
import { Modal } from "react-bootstrap";
import "./App.css";
import Select from "react-select";

const Formpage = () => {
  const dispatch = useDispatch();
  const labs = useSelector((state: RootState) => state.labs.labs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState<Lab>({
    id: 0,
    labName: "",
    location: "",
    contactPerson: "",
    contactNumber: "",
    servicesOffered: [],
    types: "",
    viscosity: "",
    temperature: "",
    turbidity: "",
    status: "Active",
    testMethods: [],
  });

  const columnDefs: ColDef<Lab>[] = [
    {
      headerName: "Actions",
      field: "id",
      width: 160,
      cellRenderer: (params: ICellRendererParams<Lab>) =>
        params.data ? (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            onClick={() => params.data && handleEdit(params.data)}
          >
            Edit
          </button>
        ) : null,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    {
      headerName: "Lab Name",
      field: "labName",
      width: 200,
      cellStyle: {
        display: "flex",

        alignItems: "center",
      },
    },
    {
      headerName: "Location",
      field: "location",
      width: 200,
      cellStyle: {
        display: "flex",

        alignItems: "center",
      },
    },
    {
      headerName: "Contact Person",
      field: "contactPerson",
      width: 250,
      cellStyle: {
        display: "flex",

        alignItems: "center",
      },
    },
    {
      headerName: "Contact Number",
      field: "contactNumber",
      width: 250,
      cellStyle: {
        display: "flex",

        alignItems: "center",
      },
    },
    {
      headerName: "Sample",
      field: "types",
      width: 200,
      cellStyle: {
        display: "flex",

        alignItems: "center",
      },
    },
    {
      headerName: "Status",
      field: "status",
      width: 200,
      cellStyle: {
        display: "flex",

        alignItems: "center",
      },
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "status"
          ? (value as "Active" | "Inactive")
          : ["viscosity", "temperature", "turbidity"].includes(name)
          ? Number(value) || 0
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateLab(form));
    } else {
      dispatch(addLab({ ...form, id: Date.now() }));
    }
    closeModal();
  };

  const handleEdit = (lab: Lab) => {
    setEditing(true);
    setForm(lab);
    openModal();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(false);
    setForm({
      id: 0,
      labName: "",
      location: "",
      contactPerson: "",
      contactNumber: "",
      servicesOffered: [],
      types: "",
      viscosity: "",
      temperature: "",
      turbidity: "",
      status: "Active",
      testMethods: [],
    });
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "oil_testing", label: "Oil Testing" },
    { value: "water_testing", label: "Water Testing" },
    { value: "soil_testing", label: "Soil Testing" },
    { value: "chemical_analysis", label: "Chemical Analysis" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={openModal}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mb-4"
      >
        Add Lab
      </button>

      <Modal show={isModalOpen} onHide={closeModal} contentLabel="Lab Form">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-semibold mb-4">
            {editing ? "Edit Lab" : "Add Lab"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label
              style={{
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "cursive",
                marginLeft: "5px",
              }}
            >
              Lab Name
            </label>
            <input
              type="text"
              name="labName"
              value={form.labName}
              onChange={handleChange}
              placeholder="Lab Name"
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
              required
            />
            <label
              style={{
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "cursive",
                marginLeft: "5px",
              }}
            >
              Location
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
              required
            />
            <label
              style={{
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "cursive",
                marginLeft: "5px",
              }}
            >
              Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person"
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
              required
            />
            <label
              style={{
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "cursive",
                marginLeft: "5px",
              }}
            >
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/\D/g, "").slice(0, 10);
              }}
              placeholder="Contact Number"
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
              required
            />

            <label
              style={{
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "cursive",
                marginLeft: "5px",
              }}
            >
              Service Offered
            </label>

            <Select
              isMulti
              options={options}
              value={options.filter((option) =>
                form.servicesOffered.includes(option.value)
              )}
              onChange={(selectedOptions) =>
                setForm({
                  ...form,
                  servicesOffered: selectedOptions.map(
                    (option) => option.value
                  ),
                })
              }
              className="basic-multi-select"
              classNamePrefix="select"
            />

            <label
              style={{
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "cursive",
                marginLeft: "5px",
              }}
            >
              Test Methods
            </label>
            <select
              name="types"
              value={form.types}
              onChange={handleChange}
              required
            >
              <option value="">Select Sample Type</option>
              <option value="Oil Testing">Oil Testing</option>
              <option value="Water Testing">Water Testing</option>
            </select>

            {form.types === "Oil Testing" && (
              <>
                <input
                  type="number"
                  name="viscosity"
                  value={form.viscosity || ""}
                  onChange={handleChange}
                  placeholder="Viscosity"
                  required
                />
                <input
                  type="number"
                  name="temperature"
                  value={form.temperature || ""}
                  onChange={handleChange}
                  placeholder="Temperature"
                  required
                />
              </>
            )}

            {form.types === "Water Testing" && (
              <>
                <input
                  type="number"
                  name="turbidity"
                  value={form.turbidity || ""}
                  onChange={handleChange}
                  placeholder="Turbidity"
                  required
                />
              </>
            )}
            <label
              style={{
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "cursive",
                marginLeft: "5px",
              }}
            >
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {editing ? "Update Lab" : "Add Lab"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div
        className="ag-theme-alpine mt-4 rounded-lg shadow overflow-hidden border"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact rowData={labs} columnDefs={columnDefs} rowHeight={50} />
      </div>
    </div>
  );
};

export default Formpage;
