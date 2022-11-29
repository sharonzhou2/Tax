import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// const rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

const DividendsTable = ({ text }) => {
  const [rows, setRows] = useState([]);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "name",
      headerName: "ASX Code",
      width: 150,
      editable: true,
    },
    {
      field: "date",
      headerName: "Payment Date",
      width: 150,
      editable: true,
    },
    {
      field: "DRPS",
      headerName: "Dividends Rate per Share",
      width: 150,
      editable: true,
    },
    { field: "SH", headerName: "Shares Held", width: 150, editable: true },
    { field: "UF", headerName: "Unfranked Amount", width: 150, editable: true },
    { field: "FA", headerName: "Franked Amount", width: 150, editable: true },
    { field: "GA", headerName: "Gross Amount", width: 150, editable: true },
    { field: "FC", headerName: "Franking Credit", width: 150, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
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
      console.log(rows);
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

export default DividendsTable;
