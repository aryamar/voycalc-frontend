import React, { useEffect, useState } from 'react'
import Formula from './Formula'
import DistanceUrl from './DistanceUrl'

export default function Testgetfromdb() {

    const [dpname, setDpname] = useState('')
    const [lpname, setLpname] = useState('')
    const [dportDays, setDportDays] = useState('')
    const [dpRate, setDpRate] = useState(0)
    const [distance, setDistance] = useState(0)
    const [lpdays, setLpdays] = useState(0)


    const [keychange, setKey] = useState(
        [{
            id: 1,
            Vessel_Name: '', Deadweight: null, Cargo_quantity: null, Vessel_Type: '', Distance: 0,
            IFO_Qtty: null, DO_Qtty: null, IFOAtSea: null, MDOAtSea: null, IFOAtPort: null,
            MDOAtPort: null, Speed_Ballast: null, IFO_Price: null, MDO_Price: null,
            TTL_Fuel_Price: null, PortDays: null, Steam_Days: null, Commission: null,
            LoadPort: "", DischargePort: "", LportDays: null, DportDays: null, LoadRate: null,
            DischargeRate: null, StandingCost: null, BreakEven: null, TTLDays: null, OtherExpences: null,
            DailyHire: null, VoyageNumber: null, min_plus_1: null, Charterer: null, LPortCost: null,
            DPortCost: null, AddPortDays: null, AddSteamDays: null, Commodity: null,
            TotalCost: null, LoadTerm: "", DischargeTerm: "", Ttl_Commission: null,
            Ttl_Do_Price: null, Ttl_Fo_Price: null, Speed_Laden: null, Port_Status: null,
            Ballast_Days: null, Laden_Days: null,
        }]
    );

    const addRow = () => {
        const addNewRow = {
            ...keychange, id: keychange.length + 1, Vessel_Name: '',
            Deadweight: null, Cargo_quantity: null, Vessel_Type: '', Distance: null,
            IFO_Qtty: null, DO_Qtty: null, IFOAtSea: null, MDOAtSea: null, IFOAtPort: null,
            MDOAtPort: null, Speed_Ballast: null, IFO_Price: null,
            MDO_Price: null, TTL_Fuel_Price: null, PortDays: null, Steam_Days: null,
            Commission: null, LoadPort: "", DischargePort: "", LportDays: null,
            DportDays: null, LoadRate: null, DischargeRate: null, StandingCost: null,
            BreakEven: null, TTLDays: null, OtherExpences: null, DailyHire: null,
            VoyageNumber: null, min_plus_1: null, Charterer: null, LPortCost: null,
            DPortCost: null, AddPortDays: null, AddSteamDays: null, Commodity: null,
            TotalCost: null, LoadTerm: "", DischargeTerm: "", Ttl_Commission: null,
            Ttl_Do_Price: null, Ttl_Fo_Price: null, Speed_Laden: null, Port_Status: null,
            Ballast_Days: null, Laden_Days: null,
        }
        setKey(prevkey => [...prevkey, addNewRow])
    }

    const updateKeychange = (index, Id, field, value) => {
        setKey(updateKeyCh => updateKeyCh.map(row => row.id === Id ? { ...row, [field]: value } : row))

        if (index > 0) {
            const updateChange = [...keychange]
            const updateKeychangeMap = updateChange.map(upKeyMap => upKeyMap.id === Id ? { ...upKeyMap, [field]: value } : upKeyMap)
            setDpname(updateKeychangeMap[index - 1].LoadPort)
            setDportDays(updateKeychangeMap[index - 1].LportDays)
            setDpRate(updateKeychangeMap[index - 1].LoadRate)
            setLpname(updateKeychangeMap[index].LoadPort)
            updateKeychangeMap[index].DischargePort = dpname
            updateKeychangeMap[index].DischargeRate = dpRate           
            updateKeychangeMap[index].LoadPort = lpname
            updateKeychangeMap[index].DportDays = dportDays
            updateKeychangeMap[index].LportDays = lpdays
            console.log('lpname:', lpname)
            console.log('dpname', dpname)
            console.log('updateKeyChangeMap:', updateKeychangeMap)
            setKey(updateKeychangeMap)
            console.log('keychange:', keychange)
            console.log('keychange items:', keychange.Cargo_quantity)

            if (distance) {
                updateKeychangeMap[index].Distance = distance;
            }
        }
    }
    keychange.LportDays = lpdays
    const [updateFormul, setUpdateFormul] = useState(
        {
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
        }
    )


    const updateformula = (getFormula) => {
        setUpdateFormul(getFormula)
    }

    const getDistance = (forTest) => {
        setDistance(forTest)
    }


    return (
        <>
            <Formula onUpdate={updateformula} Faseleh={distance} keychange={keychange} />
            <DistanceUrl lpname={lpname} dpname={dpname} onDistanceUpdate={getDistance} />

            <div>testgetfromdb
                < div style={{
                    margin: 'auto',
                    width: "70%", // عرض قاب
                    height: "315px", // ارتفاع قاب
                    overflow: "auto", // فعال کردن اسکرول
                    border: "1px solid #ccc", // حاشیه برای قاب
                    borderRadius: '20px',
                }}>

                    <table>
                        {/* <fieldset className='customLegend' style={{ marginTop: '10px', padding: '1em 0' }}> */}
                        < div className="table table-bordered table-striped " >
                            <thead style={{ textAlign: "center" }}>
                                <tr >
                                    <th style={{ position: 'sticky', left: '0', background: 'white' }}>ID</th>
                                    <th style={{ position: 'sticky', left: '32px' }} >
                                        <th>Add_Row/</th>
                                        <th> Delete/</th>
                                        <th>Move</th>
                                    </th>
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
                                    <th>TTL_Steam_Days</th>
                                    <th>Add_Port_Days</th>
                                    <th>Add_Steam_Days</th>
                                    <th>TTL_Port_Days</th>
                                    <th>Ballast_Days</th>
                                    <th>Laden_Days</th>
                                </tr>
                            </thead>

                            <tbody >
                                {
                                    keychange.map((rows, index) => (

                                        <tr key={rows.id} style={{ textAlign: 'center' }}  >

                                            <td style={{ textAlign: 'center', position: 'sticky', left: '0', background: 'white' }}
                                            >{rows.id}
                                            </td>

                                            <td style={{ position: 'sticky', left: '32px' }} >
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addRow(index)
                                                    }}
                                                    title='Add Row'
                                                >
                                                    +
                                                </button>

                                                <button className='btn btn-danger btn-sm'
                                                    style={{ marginLeft: '5px', position: 'sticky' }}
                                                    onClick={e => {


                                                    }}
                                                >
                                                    Delete
                                                </button>

                                                <button className='btn btn-info btn-sm'
                                                    style={{ marginLeft: '5px', position: 'sticky' }}

                                                    disabled={index === 0}
                                                >
                                                    UP
                                                </button>

                                                <button className='btn btn-info btn-sm'
                                                    style={{ marginLeft: '5px', position: 'sticky' }}

                                                    disabled={"index === rows.length - 1"}
                                                >
                                                    DN
                                                </button>
                                            </td>

                                            <td>
                                                <input type="search" className='form-control'
                                                    style={{ width: '120px' }}
                                                    value={keychange.Port_Status}
                                                    onChange={e => updateKeychange(index, rows.id, "Port_Status", e.target.value)
                                                    }
                                                    onBlur={e => updateKeychange(index, rows.id, "Port_Status", e.target.value)}
                                                    list={`Port_Status-${"rows.Id"}`}
                                                />
                                            </td>

                                            <td>
                                                <input type="search" className='form-control' id="Charterer" name="Charterer" autoComplete='off'
                                                    style={{ width: '200px' }}
                                                    onChange={e => {
                                                        updateKeychange(index, rows.id, 'Charterer', e.target.value)
                                                    }}
                                                    onBlur={e => updateKeychange(index, rows.id, "Charterer", e.target.value)}
                                                    value={keychange.Charterer}
                                                    list={`Charterer-${""}`}
                                                />

                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="Cargoqtty" name="Cargoqtty"
                                                    onChange={e => {
                                                        updateKeychange(index, rows.id, 'Cargo_quantity', e.target.value)
                                                    }}
                                                    onClick={e => updateKeychange(index, rows.id, 'Cargo_quantity', e.target.value)}
                                                    onBlur={e => updateKeychange(index, rows.id, 'Cargo_quantity', e.target.value)}
                                                    value={keychange.Cargo_quantity}
                                                />
                                            </td>


                                            <td>
                                                <input type="search" className='form-control' id="Commodity" name="Commodity"
                                                    placeholder='Commodity...'
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "Commodity", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "Commodity", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "Commodity", e.target.value)}
                                                    autoComplete='off'
                                                    value={keychange.Commodity}
                                                // list={`Commodity-${"rows.Id"}`} 

                                                />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="Commission" name="Commission"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "Commission", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "Commission", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "Commission", e.target.value)}
                                                    value={keychange.Commission}
                                                />
                                            </td>

                                            <td>
                                                < div style={{ display: 'flex', backgroundColor: 'white', borderRadius: '8px', height: '26px' }}>

                                                    {/* { */}
                                                    {/* // rows.Port_Status === "Load Port" ? */}
                                                    <input
                                                        className='form-control  mb-3 '
                                                        style={{ fontSize: '12px', width: '250px' }}
                                                        id='lpname'
                                                        name='lpname'
                                                        type="search"
                                                        placeholder="Enter port"
                                                        value={keychange.LoadPort}
                                                        autoComplete='on'
                                                        onChange={(e) => {
                                                            updateKeychange(index, rows.id, "LoadPort", e.target.value)
                                                        }}
                                                        onClick={(e) => {
                                                            updateKeychange(index, rows.id, "LoadPort", e.target.value)
                                                        }}
                                                        onBlur={(e) =>
                                                            updateKeychange(index, rows.id, "LoadPort", e.target.value)
                                                        }
                                                        list={`LoadPort-${"rows.Id"}`}
                                                    />
                                                </div>
                                            </td>

                                            <td>
                                                <input type='number'
                                                    className='form-control'
                                                    id='Distance'
                                                    name='Distance'
                                                    value={rows.Distance}
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "Distance", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "Distance", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "Distance", e.target.value)}
                                                />
                                            </td>

                                            <td>

                                                <input type="number" style={{width:'100px'}} className='form-control' id="Loadrate" name="Loadrate"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "LoadRate", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "LoadRate", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "LoadRate", e.target.value)}
                                                    value={rows.LoadRate}
                                                />
                                            </td>

                                            <td>

                                                <input type="text" className='form-control' id="LoadTerm" name="LoadTerm"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "LoadTerm", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "LoadTerm", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "LoadTerm", e.target.value)}
                                                    value={rows.LoadTerm}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="LportDays" name="LportDays"

                                                    style={{ color: 'red', fontWeight: 'bold' }}
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "LportDays", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "LportDays", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "LportDays", e.target.value)}
                                                    value={keychange.LportDays}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="LPortCost" name="LPortCost"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "LPortCost", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "LPortCost", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "LPortCost", e.target.value)}
                                                    value={keychange.LPortCost}
                                                />
                                            </td>

                                            <td>

                                                <input type="number" className='form-control' id="ttlsteamdays" name="ttlsteamdays"
                                                    value={keychange.Steam_Days}
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "Steam_Days", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "Steam_Days", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "Steam_Days", e.target.value)}

                                                />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="AddPortDays" name="AddPortDays"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "AddPortDays", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "AddPortDays", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "AddPortDays", e.target.value)}
                                                    value={keychange.AddPortDays}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="AddSteamDays" name="AddSteamDays"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "AddSteamDays", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "AddSteamDays", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "AddSteamDays", e.target.value)}
                                                    value={keychange.AddSteamDays}
                                                />
                                            </td>

                                            <td>
                                                <input type="number" className='form-control' id="PortDays" disabled name="PortDays"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "PortDays", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "PortDays", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "PortDays", e.target.value)}

                                                    value={keychange.PortDays}

                                                />
                                            </td>
                                            <td>
                                                <input type="number" style={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }}
                                                    className='form-control'
                                                    id="Ballast Days"
                                                    value={keychange.Ballast_Days}
                                                    name="Ballast Days"
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "Ballast_Days", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "Ballast_Days", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "Ballast_Days", e.target.value)}

                                                />
                                            </td>

                                            <td>
                                                <input type="number" style={{ fontSize: '14px', color: 'green', fontWeight: 'bold' }} className='form-control'
                                                    id="Laden Days"
                                                    name="Laden Days"
                                                    value={keychange.Laden_Days}
                                                    onChange={(e) => {
                                                        updateKeychange(index, rows.id, "Laden_Days", e.target.value)
                                                    }}
                                                    onClick={(e) => updateKeychange(index, rows.id, "Laden_Days", e.target.value)}
                                                    onBlur={(e) => updateKeychange(index, rows.id, "Laden_Days", e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody >
                        </div >
                    </table >
                </div >
            </div>
        </>
    )
}
