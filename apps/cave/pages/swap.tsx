
import React, { useEffect,useState } from "react";
import Router from 'next/router'
const Swap = ()=>{
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        const {pathname} = Router
        if(pathname == '/swap' ){
            Router.push('/gemswap')

        }else{
            setLoaded(true)
        }
      },[]);

    if(!loaded){
        return <div></div>
    }
    return ( 
        <p>
            This page has been moved to app.concave.lol/gemswap <br/>
        </p> 
    )
}
export default Swap