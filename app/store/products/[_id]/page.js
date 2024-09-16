"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"


export default function ProductDetails({params}){

    const router = useRouter()
    const {_id} = params
    const [productTitle, setProductTitle] = useState()
    const [currency, setCurrency] = useState()
    const [description, setDescription] = useState()
    const [milage, setMilage] = useState()
    const [year, setYear] = useState()
    const [engine, setEngine] = useState()
    const [transmission, setTransimission] = useState()
    const [drive, setDrive] = useState()
    const [price, setPrice] = useState()
    const [location, setLocation] = useState()
    const [coverimage, setCoverimage]  = useState()
    const [gallery, setGallery] = useState([])
    const [displayimage, setDisplayimage] = useState()
    const [fuel, setFuel] = useState()
    const [isloading, setIsloading] = useState(false)

    const getProduct = async() => {
        setIsloading(true)
      const response = await fetch(`/api/products/${_id}`,{
        method:"GET"
      })

      const data = await response.json()

      if(data.success){
        setProductTitle(data.product.productname)
        setPrice(data.product.price)
        setCurrency(data.product.currency)
        setDescription(data.product.description)
        setMilage(data.product.milage)
        setYear(data.product.year)
        setEngine(data.product.engine)
        setDrive(data.product.drive)
        setTransimission(data.product.transmission)
        setLocation(data.product.location)
        setCoverimage(data.product.coverimage)
        setGallery(data.product.gallery)
        setDisplayimage(data.product.coverimage)
        setFuel(data.product.fuel)
        setIsloading(false)
      }else{
        setIsloading(false)
        alert(data.message)
      }
    }

    

    useEffect(()=>{
        getProduct()
    },[])

    return(
        <div className="flex flex-col w-full h-full p-4">
            {isloading ?<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
                <div className="flex flex-col items-center justify-center  w-full h-full">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>:
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <div className="w-full h-full flex flex-col gap-4">
                    <div className="w-full flex items-center justify-center h-80">
                        <Image src={displayimage} height={300} width={300} alt="product image" />
                    </div>
                    <div className="flex max-w-full px-4 py-2 overflow-y-hidden items-center justify-center gap-4">
                        {
                            gallery.map((image, index)=> (
                                <button className="border border-gray-900 rounded flex flex-col items-center justify-center min-h-24 min-w-24" key={index}
                                    onClick={()=>setDisplayimage(image)}>
                                    <Image src={image} height={100} width={100} alt="thumbnail" />
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                    <h1 className="text-3xl text-gray-900 font-semibold">{productTitle}</h1>
                    <div>
                        <span className="bg-gray-900 text-white p-2 rounded-full text-sm font-semibold">{`${currency} ${price}`}</span>
                    </div>
                    <hr />
                    <p className="text-sm">{description}</p>
                    <h1 className="font-semibold">SPECS</h1>
                    <div className="w-full">
                        <table className="w-full">
                            <tbody>
                                <tr className="bg-gray-200 border-b border-gray-400">
                                    <td className="text-sm font-semibold px-2">location</td>
                                    <td className="text-sm px-2">{location}</td>
                                </tr>
                                <tr className="bg-gray-200 border-b border-gray-400">
                                    <td className="text-sm font-semibold px-2">milage</td>
                                    <td className="text-sm px-2">{milage}</td>
                                </tr>
                                <tr className="bg-gray-200 border-b border-gray-400">
                                    <td className="text-sm font-semibold px-2">year</td>
                                    <td className="text-sm px-2">{year}</td>
                                </tr>
                                <tr className="bg-gray-200 border-b border-gray-400">
                                    <td className="text-sm font-semibold px-2">engine</td>
                                    <td className="text-sm px-2">{engine}</td>
                                </tr>
                                <tr className="bg-gray-200 border-b border-gray-400">
                                    <td className="text-sm font-semibold px-2">transmission</td>
                                    <td className="text-sm px-2">{transmission}</td>
                                </tr>
                                <tr className="bg-gray-200 border-b border-gray-400">
                                    <td className="text-sm font-semibold px-2">drive</td>
                                    <td className="text-sm px-2">{drive}</td>
                                </tr>
                                <tr className="bg-gray-200">
                                    <td className="text-sm font-semibold px-2">fuel</td>
                                    <td className="text-sm px-2">{fuel}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex items-center gap-2 mt-2">
                            <button className="bg-green-500 text-xs font-semibold px-4 py-1 rounded" onClick={(e)=> router.push("https://wa.me/263774050385")}>Whatsapp</button>
                            <button className="bg-blue-500 text-xs font-semibold px-4 py-1 rounded" onClick={(e)=> router.push("tel:+263774050385")}>Call</button>
                        </div>    
                    </div>
                </div>
            </div>}
        </div>
    )
}