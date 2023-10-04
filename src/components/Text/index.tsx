import React from 'react'

export default function Text(props) {
    // console.log(props)
    return (
        <div>
            
            <p style={{color:props.color}}>{props.content}</p>
            
        </div>
    )
}
