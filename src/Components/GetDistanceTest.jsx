import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'

export default function GetDistanceTest() {
    const [distance, setDistance] = useState(0)
    const [lpname, setLpName] = useState('')
    const [dpname, setDpName] = useState('')
    const [row, setRow] = useState([
        {
            Select: null,
            Id: 1,
            Port_Status: 'Load Port',
            Charterer: null,
            Cargo_Qtty: null,
            Commodity: '',
            Commission: null,
            Port_Name: '',
            Load_Rate: null,
            Load_Term: '',
            LP_Days: null,
            LP_Cost: null,
            DischargePort: '',
            Discharge_Rate: null,
            Dis_Term: '',
            DisPort_Days: null,
            DisPort_Cost: null,
            TTL_Steam_Days: null,
            Distance: 0,
            Add_Port_Days: null,
            Add_Steam_Days: null,
            TTL_Port_Days: null,
            Ballast_Days: null,
            Laden_Days: null
        }
    ]);

    useEffect(() => {
        const fetchDistanceFromServer = async () => {


            try {
                const response = await api.get('/distance', {
                    params: {
                        lpname,
                        dpname,
                    }
                });

                setDistance(response.data.Distance)
                if (!response.ok) {
                    throw new Error('Error fetching distance');
                }


                // فرض می‌کنیم سرور فاصله را در فیلد distance بازمی‌گرداند
            } catch (error) {
                console.error('Error fetching distance:', error);
                return null;
            }
        }
        fetchDistanceFromServer()
    }, [lpname, dpname])

    console.log(distance)


    const handlePortChange = async (index, field, value) => {
        const updatedRows = [...row];
        updatedRows[index][field] = value; // مقدار جدید را در ردیف ذخیره کنید
        setLpName(updatedRows[index].Load_Port);
        setDpName(updatedRows[index].DischargePort)
        updatedRows[index].Distance = distance;
        setRow(updatedRows);
    }
    // بررسی و ارسال به سرور برای محاسبه فاصله
    //     if (updatedRows[index].Load_Port && updatedRows[index].DischargePort) {
    //         const distance = await fetchDistanceFromServer(
    //             updatedRows[index].Load_Port,
    //             updatedRows[index].DischargePort
    //         );
    //         updatedRows[index].Distance = distance; // مقدار فاصله را ذخیره کنید
    //     }

    //     setRow(updatedRows); // به‌روزرسانی state
    // };
    console.log(row)

    const handleAddRow = () => {
       
        let updatedRows = [...row];
        updatedRows = {...row, Id: row.length + 1,  Port_Status: '', Load_Port: '', DischargePort: '', Distance:0}
          
           setRow([...row,updatedRows])
           
           
      
        // const lastRow = updatedRows[updatedRows.length - 1];
       

        // اگر ردیف قبلی وجود دارد، فاصله را محاسبه کنید
        // if (lastRow?.DischargePort) {
            // distance =  setDistance(lastRow.DischargePort, "بندر جدید");
       // }


    }
    //    


    // const recalculateDistances = async (updatedRows) => {
    //     for (let i = 1; i < updatedRows.length; i++) {
    //         if (updatedRows[i - 1].DischargePort && updatedRows[i].Load_Port) {
    //             const distance = await fetchDistanceFromServer(
    //                 updatedRows[i - 1].DischargePort,
    //                 updatedRows[i].Load_Port
    //             );
    //             updatedRows[i].Distance = distance;
    //         }
    //     }
    //     setRow(updatedRows);
    // };

    // const moveRowUp = (index) => {
    //     if (index === 0) return; // اولین ردیف نمی‌تواند بالا برود
    //     const updatedRows = [...row];
    //     [updatedRows[index], updatedRows[index - 1]] = [updatedRows[index - 1], updatedRows[index]];
    //     recalculateDistances(updatedRows);
    // };

    // const moveRowDown = (index) => {
    //     if (index === row.length - 1) return; // آخرین ردیف نمی‌تواند پایین برود
    //     const updatedRows = [...row];
    //     [updatedRows[index], updatedRows[index + 1]] = [updatedRows[index + 1], updatedRows[index]];
    //     recalculateDistances(updatedRows);
    // };


    return (
        <>
            <button onClick={handleAddRow}> Add Row</button>
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Load_Port</th>
                            <th>Discharge Port</th>

                        </tr>
                    </thead>
                    <tbody>
                        {row.map((rows, index) => (
                            <tr key={rows.Id}>
                                <td>{rows.Id}</td>
                                <td>
                                    <input
                                        type="text"

                                        onChange={(e) => handlePortChange(index, 'Load_Port', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"

                                        onChange={(e) => handlePortChange(index, 'DischargePort', e.target.value)}
                                    />
                                </td>
                                <td>{rows.Distance !== null ? rows.Distance : '...'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}