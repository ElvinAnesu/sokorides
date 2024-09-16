"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { EyeOpenIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"

const PAGE_SIZE = 10

export default function CarsTable(){

    const router = useRouter()
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useState()
    const [totalProducts, setTotalProducts] = useState()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getProducts = async() => {
        setIsLoading(true)
        const response = await fetch(`/api/products/?pageSize${PAGE_SIZE}&page=${page}&searchParams=${searchParams}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            setTotalProducts(data.total)
            setProducts(data.products)
            setIsLoading(false)
        }else{
            setIsLoading(false)
            alert(data.message)
        }
    }

    const deleteProduct = async(_id) => {
        const response = await fetch(`/api/products/${_id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            alert(data.message)
        }else{
            alert(data.message)
        }
    }

    useEffect(()=>{
        getProducts()
    },[])

    return(
        <div className="flex flex-col w-full h-full gap-2">
            <div className="flex w-full items-center justify-end">
                <button className="border rounded border-gray-900 px-4 py-2 flex items-center gap-2" onClick={() => router.push("/dashboard/cars/createnew")}>
                    <PlusIcon /> Add New
                </button>
            </div>
            {isLoading? <div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
                <div className="flex flex-col items-center justify-center  w-full h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div> :
            <div className="w-full h-full bg-gray-100 rounded p-4">
                <table className="w-full">
                    <tbody>
                        <tr className="px-2 bg-gray-900 text-white  rounded-full">
                        <td className="px-2 rounded-s-full text-sm font-semibold">#</td>
                            <td className="px-2 text-sm font-semibold">Car</td>
                            <td className="text-sm font-semibold">Description</td>
                            <td className="text-sm font-semibold">Price</td>
                            <td className="px-2 rounded-e-full text-sm font-semibold">Action</td>
                        </tr>
                        {products.map((car,index)=>(
                            <tr className="border-b border-gray-500" key={index}>
                                <td className="px-2 rounded-s-full text-sm">{index + 1}</td>
                                <td className="px-2 rounded-s-full text-sm">{car.productname}</td>
                                <td className="text-sm">{car.description}</td>
                                <td className="text-sm">{`${car.currency} ${car.price}`}</td>
                                <td className="px-2 flex itemx-center justify-around">
                                    <button onClick={()=> router.push(`/dashboard/cars/${car._id}`)}><EyeOpenIcon /></button>
                                    <button onClick={()=>deleteProduct(car._id)}><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}