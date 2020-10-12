import { useState, useEffect, useRef } from "react"



export const useFetch = (url) => {

    const isMounted = useRef(true)
    
    const [state, setState] = useState({data:null, loading:true, error:null});

    useEffect(()=>{
        return ()=>
        {isMounted.current=false;}
    },[])

    useEffect((state)=>{
        setState({...state,loading:true})

        fetch(url)
            .then(resp =>resp.json())
            .then(data=>{
                if (isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data

                    })
                }
            })
            .catch(()=>{
                setState({
                    data:null,
                    loading:false,
                    error: 'no cargo datos'
                })
            })
            ;

    },[url])
    return state;
}

