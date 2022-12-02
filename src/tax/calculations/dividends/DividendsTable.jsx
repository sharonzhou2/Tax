import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const DividendsTable = ({ text }) => {
  const [rows, setRows] = useState([]);

  const handleDeleteClick = (id) => () => {
    const newRows = rows.filter((row) => row.id !== id);
    localStorage.setItem("dividends", JSON.stringify(newRows));
    setRows(newRows);
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
    const dist = localStorage.getItem("dividends");
    if (dist) {
      const dividends = JSON.parse(dist);
      setRows([...dividends]);
    }
  }, []);

  useEffect(() => {
    if (text) {
      const newRows = JSON.parse(text);
      // Save data to local storage
      const dist = localStorage.getItem("dividends");

      if (dist) {
        const dividends = JSON.parse(dist);
        newRows["id"] = dividends.length + 1;

        setRows([...dividends, newRows]);
        localStorage.setItem(
          "dividends",
          JSON.stringify([...dividends, newRows])
        );
      } else {
        setRows([...rows, newRows]);
        newRows["id"] = 1;
        localStorage.setItem("dividends", JSON.stringify([...rows, newRows]));
      }
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
