import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// const rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

const CalculateTable = ({ text }) => {
  const [rows, setRows] = useState([]);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "13U",
      headerName: "Share of Net Income (13U)",
      width: 180,
      editable: true,
    },
    { field: "13C", headerName: "Column 2", width: 150, editable: true },
    { field: "13R", headerName: "Column 2", width: 150, editable: true },
    { field: "13A", headerName: "Column 2", width: 150, editable: true },
    { field: "18A", headerName: "Column 2", width: 150, editable: true },
    { field: "18H", headerName: "Column 2", width: 150, editable: true },
    { field: "20E", headerName: "Column 2", width: 150, editable: true },
    { field: "20M", headerName: "Column 2", width: 150, editable: true },
    { field: "20O", headerName: "Column 2", width: 150, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    if (text) {
      const newRows = JSON.parse(text);
      newRows["id"] = rows.length + 1;
      setRows([...rows, newRows]);
      // console.log(typeof newRows);
    }
  }, [text]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default CalculateTable;
