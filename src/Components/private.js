import React, { useState } from 'react'
import Redirect from './Redirect'

function Private() {

    const [spec, setSpec] = useState(
        [
            { count: 2, productId: 1, productName: 'Bag' },
            { count: 4, productId: 2, productName: 'shoe' },
            { count: 1, productId: 3, productName: 'jacket' },
        ])

    const countincrement = (Id) => {
        const packinc = [...spec]
        const index = packinc.findIndex(r => r.productId === Id)
        packinc[index].count += 1        
        setSpec(packinc)
    }

    const countdecrement = (Id) => {
        const packinc = [...spec]
        const index = packinc.findIndex(r => r.productId === Id)
         packinc[index].count -= 1
        if(packinc[index].count<0){
            packinc[index].count =0
        }else{
            setSpec(packinc)  
        }
       
    }

    const rst = () => {
        const rowcount = spec.map(r => {
            r.count = 0;
            return r
        })
        setSpec(rowcount)
    }

    const Delete = (id) => {
        const dlt = spec.filter(r => r.productId !== id)
        setSpec(dlt)
    }


    return (
        <>
            <div className='container bg-warning' style={{ marginTop: '15px', borderRadius: '25px' }}>
                <h1 style={{ color: 'black' }}>Private</h1>
                <button className='btn btn-info' style={{ marginBottom: '2em' }} onClick={() => rst()}>Reset</button>
                {
                    spec.map((p, index) => (
                        <Redirect key={index} setCountdec={countdecrement} setCountinc={countincrement} productId={p.productId} count={p.count} productName={p.productName} onDelete={Delete} onReset={rst} children >
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum blanditiis nesciunt totam possimus! Modi sunt adipisci numquam beatae nisi maiores.
                        </Redirect>
                    ))
                }
            </div >
        </>
    )

}
export default Private

