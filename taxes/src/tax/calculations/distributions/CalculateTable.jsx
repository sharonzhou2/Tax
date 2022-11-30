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
    const newRows = rows.filter((row) => row.id !== id);
    localStorage.setItem("distributions", JSON.stringify(newRows));
    setRows(newRows);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "13U",
      headerName: "Share of Net Income (13U)",
      width: 180,
      editable: true,
    },
    {
      field: "13C",
      headerName: "Franked Distribution from trusts (13C)",
      width: 150,
      editable: true,
    },
    {
      field: "13Q",
      headerName: "Share of franking credits from franked dividends (13Q)",
      width: 150,
      editable: true,
    },
    {
      field: "13R",
      headerName:
        "Share of credit for TFN amounts withheld from interest, dividends and unit trusts (13R)",
      width: 150,
      editable: true,
    },
    {
      field: "13A",
      headerName: "Share of credit for foreign resident withholding amounts",
      width: 150,
      editable: true,
    },
    {
      field: "18A",
      headerName: "Net Capital Gains (18A)",
      width: 150,
      editable: true,
    },
    {
      field: "18H",
      headerName: "Total current year capital gains (18H)",
      width: 150,
      editable: true,
    },
    {
      field: "20E",
      headerName: "Foreign income (20E)",
      width: 150,
      editable: true,
    },
    {
      field: "20M",
      headerName: "Other net foreign income (20M)",
      width: 150,
      editable: true,
    },
    { field: "20O", headerName: "FITO (20O)", width: 150, editable: true },
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
    const dist = localStorage.getItem("distributions");
    if (dist) {
      console.log("exists");

      const distributions = JSON.parse(dist);
      setRows([...distributions]);
    }

    console.log("refreshing page");
  }, []);

  useEffect(() => {
    if (text) {
      const newRows = JSON.parse(text);

      // Save data to local storage
      const dist = localStorage.getItem("distributions");

      if (dist) {
        const distributions = JSON.parse(dist);
        newRows["id"] = distributions.length + 1;

        setRows([...distributions, newRows]);
        localStorage.setItem(
          "distributions",
          JSON.stringify([...distributions, newRows])
        );
      } else {
        setRows([...rows, newRows]);
        newRows["id"] = 1;
        localStorage.setItem(
          "distributions",
          JSON.stringify([...rows, newRows])
        );
      }

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
