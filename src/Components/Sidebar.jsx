import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

import axios from 'axios'
import './sidebar.css'
import { Link } from 'react-router-dom'
import pngegg from '../Images/pngegg.png'

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}




function Sidebar() {
    const [isopen, setIsOpen] = useState(false)
    const [vsllist, setVslList] = useState([])
    const [getinput, setGetInput] = useState([])
    const [filtered, setFiltered] = useState([])
    const [show, setShow] = useState('')

    console.log(getinput)
    console.log(vsllist)

    useEffect(() => {
        const getdata = (async () => {
            const collection = await axios.get('http://localhost:5000/calculation')
            setVslList(collection.data)
            console.log(collection.data)
        })
        getdata()
    }, [])

    useEffect(() => {
        // const finddata = (e) => {
        const search = vsllist.filter((f) => { return f.Vessel_Name.toLowerCase().includes(getinput) })

        setFiltered(search)
    }, [getinput, vsllist])
    // }

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    // Setting the logic for the asynchronous function on page reload
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
              const fil= vsllist.filter(filter=>{ return filter.Vessel_Name.toLowerCase().includes(getinput) })
                setOptions(fil)
                
            }
        })();

        return () => {
            active = false;
        };
    }, [getinput,loading,vsllist]);

    
    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    console.log(options)
    return (
        <div>
            <div className='sidebar'>
                <div >
                    <legend className='legend'>Calculation</legend>

                    <div className='left'>
                        <nav className={`nav ${isopen ? 'nav-open' : 'nav-close'}`}>
                            <ul>
                                <li><Link to={'/'} target='blanc'>Home</Link></li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </nav>
                    </div>

                    <div className='right'>
                        <button id='bttn' className='btn btn-info'><a href='http://telegram.com' target='blanc'>Telegram</a></button><br />
                        <button id='bttn' className='btn btn-warning'>Instagram</button><br />
                        <button id='bttn' className='btn btn-primary'>Twitter</button><br />
                        <button id='bttn' className='btn btn-success'>WhatsApp</button><br />

                        <div style={{ display: 'flex', width: 'auto', backgroundColor: '', height: '38px', border: '2px solid lightgray', borderRadius: '15px' }}>
                            <img src={pngegg} alt="lock" width='20px' height='20px' />
                            <input type="search"
                                className='form-control'
                                id='vslname'
                                name='vslname'
                                style={{
                                    margin: '5px',
                                    marginLeft: '0px',
                                    padding: '2px',
                                    border: '0px'
                                }}
                                placeholder='Search' onEmptied={() => setShow(false)} onClick={() => setShow(true)} onChange={(e) => setGetInput(e.target.value)} value={getinput} />
                        </div>

                        <div>


                            {
                                filtered.map((fil, index) => (
                                    <>
                                        <input type="text" value={fil.Vessel_Name} onClick={(e) => setGetInput(e.target.value)} style={{ border: '0px' }} />

                                    </>
                                ))
                            }

                        </div>
                    </div>
                    <div className='right-right'>
                        <div className="form-check  form-switch " >
                            <input class="form-check-input"
                                style={{ width: '60px', height: '28px', marginRight: '15px' }}
                                type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                onClick={() => setIsOpen(!isopen)} /> {isopen ? "ON" : 'OFF'}
                        </div>

                    </div>
                </div>

                <Autocomplete
                    id="asynchronous-demo"
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    
                    // isOptionEqualToValue={(option, value) =>
                    //     value === undefined ||
                    //     option?.id?.toString() === (value?.id ?? value)?.toString()
                    // }
                    getOptionLabel={(option) => option.Vessel_Name+'.'+option.id}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Mardashti"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? (
                                            <CircularProgress color="inherit" size={20} />
                                        ) : null
                                        }
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </div>
        </div>
    )
}
export default Sidebar