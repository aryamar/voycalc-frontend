import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import Search from '../Images/Search.png'

function Modals() {
    const [show, setShow] = useState(true)
    const [insdata, setInsdata] = useState([])
    const [open, setOpen] = useState(true)
    const [msg, setMsg] = useState()
    const [port, SetPort] = useState([])
    const [lpname, SetLpName] = useState('')
    const [dpname, SetDpName] = useState('')
    const [portcode, SetPortCode] = useState(0)
    const [resultlp, SetResultlp] = useState([])
    const [resultdp, setResultDp] = useState([])

    const [errmsg, setErrMsg] = useState('')
    const [putmtydistance, setPutMtyDistance] = useState('')
    const [off, setOff] = useState(true)




    // const count = useRef(0)
    // console.log(portcode)

    // useEffect(() => {
    //     count.current = count.current + 1
    // })

    useEffect(() => {

        if (portcode === 0) {
            setErrMsg(`There is No distance between [${lpname}] To [${dpname}]`)
            setPutMtyDistance('Please put the value if any:')
            setOff(false)

        } else {
            setErrMsg(`There is: [${portcode}] between [${lpname}] And [${dpname} ]`)
            setPutMtyDistance('')
            setOff(false)
        }
    }, [lpname, dpname, portcode, putmtydistance, off])


    useEffect(() => {
        const retriveports = (async () => {

            const rtrv = await axios.get('http://localhost:5000/ports')
            SetPort(rtrv.data)
        })
        retriveports()
    }, [])


    useEffect(() => {
        axios.get("http://localhost:5000/distance", { params: { lpname, dpname } })
            .then(res => { SetPortCode(res.data.Distance) })
            .catch(() => SetPortCode(0));
    }, [lpname, dpname, portcode])




    const postdata = (async () => {
        try {
            await axios.post('http://localhost:5000/calc', insdata)
            setMsg("Successfully Submitted")
        } catch {
            setMsg("There is something wrong")
        }
        postdata()
    })


    useEffect(() => {
        const reslport = port.filter(lports => { return lpname.toLowerCase() === '' ? lports : lports.fromport.toLowerCase().includes(lpname) })
        SetResultlp(reslport)
    }, [lpname, port])


    useEffect(() => {
        const resdport = port.filter(dports => { return dpname.toLowerCase() === '' ? dports : dports.Toport.toLowerCase().includes(dpname) })
        setResultDp(resdport)
    }, [dpname, port])



    const close = (() => {
        setShow(false)
    })
    return (
        <>

            <div className='container' style={{ margin: '2px' }}>
                <Modal show={show} size='lg'>
                    <Modal.Header>
                        <div className='container' style={{ display: "flex" }}>
                            <div className='box' style={{ textAlign: 'center' }}>
                                <button className='btn btn-danger' onClick={close}>X</button>
                            </div>
                            <div className='container' style={{ textAlign: 'center', marginRight: '50px' }}>
                                <h2>Distance Table</h2>
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body >
                        {
                            <>
                                <div className='container' >
                                    {/* <h1 style={{ color: 'red' }}>{count.current}</h1> */}
                                    <div className='divctlmodal' style={{marginRight:'10px'}}>
                                        <label htmlFor="lpname"> Port Name</label>
                                        <div className='divim col-9' style={{ border: 'solid 1px', height: '42px' }} >
                                            <img src={Search} alt='' style={{ height: '20px', width: '20px', marginTop: '10px', marginLeft: "15px" }} />
                                            <input
                                                className='form-control  mb-3  '
                                                style={{ height: '30px' }}
                                                id='lpname'
                                                name='lpname'
                                                type="search"
                                                placeholder="Enter first port"
                                                value={lpname}
                                                onChange={(e) => {
                                                    SetLpName(e.target.value)
                                                    setOpen(false)
                                                }}
                                                onClick={() => {
                                                    setOpen(false)
                                                }}

                                            />
                                        </div>
                                        <div className='divim col-6' style={{ height: '42px' }}>
                                            {
                                                resultlp.slice(0, 1).map((resp, index) => (
                                                    <input
                                                        key={resp.id}
                                                        className='form-control  mb-3'
                                                        hidden={open}
                                                        style={{ height: '30px', border: 'red solid 1px', borderTop: '0px' }}
                                                        name='portname'
                                                        type="search"
                                                        placeholder="Enter port Name"
                                                        onClick={(e) => {
                                                            setOpen(false)
                                                            SetLpName(e.target.value)
                                                        }}
                                                        value={resp.fromport}
                                                        readOnly
                                                    />
                                                ))
                                            }
                                        </div>

                                        <label htmlFor="dpname">DisPort Name</label>
                                        <div className='divim col-9' style={{ border: 'solid 1px', height: '42px' }}>
                                            <img src={Search} alt='' style={{ height: '20px', width: '20px', marginTop: '10px', marginLeft: "15px" }} />
                                            < input type='search'
                                                className='form-control mb-3'
                                                style={{ height: '30px' }}
                                                id='dpname'
                                                name='dpname'
                                                placeholder="Enter second port"
                                                value={dpname}
                                                onChange={(e) => {
                                                    SetDpName(e.target.value)
                                                }}
                                                onClick={() => setOpen(false)}
                                            />
                                        </div>
                                        <div className='divim col-6' style={{ height: '42px' }}>
                                            {
                                                resultdp.slice(0, 1).map((resdp, index) => (
                                                    <input
                                                        key={index}
                                                        className='form-control mb-3 '
                                                        hidden={open}
                                                        style={{ height: '30px', border: 'red solid 1px', borderTop: '0px' }}
                                                        name='dpname'
                                                        type="search"
                                                        placeholder="Enter port Name"
                                                        onClick={(e) => {
                                                            setOpen(false)
                                                            SetDpName(e.target.value)
                                                        }}
                                                        value={resdp.Toport}

                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </Modal.Body>

                    <Modal.Footer style={{ display: 'flex' }}>
                        <div className='box' style={{ border: '1px solid' }}>


                            <div className='box' style={{ textAlign: 'center' }} >
                                <h5 hidden={off}>{errmsg}</h5>
                            </div>

                            <div className='box ' style={{ display: 'flex' }} >

                                <div className='box col-6 ' style={{}} >
                                    <h5 hidden={off}>{putmtydistance}</h5>
                                </div>

                                <div className='box col-8' style={{}}>
                                    <span style={{ fontSize: '18px' }}> Distance: </span><input type='number' className='container col-4' name='distance' id='distance' style={{ borderRadius: '8px', fontSize: '16px' }} />
                                </div>
                            </div>
                        </div>

                        <div className='box ' style={{}}>
                            <button type='submit' className='btn btn-warning' onClick={postdata} style={{ float: 'right' }}>Submit</button>
                        </div>

                    </Modal.Footer>

                </Modal>
            </div >
        </>
    )
}

export default Modals