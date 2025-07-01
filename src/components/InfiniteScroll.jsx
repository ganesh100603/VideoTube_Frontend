import React from "react";
import { useEffect, useRef } from "react";

function InfiniteScroll({children,fetchMore,hasNextPage}){
    const loader = useRef(null)

    useEffect(()=>{
        const elementRef = loader.current
        const observer = new IntersectionObserver((entries)=>{
            const target = entries[0]
            if(target.isIntersecting && hasNextPage){
                fetchMore()
            }
        })


        if(elementRef) observer.observe(elementRef)
        
        return ()=>observer.observe(elementRef)
    },[fetchMore,hasNextPage])

    return(
        <>
        {children}
        <div className="h-2" ref={loader}></div>
        </>
    )
}

export default InfiniteScroll