import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import Charterer from './ChartererUrl'
import PortStatus from './PortStatusUrl'
import CommodityUrl from './CommodityUrl'
import CalculationUrl from './CalculationUrl'
import DistanceUrl from './DistanceUrl'
import PortsUrl from './PortsUrl'
import Formula from './Formula'
import Testgetfromdb from './Testgetfromdb'
import down from '../Images/down.png'
import up from '../Images/up.png'
import dlt from '../Images/dlt.png'
import plus from '../Images/plus.png'



export default function OperationField() {


    const [keychange, setKeychange] = useState({})
    const [selectedRow, setSelectedRow] = useState(null)
    const [lpname, setLpName] = useState('')
    const [dpname, setDpName] = useState('')
    const [faseleh, SetFaseleh] = useState(0)
    const [idRec, setIdRec] = useState({})
    const [index, setIndex] = useState(null)
    const [addsteamdays, setAddSteamdays] = useState(0)
    const [dispdays, setDispDays] = useState(0)
    const [dpRate, setDpRate] = useState(0)
    const [loadPortDays, setLpDay] = useState(0)
    const [loadPortRate, setLpRate] = useState(0)


    const getChData = Charterer()
    const getPortStat = PortStatus()
    const getCommodity = CommodityUrl()
    const getLoadPort = PortsUrl()

    console.log('keychange:', keychange)

    const [row, setRow] = useState([
        {
            Select: null,
            Id: 1,
            Port_Status: 'Load Port',
            Charterer: '',
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
   



    const handleChange = (index, field, value) => {
        const updatedRows = [...row];
        updatedRows[index][field] = value; // تغییر مقدار فیلد مورد نظر در ردیف مشخص
        setRow(updatedRows);

        if (index === 0) {

            setLpRate(updatedRows[index].Load_Rate)
            updatedRows[index].LP_Days = keychange.LP_Days
            return { ...row, Distance: 0 }
        }
        if (index >= 0) {
            setLpName(updatedRows[index].Port_Name)
            setLpDay(updatedRows[index].LP_Days)
            setLpRate(updatedRows[index].Load_Rate)
            setDpName(updatedRows[index - 1].Port_Name);
            setDispDays(updatedRows[index - 1].LP_Days)
            setDpRate(updatedRows[index - 1].Load_Rate)
            updatedRows[index].LP_Days = keychange.DisPort_Days

        }

        // if (lpname && dpname) {
        //     updatedRows[index]['Distance'] = faseleh
        //     setRow(updatedRows)
        //     console.log('updateDistance', updatedRows)
        // }

    }



    const [updateFormula, setUpdateFormula] = useState({
        lpdays: 0,
        dpdays: 0,
        ladendays: 0,
        ballastdays: 0,
        ttlsteamdays: 0,
        ttlportdays: 0,
        addportdays: 0,
        addsteamdays: 0,
        updatesteamdays: 0,
        values: 0,
    })

    keychange.LoadPort = dpname
    keychange.DischargePort = lpname
    keychange.DischargeRate = loadPortRate
    keychange.LoadRate = dpRate
    keychange.DisPort_Days = updateFormula.dpdays



    const updateFormul = (formulaResult) => {
        setUpdateFormula(formulaResult)
    }


    const onUpdateDistance = (onDistanceUpdate) => {
        SetFaseleh(onDistanceUpdate)
    }


    const mockFilterLoadPort = (lpid) => {
        if (!lpid) {
            return getLoadPort
        }
        const filteredLoadPort = getLoadPort.filter
            (lp => lp.fromport.toLowerCase().includes(lpid.toLowerCase()))
        return filteredLoadPort
    }

    const mockFilterCharterer = (chid) => {
        if (!chid) {
            return getChData
        }
        const filteredCharterer = getChData.filter
            (ch => ch.Charterer_Name.toLowerCase().includes(chid.toLowerCase()))
        return filteredCharterer
    }

    const mockfilterPortStatus = (filid) => {
        if (!filid) {
            return getPortStat;
        }
        const filteredPortStatus = getPortStat.filter
            (f => f.Port_Status.toLowerCase().includes(filid.toLowerCase()));
        return filteredPortStatus;
    }

    const mockCommoditySearch = (search) => {
        if (!search) {
            return getCommodity;
        }
        const filtered = getCommodity.filter((comm) =>
            comm.Commodity.toLowerCase().includes(search.toLowerCase())
        );
        console.log("Filtered Commodities:", filtered);
        return filtered;
    };


    //select row from <dr></dr> bootstrap in return section 
    // for getting all <dt></dt> inside of <dr></dr> in <tbody></tbody>
    const SelectedRow = (r) => {
        setSelectedRow(r)
    };

    //Add Row from getting all rows in const [selectedRow, setSelectedRow] = useState([]) 
    //thereafter give the same row`s title to the new raw. 

    const handleAddRow = (id, index) => {

        // console.log('Row Length:', row.length)
        // console.log("selectedRow:", selectedRow)
        if (row.length > index) {
            const newRow = {
                ...row, Id: row.length + 1, Port_Status: '',
                Charterer: '', Cargo_Qtty: null, Commodity: '',
                Commission: null, Load_Port: '', Load_Rate: null,
                Load_Term: '', LP_Days: null, LP_Cost: null,
                DischargePort: '', Discharge_Rate: null, Dis_Term: '',
                DisPort_Days: null, DisPort_Cost: null, TTL_Steam_Days: null,
                Distance: null, Add_Port_Days: null, Add_Steam_Days: null,
                TTL_Port_Days: null, Ballast_Days: null, Laden_Days: null
            }; // ایجاد ردیف جدید با ID جدید
            setRow([...row, newRow]); //اضافه کردن ردیف جدید به جدول  
        }
    };
    console.log('Row:', row)
    //filtering the data fetched from database through passing (search) 
    // to the relevant <dt></dt> Commodity and getting its value from Rows.Commodity that is mapped there.



    const fadeRow = (id, index) => {
        if (index !== 0) {
            const res = row.filter((r) => r.Id !== id)
            const reIndexedRows = res.map((rows, index) => ({
                ...rows, Id: index + 1
            }
            ))
            setRow(reIndexedRows)
            const deleteRow = [...row]
            const x = deleteRow.map(dr => dr.Load_Port)
            console.log('res', x)
            console.log('row', row)
            setIdRec(id)
        }
        else {
            alert("This row cannot be deleted")
            return
        }
    }

    //This function get index of row by clicking button in relevant element and
    //  move up the row as per updated index.

    const selectUpRow = (index, field, value) => {
        if (index === 0) return
        const updatedRows = [...row];// this variable keep the current row
        updatedRows[index][field] = value;
        updatedRows[0]['Distance'] = 0;
        setRow(updatedRows);
        [updatedRows[index - 1], updatedRows[index]] = [
            updatedRows[index],
            updatedRows[index - 1],
        ];
        setRow(updatedRows);
        if (updatedRows) {
            const updatedId = updatedRows.map((row, index) => (
                { ...row, Id: index + 1 }
            ))
            console.log('updated Id:', updatedId)
            setRow(updatedId)
        }
    }

    //This function get index of row by clicking button in relevant element and
    //  move down the row as per updated index.
    const selectDownRow = (index) => {
        if (index === row.length - 1) return; // آخرین ردیف نمی‌تواند به پایین منتقل شود
        const updatedRows = [...row];
        [updatedRows[index], updatedRows[index + 1]] = [
            updatedRows[index + 1],
            updatedRows[index],
        ];
        setRow(updatedRows);
        if (updatedRows) {
            const updateId = updatedRows.map((row, index) => (
                { ...row, Id: index + 1 }
            ))
            setRow(updateId)
        }
    }

    const getFaseleh = (index, field, value) => {
        const fasUpdating = [...row]
        fasUpdating[index][field] = value
        if (lpname || dpname) {
            fasUpdating[index]["Distance"] = faseleh
            setRow(fasUpdating)
        }
        if (index === 0) return { ...row, "Distance": null }

    }
    const getIndex = (index) => {
        setIndex(index)
    }
    useEffect(() => {
        setIndex(index)
    }, [index])

    return (
        <>
            {/* <div className='operationdiv'> */}
            <DistanceUrl lpname={lpname} dpname={dpname} keychange={keychange} onDistanceUpdate={onUpdateDistance} />
            <Formula keychange={keychange} onUpdate={updateFormul} faseleh={faseleh} />

            {/* <Testgetfromdb keychange={keychange} distance={faseleh} indexz={index} dpname={dpname} /> */}
            <section>
                < div style={{
                    marginLeft: '5px',
                    width: '99%',
                    height: "145px", // ارتفاع قاب
                    overflow: "auto", // فعال کردن اسکرول
                    border: "1px solid #ccc", // حاشیه برای قاب
                    borderRadius: '20px',
                    float: 'left',
                }}
                >
                    <table>
                        {/* <fieldset className='customLegend' style={{ marginTop: '10px', padding: '1em 0' }}> */}
                        < div className="table table-bordered table-striped " >
                            <thead>
                                <tr style={{fontSize:'12px'}} >
                                    <th style={{ textAlign: 'center', position: 'sticky', left: '0', top: '0', background: 'white' }}>ID</th>
                                    <th style={{ textAlign: 'center', position: 'sticky', left: '30px', top: '0', background: 'white',fontSize:'11px' }} >MoveUp/Action/MoveDown</th>
                                    <th>Port_Status</th>
                                    <th>Charterer</th>
                                    <th>Cargo_Qtty</th>
                                    <th>Commodity</th>
                                    <th>Commission</th>
                                    <th>Load/Discharge_Port_Name</th>
                                    <th>Distance</th>
                                    <th>Load/Dis_Rate</th>
                                    <th>Load/Dis_Term</th>
                                    <th>Port_Days</th>
                                    <th>L/D_Port_Cost</th>
                                </tr>
                            </thead>

                            <tbody >
                                {/* <label htmlFor='Cargoqtty' className={`${erropen ? 'labelerr' : ''}`} style={{ marginLeft: '20px', borderRadius: '8px' }} >{errmsgdeadweught}</label> */}
                                {/* <legend>Voy.Spec</legend> */}
                                {/* <section style={{ width: '100%' }} > */}
                                {/* <div className='box' style={{ width: '25% ' }} > */}

                                {
                                    row.map((rows, index) => (

                                        <tr key={rows.Id} style={{ textAlign: 'center' }}  >

                                            <td style={{ textAlign: 'center', position: 'sticky', left: '0', background: 'white' }}


                                            >{rows.Id}
                                                {/* <input id='select'
                                                style={{ zoom: '1.5', marginTop: "5px", position: 'sticky' }} type="checkbox"
                                                onClick={() => {
                                                    // setChecked(true)
                                                    SelectedRow(rows)
                                                    selectedRowUpdate(rows.Id)
                                                }}
                                            /> */}
                                            </td>



                                            <td style={{ textAlign: 'center', position: 'sticky', left: '30px', background: 'white' }} >

                                                {/* <button className='btn btn-info btn-sm'
                                                    style={{ marginRight: '5px', position: 'sticky',fontSize:'10px' }}
                                                    onClick={() => selectUpRow(index, 'Distance', null)}
                                                // disabled={index === 0 }
                                                > */}
                                                    <img className='img' title='Move Up' src={up} alt='up.png' height='25px' width='25px'  onClick={() => selectUpRow(index, 'Distance', null)}/>
                                                {/* </button> */}


                                                {/* <button
                                                    className="btn btn-success btn-sm"
                                                    style={{ marginRight: '5px', position: 'sticky',fontSize:'10px' }}
                                                    onClick={() => {
                                                        handleAddRow(rows.Id, index)
                                                        SelectedRow(rows)
                                                        getIndex(index)
                                                    }}
                                                    onBlur={() => getFaseleh(index, 'Distance')}
                                                    title='Add Row'
                                                > */}
                                                  <img className='img' title='Add Row' src={plus} alt='plus.png' height='40px' width='40px'  onClick={() => {
                                                        handleAddRow(rows.Id, index)
                                                        SelectedRow(rows)
                                                        getIndex(index)
                                                    }}/> 
                                                {/* </button> */}

                                                {/* <button className='btn btn-danger btn-sm'
                                                    style={{ marginRight: '5px', position: 'sticky',fontSize:'10px' }}
                                                    onClick={e => {
                                                        fadeRow(rows.Id, index)

                                                    }} 
                                                >*/}
                                                   <img className='img' title='Delete Row'   src={dlt} alt='delete.png' height='25px' width='30px'   onClick={e => {
                                                        fadeRow(rows.Id, index)

                                                    }} />
                                                {/* </button> */}

                                                {/* <button className='btn btn-info btn-sm'
                                                    style={{ marginRight: '5px', position: 'sticky',fontSize:'10px' }}
                                                    onClick={() => selectDownRow(index)}
                                                    disabled={index === rows.length - 1}
                                                > */}
                                                   <img className='img' title='Move Down' src={down} alt='down.png' height='25px' width='25px' onClick={() => selectDownRow(index)}/>
                                                {/* </button> */}
                                            </td>

                                            <td>
                                                <input type="search" className='form-control'
                                                    style={{ width: '120px' }}
                                                    value={rows.Port_Status}
                                                    onChange={e => {
                                                        handleChange(index, 'Port_Status', e.target.value)
                                                    }}
                                                    list={`Port_Status-${rows.Id}`}
                                                />

                                                <datalist id={`Port_Status-${rows.Id}`}>
                                                    {mockfilterPortStatus(rows.Port_Status).map((ps, i) => (
                                                        <option key={i} value={ps.Port_Status}></option>
                                                    ))}
                                                </datalist>
                                            </td>

                                            <td>
                                                <input type="search" className='form-control' id="Charterer" name="Charterer" autoComplete='off'
                                                    style={{ width: '200px' }}
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, Charterer: e.target.value })
                                                        handleChange(index, 'Charterer', e.target.value)
                                                    }}
                                                    value={rows.Charterer}
                                                    list={`Charterer-${rows.Id}`}
                                                />
                                                <datalist id={`Charterer-${rows.Id}`}>
                                                    {mockFilterCharterer(rows.Charterer).map((ch, i) => (
                                                        <option key={i} value={ch.Charterer_Name}></option>
                                                    ))}
                                                </datalist>
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="Cargoqtty" name="Cargoqtty"
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, Cargo_quantity: e.target.value })
                                                        handleChange(index, 'Cargo_Qtty', e.target.value)
                                                    }} value={rows.Cargo_Qtty} />
                                            </td>


                                            <td>
                                                <input type="search" className='form-control' id="Commodity" name="Commodity"
                                                    placeholder='Commodity...'
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, Commodity: e.target.value })
                                                        handleChange(index, 'Commodity', e.target.value)
                                                    }}
                                                    autoComplete='off'
                                                    onClick={(e) => {
                                                        // setOpen(false)
                                                        // setSearchValue(searchValue)

                                                    }}
                                                    value={rows.Commodity}
                                                    list={`Commodity-${rows.Id}`} />

                                                <datalist id={`Commodity-${rows.Id}`}>
                                                    {mockCommoditySearch(rows.Commodity).slice(0, 2).map((commod, i) => (
                                                        <option key={i} value={commod.Commodity} />
                                                    ))}
                                                </datalist>
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="Commission" name="Commission" onChange={e => {
                                                    setKeychange({ ...keychange, Commission: e.target.value })
                                                    handleChange(index, 'Commission', e.target.value)
                                                }} value={rows.Commission}
                                                />
                                            </td>

                                            <td>
                                                < div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '8px', height: '26px' }}>

                                                    {/* { */}
                                                    {/* // rows.Port_Status === "Load Port" ? */}
                                                    <input
                                                        className='form-control  mb-3 '
                                                        style={{ fontSize: '15px', width: '250px', fontWeight: 'bold' }}
                                                        id='lpname'
                                                        name='lpname'
                                                        type="search"
                                                        placeholder="Enter port"
                                                        // value={}
                                                        autoComplete='on'
                                                        onSelect={() => setLpName(rows.Load_Port)}

                                                        onChange={(e) => {
                                                            // setOpen(open)
                                                            setLpName(rows.Load_Port)
                                                            handleChange(index, 'Port_Name', e.target.value)
                                                            setKeychange({ ...keychange, LoadPort: e.target.value })
                                                        }}
                                                        onClick={(e) => {
                                                            // setOpen(false)
                                                            setLpName(rows.Load_Port)
                                                            handleChange(index, 'Port_Name', e.target.value)
                                                            setKeychange({ ...keychange, LoadPort: e.target.value })
                                                            //setLpName(keychange.LoadPort)

                                                        }}
                                                        onBlur={e => {
                                                            setLpName(rows.Load_Port)
                                                            handleChange(index, 'Port_Name', e.target.value)
                                                            setKeychange({ ...keychange, LoadPort: e.target.value })
                                                        }}
                                                        list={`LoadPort-${rows.Id}`}
                                                    />


                                                    {/* // <input
                                                        //     className='form-control  mb-3 '
                                                        //     style={{ fontSize: '12px', width: '250px' }}
                                                        //     id='dpname'
                                                        //     name='dpname'
                                                        //     type="search"
                                                        //     value={rows.DischargePort}
                                                        //     placeholder="Enter Dis port"
                                                        //     autoComplete='off'
                                                        //     onChange={(e) => {
                                                        //         setDpName(e.target.value)
                                                        //         setKeychange({ ...keychange, Discharge_Port: e.target.value })
                                                        //         handleChange(index, 'DischargePort', e.target.value)
                                                        //         // selectedRowUpdate(index)
                                                        //     }}
                                                        //     onClick={(e) => {
                                                        //         setDpName(e.target.value)
                                                        //         setKeychange({ ...keychange, Discharge_Port: e.target.value })
                                                        //         handleChange(index, 'DischargePort', e.target.value)
                                                        //         // selectedRowUpdate(index)
                                                        //     }}
                                                        //     list={`DisPort-${rows.Id}`}
                                                        // />

                                                // } */}
                                                    <datalist id={`LoadPort-${rows.Id}`}>
                                                        {mockFilterLoadPort(rows.Port_Name).slice(0, 1).map((lp, i) => (
                                                            <option key={i} value={lp.fromport} />
                                                        ))}
                                                    </datalist>

                                                    {/* <datalist id={`DisPort-${rows.Id}`}>
                                                    {mockFilterDisPort(rows.DischargePort).slice(0, 1).map((dp, i) => (
                                                        <option id={i} value={dp.Toport} />
                                                    ))}
                                                </datalist> */}

                                                </div>
                                            </td>

                                            <td>
                                                <input type='number'
                                                    className='form-control'
                                                    id='Distance'
                                                    name='Distance'
                                                    style={{ width: '100px' }}
                                                    value={rows.Distance}
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, Distance: e.target.value })
                                                        handleChange(index, 'Distance', e.target.value)
                                                    }}
                                                    onClick={e => {
                                                        handleChange(index, 'Distance', e.target.value)
                                                        setKeychange({ ...keychange, Distance: e.target.value })

                                                    }}
                                                    onBlur={(e) => getFaseleh(index, 'Distance', e.target.value)}

                                                />

                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="Loadrate" name="Loadrate"
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, LoadRate: e.target.value })
                                                        handleChange(index, 'Load_Rate', e.target.value)
                                                    }}
                                                    onBlur={e => {
                                                        setKeychange({ ...keychange, LoadRate: e.target.value })
                                                        handleChange(index, 'Load_Rate', e.target.value)
                                                    }}
                                                    onClick={e => {
                                                        setKeychange({ ...keychange, LoadRate: e.target.value })
                                                        handleChange(index, 'Load_Rate', e.target.value)
                                                    }}
                                                    value={rows.Load_Rate}
                                                />

                                            </td>

                                            <td>

                                                <input type="text" className='form-control' id="LoadTerm" name="LoadTerm"
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, LoadTerm: e.target.value })
                                                        handleChange(index, 'Load_Term', e.target.value)
                                                    }} value={rows.Load_Term} />
                                            </td>

                                            <td>

                                                < input type="number" className='form-control' id="LportDays" name="LportDays"
                                                    value={rows.LP_Days}
                                                    style={{ color: 'red', fontWeight: 'bold' }}
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, LportDays: e.target.value })
                                                        handleChange(index, 'LP_Days', e.target.value)
                                                    }}
                                                />
                                                <input type="number" hidden={true} className='form-control' id="DportDays" name="DportDays"
                                                    //value={Number.parseFloat(keychange.DisPort_Days.toFixed(3)) || 0}
                                                    onChange={e => setKeychange({ ...keychange, DportDays: e.target.value })}
                                                    style={{ color: 'red', fontWeight: 'bold' }} />

                                            </td>


                                            <td>
                                                <input type="number" className='form-control' id="LPortCost" name="LPortCost"
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, LPortCost: e.target.value })
                                                        handleChange(index, 'LP_Cost', e.target.value)
                                                    }} value={rows.LP_Cost} />
                                            </td>

                                            {/* <td>

                                                <input type="number" className='form-control' id="ttlsteamdays" name="ttlsteamdays"
                                                    value={updateFormula.Steam_Days}
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, Steam_Days: e.target.value })
                                                        handleChange(index, 'TTL_Steam_Days', e.target.value)
                                                    }} />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="AddPortDays" name="AddPortDays"
                                                    onChange={(e) => {
                                                        setKeychange({ ...keychange, AddPortDays: e.target.value })
                                                        handleChange(index, 'Add_Port_Days', e.target.value)
                                                    }} value={rows.Add_Port_Days}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="AddSteamDays" name="AddSteamDays"
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, AddSteamDays: e.target.value })
                                                        setAddSteamdays(e.target.value)
                                                        handleChange(index, 'Add_Steam_Days', e.target.value)
                                                    }} value={rows.Add_Steam_Days} />
                                            </td> */}

                                            {/* <td>
                                                <input type="number" className='form-control' id="PortDays" disabled name="PortDays"
                                                    value={rows.TTL_Port_Days}
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, PortDays: e.target.value })
                                                        handleChange(index, 'TTL_Port_Days', e.target.value)
                                                    }} style={{ color: 'red', fontWeight: 'bold' }} />
                                            </td>
                                            <td>
                                                <input type="number" style={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }}
                                                    className='form-control' id="Ballast Days" value={rows.Ballast_Days} name="Ballast Days"
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, Ballast_Days: e.target.value })
                                                        handleChange(index, 'Ballast_Days', e.target.value)
                                                    }} />
                                            </td>

                                            <td>
                                                <input type="number" style={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }} className='form-control'
                                                    id="Laden Days" name="Laden Days" value={rows.Laden_Days}
                                                    onChange={e => {
                                                        setKeychange({ ...keychange, Laden_Days: e.target.value })
                                                        handleChange(index, 'Laden_Days', e.target.value)

                                                    }} />
                                            </td> */}
                                        </tr>

                                    ))
                                }
                            </tbody >
                        </div >
                    </table >
                </div >
            </section>
            <div className="container">
                <div className="row">
                    <div className="col">Add P/Days</div>
                    <div className="col">add S/Days</div>
                    <div className="col">Ttl.Stm/days</div>
                    <div className="col">Ttl.P/Days</div>
                    <div className="col">B/Days</div>
                    <div className="col">L/Days</div>

                </div>

            </div>
            {/* <div className='col col-md-12' style={{ display: 'flex', width: '90%', margin: 'auto', border: 'solid' }}>

                            <label htmlFor="AddPortDays"> </label>
                            <label htmlFor="AddSteamDays"> </label>
                            <label htmlFor="ttlsteamdays" ></label>
                            <label htmlFor="PortDays" ></label><br />
                            <label htmlFor="Ballast Days">  </label>
                            <label htmlFor="Laden Days" style={{ marginLeft: '40px' }}>  </label>
                        </div> */}
            <div className='grid gap-3 ' style={{ display: 'flex', width: '90%', margin: 'auto' }}>

                <input type="number" className='form-control' id="AddPortDays" name="AddPortDays"

                    onChange={(e) => {
                        setKeychange({ ...keychange, AddPortDays: e.target.value })

                    }}

                />

                <input type="number" className='form-control' id="AddSteamDays" name="AddSteamDays"
                    onChange={e => {
                        setKeychange({ ...keychange, AddSteamDays: e.target.value })
                        setAddSteamdays(e.target.value)
                    }}

                />

                <input type="number"
                    className='form-control'
                    id="ttlsteamdays"
                    name="ttlsteamdays"
                    value={parseFloat(updateFormula.ttlsteamdays.toFixed(3)) || 0}
                    onChange={e => setKeychange({ ...keychange, Steam_Days: e.target.value })}
                />

                <input type="number" className='form-control'
                    id="PortDays" disabled name="PortDays"
                    value={Number.parseFloat(updateFormula.ttlportdays.toFixed(3)) || 0}
                    onChange={e => setKeychange({ ...keychange, PortDays: e.target.value })}
                    style={{ color: 'red', fontWeight: 'bold' }}
                />

                <input type="number"
                    style={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }}
                    className='form-control' id="Ballast Days"
                    value={Number.parseFloat(updateFormula.ballastdays.toFixed(3)) || 0}
                    name="Ballast Days"
                    onChange={e => setKeychange({ ...keychange, Ballast_Days: e.target.value })}
                />

                <input type="number"
                    style={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }}
                    className='form-control' id="Laden Days"
                    name="Laden Days"
                    value={Number.parseFloat(updateFormula.ladendays.toFixed(3)) || 0}
                    onChange={e => setKeychange({ ...keychange, Laden_Days: e.target.value })}
                />


            </div>
            {/* < div
                style={{
                    marginLeft: '5px',
                    width: "100%", // عرض قاب
                    height: "200px", // ارتفاع قاب
                    overflow: "auto", // فعال کردن اسکرول
                    border: "1px solid #ccc", // حاشیه برای قاب
                    borderRadius: '20px',
                    float: 'left',
                }}> */}


            {/* </div> */}
            {/* </div> */}
        </>
    )

}
