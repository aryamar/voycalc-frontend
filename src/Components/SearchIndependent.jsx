
import React, { useState } from "react"

export default function SearchIndependent() {




    const [rows, setRows] = useState([
        { id: 1, loadingPort: "", dischargePort: "", cargo: "", tonnage: "", cost: "" },
    ]);

    // تابع برای اضافه کردن ردیف جدید
    const addRow = () => {
        const newRow = {
            id: rows.length + 1, // تعیین ID جدید
            loadingPort: "",
            dischargePort: "",
            cargo: "",
            tonnage: "",
            cost: "",
        };
        setRows([...rows, newRow]);
    };

    // تابع برای حذف ردیف
    const deleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    // تابع برای تغییر مقدار فیلد در یک ردیف خاص
    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value; // مقدار فیلد را برای ردیف مشخص تغییر بده
        setRows(updatedRows);
    };

    // شبیه‌سازی جستجوی پورت‌ها (در اینجا باید داده‌ها از سرور دریافت شود)
    const mockPortSearch = (search) => {
        const ports = ["Port A", "Port B", "Port C", "Port D", "Port E"]; // لیست نمونه
        return ports.filter((port) => port.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div>
            <button onClick={addRow} className="btn btn-primary mb-3">
                Add Row
            </button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Loading Port</th>
                        <th>Discharge Port</th>
                        <th>Cargo</th>
                        <th>Tonnage</th>
                        <th>Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                                <input
                                    type="text"
                                    value={row.loadingPort}
                                    onChange={(e) => handleChange(index, "loadingPort", e.target.value)}
                                    placeholder="Search Loading Port"
                                    className="form-control"
                                    list={`loadingPortList-${row.id}`}
                                />
                                <datalist id={`loadingPortList-${row.id}`}>
                                    {mockPortSearch(row.loadingPort).map((port, i) => (
                                        <option key={i} value={port} />
                                    ))}
                                </datalist>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.dischargePort}
                                    onChange={(e) => handleChange(index, "dischargePort", e.target.value)}
                                    placeholder="Search Discharge Port"
                                    className="form-control"
                                    list={`dischargePortList-${row.id}`}
                                />
                                <datalist id={`dischargePortList-${row.id}`}>
                                    {mockPortSearch(row.dischargePort).map((port, i) => (
                                        <option key={i} value={port} />
                                    ))}
                                </datalist>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.cargo}
                                    onChange={(e) => handleChange(index, "cargo", e.target.value)}
                                    placeholder="Cargo"
                                    className="form-control"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={row.tonnage}
                                    onChange={(e) => handleChange(index, "tonnage", e.target.value)}
                                    placeholder="Tonnage"
                                    className="form-control"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={row.cost}
                                    onChange={(e) => handleChange(index, "cost", e.target.value)}
                                    placeholder="Cost"
                                    className="form-control"
                                />
                            </td>
                            <td>
                                <button onClick={() => deleteRow(row.id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};





