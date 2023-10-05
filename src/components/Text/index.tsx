import React from 'react'

export default function Text(props) {
    // console.log(props)

    const propsConfig = {}
    Object.keys(props).forEach((key)=>{
        Object.assign(propsConfig,{[key]:props[key].value})
    })
    return (
        <div>
            
            <p style={{color:propsConfig.color}}>{propsConfig.content}</p>
            
        </div>
    )
}
