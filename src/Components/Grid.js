import React, { useState, useEffect } from 'react'
import { FaCalculator } from "react-icons/fa"
import axios from 'axios'
import './Grid.css'



function Grid() {

    const [keychange, setKeychange] = useState({})
    const [vsltype, setVsltype] = useState([]);
    const [vsl, setVsl] = useState([])
    const [isopen, setIsOpen] = useState(false)


    useEffect(() => {
        const getvslslist = (async () => {
            const getvsls = await axios.get('http://localhost:5000/vsllist')
            setVsl(getvsls.data)
        })
        getvslslist()
    }, [])

    useEffect(() => {
        const getVslType = (async () => {
            try {
                const gtType = await axios.get('http://localhost:5000/vsltype')
                setVsltype(gtType.data);
            } catch (err) {
                console.log(err);
            }
        })
        getVslType()
    }, []);


    const Handleclicksubmit = (async (e) => {
        e.preventDefault();
        try {
            const sentback = await axios.post('http://localhost:5000/calc', keychange)
            console.log(sentback)
            alert('The Data has been submitted successfully')
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    });
    // const close = (() => {
    //     const displaysize = document.getElementsByClassName('whole')
    //     if (document.body.width < 600) {
    //         displaysize.width = '100%'
    //     }
    // })
    const plus = (() => {

    })

    return (
        <>
            <div className='divgrid' >
                <legend className='titleLegend'>Voage Calculation</legend>
                <form className='form-control' style={{borderRadius:'25px'}}>
                    <div className='whole'>

                        <div className='sidebar1' >
                            <div className={`sidebar1 ${isopen ? "sidebar1-open" : 'sidebar1-close'}`} style={{ float: 'left', color: 'white', textAlign: 'center' }}>

                                <hr /><br /><br />
                                <a href='/voyestimation' style={{ color: 'white' }}> <h6 style={{ float: 'left', padding: '1em', width: 'auto', }} ><FaCalculator size='35px' /> Voy Calculation </h6> </a>
                            </div>
                        </div>
                        <div className='boxes' style={{ width: '10%', margin: "0" }} >
                        <label htmlFor='flexSwitchCheckDefault' style={{ color: 'yellow' }}>{!isopen ? "Close" : 'Open'}</label>
                            <div className='form form-switch' style={{ color: 'yellow' }}>
                           
                                <input className="form-check-input"
                                    style={{ float: 'left', width: '50px', height: '25px', color: 'orangered' }}
                                    type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                    onClick={() => setIsOpen(!isopen)} />
                            </div>
                        </div>
                        <div className='boxfieldset' >
                            <div style={{ float: 'left', width: '100%' }}>
                                <fieldset className='cLegend' style={{ marginTop: '20px' }}  >
                                    <legend className='Legend' >Vessel Spec</legend>
                                    <div className='boxes' style={{ width: '100%' }} >
                                        <div className='boxes' style={{ width: '35%' }} >
                                            <label htmlFor='Select' >Vessel Name:</label>
                                            <select className='form-control' id='Select' name="VesselName" style={{ marginLeft: '2px', padding: '2px', height: '28px' }} onChange={e => setKeychange({ ...keychange, Vessel_Name: e.target.value })} >
                                                <option>Search Vessels</option>
                                                {
                                                    vsl.map((v, index) => {
                                                        const { vesselname } = v
                                                        return <option key={index}>{vesselname}</option>
                                                    })
                                                }

                                            </select>

                                            <label htmlFor="VoyageNumber" >Voyage No:</label>
                                            <input type="text" className='form-control' id="VoyageNumber" name="VoyageNumber" onChange={e => setKeychange({ ...keychange, VoyageNumber: e.target.value })} />
                                        </div>

                                        <div className='boxes' style={{ width: '30%' }} >
                                            <label htmlFor="Deadweight" >Deadweight</label>
                                            <input type="text" className='form-control' name="Deadweight" id='Deadweight' onChange={e => setKeychange({ ...keychange, Deadweight: e.target.value })} />

                                            <label htmlFor='Select'>Vessel Type:</label>
                                            <select className='form-control' id='Select' name='VslType' style={{ height: '25px', padding: '1px' }} onChange={e => setKeychange({ ...keychange, Vessel_Type: e.target.value })}  >

                                                <option>Search ...</option>
                                                {
                                                    vsltype.map((coll, index) => {
                                                        return <option key={index} style={{ marginTop: '-5px' }} >{coll.Vessel_Type}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='boxes' style={{ width: '15%' }} >
                                            <label htmlFor="Speed"> Speed: </label>
                                            <input type="text" className='form-control' id='Speed' name="Speed" onChange={e => setKeychange({ ...keychange, Speed: e.target.value })} />

                                        </div>

                                    </div>

                                </fieldset>

                                <fieldset className='cLegend' >
                                    <legend className='Legend'>Voy.Spec</legend>

                                    <div className='boxes' style={{ width: '100%' }} >

                                        <div className='boxes' style={{ width: '33.3%' }} >
                                            <label htmlFor="Charterer" >Charterer:</label><br />
                                            <input type="text" className='form-control' id="Charterer" name="Charterer" onChange={e => setKeychange({ ...keychange, Charterer: e.target.value })} />

                                            <label htmlFor="Commodity" >Commodity:</label><br />
                                            <input type="text" className='form-control' id="Commodity" name="Commodity" onChange={e => setKeychange({ ...keychange, Commodity: e.target.value })} />

                                            <label htmlFor="Cargoqtty" >Cargo Qtty:</label><br />
                                            <input type="text" className='form-control' id="Cargoqtty" name="Cargoqtty" onChange={e => setKeychange({ ...keychange, Cargo_quantity: e.target.value })} />

                                            <label htmlFor="LoadPort" >LoadPort:</label><br />
                                            <input type="text" className='form-control' id="LoadPort" name="LoadPort" onChange={e => setKeychange({ ...keychange, LoadPort: e.target.value })} />

                                            <label htmlFor="DischargePort" >Dis.Port:</label><br />
                                            <input type="text" className='form-control' id="DischargePort" name="DischargePort" onChange={e => setKeychange({ ...keychange, DischargePort: e.target.value })} />
                                        </div>

                                        <div className='boxes' style={{ width: '33.3%' }} >

                                            <label htmlFor="PortDays" >Port Days:</label><br />
                                            <input type="text" className='form-control' id="PortDays" name="PortDays" onChange={e => setKeychange({ ...keychange, PortDays: e.target.value })} value={plus} />

                                            <label htmlFor="SteamDays" >Steam Days:</label><br />
                                            <input type="text" className='form-control' id="SteamDays" name="SteamDays" onChange={e => setKeychange({ ...keychange, Steam_Days: e.target.value })} />

                                            <label htmlFor="Distance">Distance: </label>
                                            <input type="text" className='form-control' id="Distance" name="Distance" onChange={e => setKeychange({ ...keychange, Distance: e.target.value })} />

                                            <label htmlFor="Loadrate">Load Rate: </label>
                                            <input type="text" className='form-control' id="Loadrate" name="Loadrate" onChange={e => setKeychange({ ...keychange, LoadRate: e.target.value })} />

                                            <label htmlFor="Dischargerate">Discharge Rate: </label>
                                            <input type="text" className='form-control' id="Dischargerate" name="Dischargerate" onChange={e => setKeychange({ ...keychange, DischargeRate: e.target.value })} />
                                        </div>

                                        <div className='boxes' style={{ width: '33.3%' }} >

                                            <label htmlFor="LPortCost">Load Port Cost: </label>
                                            <input type="text" className='form-control' id="LPortCost" name="LPortCost" onChange={e => setKeychange({ ...keychange, LPortCost: e.target.value })} />

                                            <label htmlFor="DischargePortCost" style={{ marginTop: '-5px' }}>Discharge Port Cost: </label>
                                            <input type="text" className='form-control' id="DischargePortCost" name="DischargePortCost" style={{ width: '' }} onChange={e => setKeychange({ ...keychange, DPortCost: e.target.value })} />

                                            <label htmlFor="LoadTerm" style={{ marginTop: '-5px' }}>Load Term: </label>
                                            <input type="text" className='form-control' id="LoadTerm" name="LoadTerm" style={{ width: '' }} onChange={e => setKeychange({ ...keychange, LoadTerm: e.target.value })} />

                                            <label htmlFor="DischargeTerm">Discharge Term: </label>
                                            <input type="text" className='form-control' id="DischargeTerm" name="DischargeTerm" style={{ width: '' }} onChange={e => setKeychange({ ...keychange, DischargeTerm: e.target.value })} />

                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className='cLegend' >
                                    <legend className='Legend'>Consumption</legend>
                                    <div className='boxes' style={{ width: '100%' }}>
                                        <div className='boxes' style={{ width: '25%' }} >

                                            <label htmlFor="DailyIFO"> IFO Daily: </label><br />
                                            <input type="text" className='form-control' id="DailyIFO" name="DailyIFO" style={{}} onChange={e => setKeychange({ ...keychange, IFO_Qtty: e.target.value })} />

                                            <label htmlFor="DailyMDO"> MDO_day: </label><br />
                                            <input type="text" className='form-control' id="DailyMDO" name="DailyMDO" style={{}} onChange={e => setKeychange({ ...keychange, MDO_Qtty: e.target.value })} />

                                        </div>

                                        <div className='boxes' style={{ width: '25%' }} >

                                            <label htmlFor="IFOprice">IFO Price: </label>
                                            <input type="text" className='form-control' id="IFOprice" name="IFOprice" style={{}} onChange={e => setKeychange({ ...keychange, IFO_Price: e.target.value })} />

                                            <label htmlFor="MDOprice">DO Price: </label>
                                            <input type="text" className='form-control' id="MDOprice" name="MDOprice" style={{}} onChange={e => setKeychange({ ...keychange, MDO_Price: e.target.value })} />
                                        </div>

                                        <div className='boxes' style={{ width: '25%' }} >
                                            <label htmlFor="IFOAtSea">IFO@Sea: </label>
                                            <input type="text" className='form-control' id="IFOAtSea" name="IFOAtSea" style={{}} onChange={e => setKeychange({ ...keychange, IFOAtSea: e.target.value })} />

                                            <label htmlFor="MDOAtSea">MDO@Sea: </label>
                                            <input type="text" className='form-control' id="MDOAtSea" name="MDOAtSea" style={{}} onChange={e => setKeychange({ ...keychange, MDOAtSea: e.target.value })} />
                                        </div>

                                        <div className='boxes' style={{ width: '25%' }} >
                                            <label htmlFor="MDOAtPort">MDO@Port: </label>
                                            <input type="text" className='form-control' id="MDOAtPort" name="MDOAtPort" style={{}} onChange={e => setKeychange({ ...keychange, MDOAtPort: e.target.value })} />

                                            <label htmlFor="IFOAtPort">IFO@Port: </label>
                                            <input type="text" className='form-control' id="IFOAtPort" name="IFOAtPort" style={{}} onChange={e => setKeychange({ ...keychange, IFOAtPort: e.target.value })} />
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className='cLegend'>
                                    <legend className='Legend'>Result</legend>
                                    <div className='boxes' style={{ width: '100%' }}>
                                        <div className='boxes' style={{ width: '25%' }} >
                                            <label htmlFor="Standingcost">Standing Cost: </label>
                                            <input type="text" className='form-control' id="Standingcost" name="Standingcost" style={{}} onChange={e => setKeychange({ ...keychange, StandingCost: e.target.value })} />

                                            <label htmlFor="AddPortDays">add P/Days: </label>
                                            <input type="text" className='form-control' id="AddPortDays" name="AddPortDays" style={{}} onChange={e => setKeychange({ ...keychange, AddPortDays: e.target.value })} />

                                            <label htmlFor="AddSteamDays">add S/Days: </label>
                                            <input type="text" className='form-control' id="AddSteamDays" name="AddSteamDays" style={{}} onChange={e => setKeychange({ ...keychange, AddSteamDays: e.target.value })} />
                                        </div>

                                        <div div className='boxes' style={{ width: '25%' }} >
                                            <label htmlFor="TTL_Fuel_Price">T.F.Price: </label>
                                            <input type="text" className='form-control' id="TTL_Fuel_Price" name="TTL_Fuel_Price" style={{}} onChange={e => setKeychange({ ...keychange, TTL_Fuel_Price: e.target.value })} />

                                            <label htmlFor="Commission">Commission: </label>
                                            <input type="text" className='form-control' id="Commission" name="Commission" style={{}} onChange={e => setKeychange({ ...keychange, Commission: e.target.value })} />

                                            <label htmlFor="TotalDays">TTL/Days: </label>
                                            <input type="text" className='form-control' id="TotalDays" name="TotalDays" style={{}} onChange={e => setKeychange({ ...keychange, TTLDays: e.target.value })} />
                                        </div>

                                        <div className='boxes' style={{ width: '25%' }} >
                                            <label htmlFor="OtherExpences">O/Expences: </label>
                                            <input type="text" className='form-control' id="OtherExpences" name="OtherExpences" style={{}} onChange={e => setKeychange({ ...keychange, OtherExpences: e.target.value })} />

                                            <label htmlFor="TotalCost">TTL Cost: </label>
                                            <input type="text" className='form-control' id="TotalCost" name="TotalCost" style={{}} onChange={e => setKeychange({ ...keychange, TotalCost: e.target.value })} />

                                            <label htmlFor="min_plus_1">-/+1: </label>
                                            <input type="text" className='form-control' id="min_plus_1" name="min_plus_1" style={{}} onChange={e => setKeychange({ ...keychange, min_plus_1: e.target.value })} />
                                        </div>

                                        <div className='boxes' style={{ width: '25%', padding: '1em 0' }} >
                                            <label htmlFor="DailyHire">Daily Hire: </label>
                                            <input type="text" style={{ borderBlockColor: 'red', borderBlockStartColor: 'green' }} className='form-control' id="DailyHire" name="DailyHire" onChange={e => setKeychange({ ...keychange, DailyHire: e.target.value })} />

                                            <label htmlFor="BreakEven" >BreakEven: </label>
                                            <input type="text" style={{ borderBlockColor: 'red', borderBlockStartColor: 'green' }} className='form-control' id="BreakEven" name="BreakEven" onChange={e => setKeychange({ ...keychange, BreakEven: e.target.value })} />

                                            <div style={{ textAlign: 'right', marginTop: '5px' }}>
                                                <button className='btn btn-info' style={{ marginTop: '10px', backgroundColor: 'rgb(221, 224, 224)' }} onClick={Handleclicksubmit} >Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                        <div className='toggleplace'>

                        </div>
                    </div>
                    </form>
            </div>
        </>
    )
}

export default Grid