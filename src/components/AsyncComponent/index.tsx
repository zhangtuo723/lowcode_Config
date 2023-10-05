import React,{Suspense, useMemo} from 'react'

export default function AsyncComponent(props) {
    const {name,data} = props
    const Component = useMemo(()=>React.lazy(()=>import('../'+name)),[name])
  return (
    <Suspense fallback={<div>loading...</div>}>

        <Component {...data}></Component>
    </Suspense>
  )
}
