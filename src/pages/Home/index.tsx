import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles  from './index.module.scss'
import {useNavigate} from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate()
    const [list,setList] = useState<{id:string,name:string,date:string}[]>([])
    const [showPopup,setShowPopup] = useState(false)

    
    const clickAdd = ()=>{
        setShowPopup(!showPopup)
    }
    const [currData,setCurrData] = useState({
        name:'xxx',
        date:'xxx'
    })
    const add = ()=>{
        // 发请求传给后端保存起来
        // request.....
        setShowPopup(false)
    }
    useEffect(()=>{
        // 发请求获取列表
        setList([
            {
                id:'1',
                name:'2asdf',
                date:'-asdf-asdf',
            }
        ])
    },[])

  return (
    <div className={styles.root}>

        
        {showPopup && createPortal(<div className={styles.popup}>
            名称：<input type="text" value={currData.name} onChange={(e)=>setCurrData({name:e.target.value,date:(new Date()).toDateString()})}/>
            <button onClick={add}>创建</button>

        </div>,document.body)}

        <h1>配置列表</h1>
        <button onClick={clickAdd}>新增</button>
        <table border={1} width={1000}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>配置时间</th>
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>123</td>
                    <td>1234</td>
                    <td>12323</td>
                    <td>
                        <button>编辑</button>
                        <button>删除</button>
                    </td>
                </tr> */}
                {
                    list.map((item)=>(<tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>
                            <button onClick={()=>{navigate('/edit/'+item.id)}}>编辑</button>
                            <button>删除</button>
                        </td>
                    </tr>))
                }
            </tbody>
        </table>


    </div>
  )
}

