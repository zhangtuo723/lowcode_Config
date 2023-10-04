import React, { Suspense, useEffect, useState } from 'react'

export default function CList(props) {

    const propsC = [...props.components]
    const setCurrComponent = props.setCurrComponent
    let components = props.components.map((item) => ({
        C: React.lazy(() => import('../' + item.name)),
        P: item.props
    }))

    const drop = (e, currindex) => {
        // console.log(e)
        const id = e.dataTransfer.getData('id')
        if (id > currindex) {
            const value = propsC.splice(id, 1)[0]
            propsC.splice(currindex, 0, value)

        } else {
            const value = propsC[id]
            propsC.splice(currindex, 0, value)
            propsC.splice(id, 1)
        }
        props.setComponents(propsC)
    }

    const dragStart = (e, index) => {
        e.dataTransfer.setData('id', index)
    }

    const editComponent = (index) => {

        console.log(index)
        setCurrComponent(index)
    }
    return (
        <div style={{ width: '100%' }}>
            <Suspense fallback={<div>loading...</div>}>
                {
                    components.map(({ C, P }, index) => (

                        <div style={{ width: '100%' }} onClick={() => { editComponent(index) }}
                            draggable key={index}
                            onDragStart={(e) => { dragStart(e, index) }}
                            onDrop={(e) => { drop(e, index) }}
                            onDragOver={(e) => e.preventDefault()}>
                            <C {...P}></C>
                        </div>)
                    )
                }
            </Suspense>
        </div>
    )
}
