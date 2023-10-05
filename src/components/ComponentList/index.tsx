import React, { Suspense, useEffect, useMemo, useState } from 'react'
import AsyncComponent from '../AsyncComponent'
export default function CList(props) {

    const propsC = [...props.components]
    const setCurrComponent = props.setCurrComponent
    // 缓存一下，这个组件是远程获取的不容易
    let components = props.components.map((item) => ({
        // C: React.lazy(() => import('../' + item.name)),
        C: item.name,
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

        setCurrComponent(index)
    }
    return (
        <div style={{ width: '100%' }}>

            {
                components.map(({ C, P }, index) => (

                    <div style={{ width: '100%' }} onClick={() => { editComponent(index) }}
                        draggable key={index}
                        onDragStart={(e) => { dragStart(e, index) }}
                        onDrop={(e) => { drop(e, index) }}
                        onDragOver={(e) => e.preventDefault()}>

                        <AsyncComponent name={C} data={P}>

                        </AsyncComponent>

                        
                    </div>)
                )
            }

        </div>
    )
}
