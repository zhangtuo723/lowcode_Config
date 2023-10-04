import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import ComponentList from '../../components/ComponentList'
export default function Edit() {
    // const location = useLocation()
    const params = useParams()
    // 获取所有组件
    // 想办法获取,应该是发请求获取
    const [compoendtIcons, setIcons] = useState([
        {
            id: '1',
            name: "Text",
            icon: 'http://tuoz.vip/img/5b600355c8f132314b9b.jpg',
            version: 'v1',
            // require 需要配置的项目
            props: {
                content: '测试测试',
                color: 'skyblue'
            }
        },
        {
            id: '2',
            name: 'Button',
            icon: 'http://43.140.197.245:7890/uploads/2297a5d8b9e067126dacb7a3a0558c28',
            version: 'v1',
            props: {
                content: '测试测试',
                color: 'red'
            }
        }
    ])
    const [components, setComponents] = useState<any>([])

    const [currComponentIndex, setCurrComponent] = useState()

    const [FromDslConfig, setFromDslConfig] = useState()

    const ref = useRef<any>()

    const dragStart = (e: any, v: string) => {
        e.dataTransfer.setData('data', JSON.stringify(v))
    }

    const drop = (e: any) => {
        const v = e.dataTransfer.getData('data')
        if (v) {
            setComponents([...components, JSON.parse(v)])
        }
    }



    useEffect(() => {
        // console.log(currComponent)
        const currC = components[currComponentIndex!]
        if (currC) {
            // console.log(currC.props)
            setFromDslConfig( currC.props)
            
        }

    }, [currComponentIndex])

    const change = (key,value)=>{
        
        // components[currComponentIndex].props[key] = value
        const newComponents = [...components]
        newComponents[currComponentIndex].props[key] = value
        setComponents(newComponents)        
        console.log(key,value)
    }
    return (
        <div className={styles.root}>
            <h1>配置页面</h1>
            <hr />

            <div className='mainBox'>
                <div className='left'>
                    {
                        compoendtIcons.map((v) => (<div draggable onDragStart={(e) => { dragStart(e, v) }} className='componentIcon' key={v.id}>
                            <img src={v.icon} alt="" />
                            <div className="title">{v.name}</div>
                        </div>))
                    }
                </div>
                <div ref={ref}
                    className='middle'
                    onDrop={drop}
                    onDragOver={(e) => e.preventDefault()}>
                    <ComponentList
                        components={components}
                        setComponents={setComponents}
                        setCurrComponent={setCurrComponent}>
                    </ComponentList>
                </div>
                <div className='right'>
                    {
                       FromDslConfig && Object.keys(FromDslConfig).map((key,index)=><div key={index}>

                        <div>
                            <span>{key}</span>:<input onChange={(e)=>{change(key,e.target.value)}}></input>
                        </div>

                       </div>)
                    }
                    
                </div>
            </div>

        </div>
    )
}
