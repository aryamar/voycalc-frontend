import React, { useState } from 'react'


function Redirect(props) {
    const [txtvalue, setTextvalue] = useState([])

    console.log(txtvalue)
    const consumption = () => {
        const steamdays = txtvalue.distance / (txtvalue.speed * 24)
        const dailyIFOconsump=(steamdays*txtvalue.dailyIFO)* txtvalue.IFOprice        
        setTextvalue(dailyIFOconsump)

    }
    const incrmnt = (() => {
        props.setCountinc(props.productId)

    });

    const dcrmnt = (() => {
        props.setCountdec(props.productId)

    });

    const Hdelete = (() => {
        props.onDelete(props.productId)
    });

    const handleReset = (() => {
        if (props.count === 0) {
            return 'zero';
        }
        else {
            return props.count
        }

    });

    return (
        <>
            <div>
                <button className='btn btn-primary' onClick={consumption}>{txtvalue.steamdays}</button>
                <h4 style={{ color: "black" }}> {props.productId}{'    )'}  <button onClick={dcrmnt} className='btn btn-warning '>-</button>
                    <button onClick={incrmnt} className='btn btn-success m-2 '><span>{handleReset()}</span></button>
                    <button onClick={incrmnt} className='btn btn-warning m-2 ' >+</button>
                    <button onClick={Hdelete} className='btn btn-danger m-2 '>Delete</button>
                </h4>
            </div>

            <div className='container badge ' style={{ width: '100%', display: 'flex' }}>
                <div className='col-md-2' style={{ margin: "3px" }} >

                    <input type="number" name='speed' id='speed' placeholder='Speed' onChange={(e) => setTextvalue({ ...txtvalue, [e.target.name]: e.target.value })} className='form-control m-2 ' defaultValue={''} />
                    <input type="number" name='distance' id='distance' placeholder='Distance' onChange={(e) => setTextvalue({ ...txtvalue, [e.target.name]: e.target.value })} className='form-control m-2 ' defaultValue={''} />
                    <input type="number" name='dailyIFO' id='dailyIFO' placeholder='IFO Daily' onChange={(e) => setTextvalue({ ...txtvalue, [e.target.name]: e.target.value })} className='form-control m-2 ' defaultValue={''} />
                    <input type="number" name='dailyMGO' id='dailyMGO' placeholder='MGO Daily' onChange={(e) => setTextvalue({ ...txtvalue, [e.target.name]: e.target.value })} className='form-control m-2 ' defaultValue={''} />
                    <input type="number" name='IFOprice' id='IFOprice' placeholder='IFO Price' onChange={(e) => setTextvalue({ ...txtvalue, [e.target.name]: e.target.value })} className='form-control m-2 ' defaultValue={''} />

                </div>
            </div>

            <div className="container">
                <ul>
                    <h2 style={{ color: "black" }}>{props.count} - {props.productName}</h2>

                </ul>
            </div>

            <div className="container">
                {props.children}
            </div>
            <hr />
            <hr />
        </>
    )
}

export default Redirect