"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"

const PAGE_SIZE = 10

export default function CarsTable(){

    const router = useRouter()
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useState()
    const [totalProducts, setTotalProducts] = useState()
    const [products, setProducts] = useState([])

    const getProducts = async() => {
        const response = await fetch(`/api/products/?pageSize${PAGE_SIZE}&page=${page}&searchParams=${searchParams}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            setTotalProducts(data.total)
            setProducts(data.products)
        }else{
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
                <button className="border rounded px-4 py-2" onClick={() => router.push("/dashboard/cars/createnew")}>Add New</button>
            </div>
            <div className="w-full h-full bg-[#0a0a0a] rounded p-4">
                <table className="w-full">
                    <tbody>
                        <tr className="px-2 bg-black rounded-full">
                        <td className="px-2 rounded-s-full text-sm font-semibold">#</td>
                            <td className="px-2 rounded-s-full text-sm font-semibold">Car</td>
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
            </div>
        </div>
    )
}