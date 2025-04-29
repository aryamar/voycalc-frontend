import React, { useEffect, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from 'axios'

const TestChild = () => {
  const [gridApi, setGridApi] = useState(null);
  let [getcolN, setGetColName] = useState([])

  const [rowData, setRowData] = useState([
    { id: 1, name: "Ali", age: 25, country: "Iran" },
    { id: 2, name: "Sara", age: 30, country: "USA" },
    { id: 3, name: "John", age: 22, country: "UK" },
  ]);

  // ستون‌ها
  const [columnDefs] = useState([
    { field: "id", headerName: "ID", editable: false },
    { field: "name", headerName: "Name", editable: true, filter: "agTextColumnFilter" },
    { field: "age", headerName: "Age", editable: true, filter: "agNumberColumnFilter" },
    { field: "country", headerName: "Country", editable: true, filter: "agTextColumnFilter" },
  ]);


  console.log("RowData: ", rowData)
  const savedRowData = [...rowData]
  console.log('saved Data:', savedRowData)


  const rowSelection = ({
    mode: 'multiRow'
  })

  // افزودن ردیف جدید
  const addRow = () => {
    const newRow = { id: rowData.length + 1, name: "", age: 0, country: "" };
    setRowData([...rowData, newRow]);

  };

  const onGridReady = (params) => {
    setGridApi(params.api); // مقداردهی gridApi
  };
  console.log(gridApi)

  const getSelectedRows = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      console.log(selectedData);
    } else {
      console.error("Grid API is not initialized.");
    }
  };

  // حذف ردیف انتخاب شده
  const deleteRow = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setRowData(rowData.filter((row) => !selectedData.includes(row)));
    console.log("selectedNodes:", selectedNodes)
    console.log("Row Data:", rowData)
  };

  // حرکت ردیف به بالا/پایین
  const moveRow = (direction) => {

    const selectedNode = gridApi.getSelectedNodes()[0];
    const gridId = gridApi.getAllGridColumns()
    let getcolName = ['']

    
    for (let i = 0; i < gridId.length; i++) {

      getcolName += gridId[i].colId

    }



    console.log('getcolname:',getcolName)
    console.log("get all grid columns", gridId)
    if (!selectedNode) return;

    const index = selectedNode.rowIndex;
    const newData = [...rowData];

    if (direction === "up" && index > 0) {
      [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
    } else if (direction === "down" && index < rowData.length - 1) {
      [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
    }

    setRowData(newData);
  };

  // ذخیره API برای دسترسی به قابلیت‌های Grid

  return (
    <div>
      {/* دکمه‌های کنترل */}
      <button onClick={addRow}>Add Row</button>
      <button onClick={deleteRow}>Delete Row</button>
      <button onClick={() => moveRow("up")}>Move Up</button>
      <button onClick={() => moveRow("down")}>Move Down</button>

      {/* گرید */}
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          modules={[ClientSideRowModelModule]} // اضافه کردن ماژول مورد نیاز
          rowSelection={rowSelection}
          onGridReady={onGridReady}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}

        />
      </div>
    </div>
  );
};

//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     // داده‌های اولیه برای DataGrid
//     const initialRows = [
//       { id: 1, name: "Row 1", value: 100 },
//       { id: 2, name: "Row 2", value: 200 },
//       { id: 3, name: "Row 3", value: 300 },
//     ];
//     setRows(initialRows);
//   }, []);

//   // جابه‌جایی ردیف به سمت بالا
//   const moveRowUp = (index) => {
//     if (index === 0) return; // اولین ردیف نمی‌تواند به بالا منتقل شود
//     const updatedRows = [...rows];
//     [updatedRows[index - 1], updatedRows[index]] = [
//       updatedRows[index],
//       updatedRows[index - 1],
//     ];
//     setRows(updatedRows);
//   };

//   // جابه‌جایی ردیف به سمت پایین
//   const moveRowDown = (index) => {
//     if (index === rows.length - 1) return; // آخرین ردیف نمی‌تواند به پایین منتقل شود
//     const updatedRows = [...rows];
//     [updatedRows[index], updatedRows[index + 1]] = [
//       updatedRows[index + 1],
//       updatedRows[index],
//     ];
//     setRows(updatedRows);
//   };

//   // تعریف ستون‌ها
//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     { field: "name", headerName: "Name", width: 150 },
//     { field: "value", headerName: "Value", width: 150 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 200,
//       renderCell: (params) => {
//         const index = rows.findIndex((row) => row.id === params.row.id);
//         return (
//           <div>
//             <button onClick={() => moveRowUp(index)} disabled={index === 0}>
//               Up
//             </button>
//             <button
//               onClick={() => moveRowDown(index)}
//               disabled={index === rows.length - 1}
//             >
//               Down
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         disableSelectionOnClick
//       />
//     </div>
//   );
// };



// const [columns, setColumns] = useState([])
// const [rows, setRows] = useState([])

// useEffect(() => {

//   const getData = async () => {
//     const response = await axios.get('http://localhost:5000/calculation')
//     const headTitle = response.data
//     const column =Object.keys(headTitle[1]).map((key)=>({
//       field:key,
//       headerName:key.toUpperCase(),
//       font:'bold',
//       width:"150"
//     }))




//     setColumns(column)
//     setRows(headTitle)
//     console.log('Header Title:', column)
//   }
//   getData()
// }, [])

// return (
//   <>
//   <div className="container">
//     {
//       rows.length && columns.length > 0 ? (
//         <DataGrid
//           rows={rows.map((row, index) => ({ ...row, id: index + 1 }))}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5, 10, 20]}
//           checkboxSelection
//           editMode='cell'
//           isCellEditable={true}
//         />
//       ) : (
//         <p>Loading Data...</p>
//       )
//     }
//     </div>
//   </>
// )
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [search, setSearch] = useState("");

//   // واکشی ستون‌ها
//   useEffect(() => {
//     const fetchColumns = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/columns");
//         setColumns(response.data);
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchColumns();
//   }, []);

//   // واکشی داده‌ها
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/data", {
//            params: { page: page + 1, pageSize, search },
//         });
//         setRows(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [page, pageSize, search]);
// console.log(rows)
//   // ویرایش سلول‌ها
//   const handleCellEditCommit = async (params) => {

//     const { id, field, value } = params;
//     console.log(id)
//     try {
//       await axios.put(`http://localhost:5000/api/data/${id}`, {
//         [field]: value,

//       });

//       setRows((prevRows) =>prevRows.map((row) =>row.id === id ? { ...row, [field]: value } : row
//         )
//       );
//     } catch (error) {
//       console.error("Error updating cell:", error);
//     }
//   };

//   // اضافه کردن ردیف جدید
//   const handleAddRow = async () => {
//     try {
//       const newRow = columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {});
//       const response = await axios.post("http://localhost:5000/api/data", newRow);
//       setRows([...rows, response.data]);
//     } catch (error) {
//       console.error("Error adding row:", error);
//     }
//   };

//   // حذف ردیف
//   const handleDeleteRow = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/data/${id}`);
//       setRows(rows.filter((row) => row.id !== id));
//     } catch (error) {
//       console.error("Error deleting row:", error);
//     }
//   };

//   return (
//     <div style={{ height: 600, width: "80%", margin:"auto" }}>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ marginBottom: 10 }}
//       />
//       <button onClick={handleAddRow} style={{ marginRight: 10 }}>
//         Add Row
//       </button>
//       <DataGrid
//         rows={rows}
//         columns={[
//           ...columns,
//           {
//             field: "actions",
//             headerName: "Actions",
//             width: 150,
//             renderCell: (params) => (
//               <button
//                 onClick={() => handleDeleteRow(params.row.id)}
//                 style={{ color: "red" }}
//               >
//                 Delete
//               </button>
//             ),
//           },
//         ]}
//         pageSize={pageSize}
//         rowsPerPageOptions={[10, 20, 50]}
//         pagination
//         onPageChange={(newPage) => setPage(newPage)}
//         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//         loading={loading}
//         onCellEditCommit={handleCellEditCommit}
//         checkboxSelection={true}
//         //onRowClick={handleCellEditCommit}
//       />
//     </div>
//   );

export default TestChild;
