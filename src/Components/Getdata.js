import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { DataGrid } from "@mui/x-data-grid";

 function Getdata() {

//   const [newrow, setNewRow] = useState([])
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const fetchData = (async () => {
//       const colldta = await axios.get('http://localhost:5000/calculation')
//       const fetchedData = colldta.data

//       if (fetchedData.length > 0) {
//         const cols = Object.keys(fetchedData[0])
//         setNewRow(cols)
//       }
//       setData(fetchedData)


//     })
//     fetchData()
//   }, [])
//   console.log(newrow)

//   return (
//     <div className="container mt-4">
//       <h3>Dynamic Data Table</h3>
//       <table className="table table-bordered table-striped ">

//         <thead>
//           <tr>
//             <th>Select</th>
//             <th>Actions</th>
//             {newrow.map((col) => (
//               <th key={col}>{col}</th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index} style={{ textAlign: 'center' }}>
//               <td>
//                 <input type="checkbox" />
//               </td>
//               <td >
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => console.log("Deleting:", row.id)}
//                 >
//                   Delete
//                 </button>
//               </td>

//               {newrow.map((col) => (
//                 <td key={`${index}-${col}`}>
//                   <input
//                     type="text"
//                     defaultValue={row[col]}
//                     onBlur={(e) =>
//                       console.log(`Editing ${col}:`, e.target.value)
//                     }
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>
//   );
 };

 export default Getdata


