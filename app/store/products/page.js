"use client"
import ProductCard1 from "@/app/components/cards/productcard1"
import Sidebar from "@/app/components/navbars/sidebar"
import { useEffect, useState } from "react"

export default function Products(){

    const [products, setProducts] = useState([])
    const [fetchFailed, setFetchFailed] = useState(false)
    const [errormessage, setErrorMessage] = useState()

    const getProducts = async() => {
        const response = await fetch("/api/products",{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            setProducts(data.products)
        }else{
            setFetchFailed(true)
            setErrorMessage(data.message)
        }
    }

    useEffect(()=>{
        getProducts()
    },[])
    return(
        <div className="flex flex-col md:grid md:grid-cols-5 p-4">
            <Sidebar />
            <div className="w-full h-full md:col-span-4">
                {!fetchFailed?  
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
                        {products.map((car,index)=>(
                            <ProductCard1 title={car.productname} price={`${car.currency}${car.price}`} image={"/images/car1.png"} _id={car._id} key={index}/>
                        ))}
                    </div> 
                :
                <div className="flex w-full items-full items-center justify-center">
                    <h1>{errormessage}</h1>
                </div>}
            </div>
        </div>
    )
}