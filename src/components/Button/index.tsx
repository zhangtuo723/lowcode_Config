import React from 'react'

export default function Button(props) {
  const propsConfig = {}
    Object.keys(props).forEach((key)=>{
        Object.assign(propsConfig,{[key]:props[key].value})
    })
  return (
    <div>
        <button style={{color:propsConfig.color}}>{propsConfig.content}</button>
    </div>
  )
}
