"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Pencil1Icon, Cross1Icon} from "@radix-ui/react-icons"


export default function ViewProduct({params}){

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
    const [showeditDialog, setShowwEditDialog] = useState(false)
    const [fuel, setFuel] = useState()

    const getProduct = async() => {
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
      }else{
        alert(data.message)
      }
    }

    const editProduct = async(e) => {
        e.preventDefault()
        const response = await fetch(`/api/products/${_id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                productname: productTitle,
                currency,
                price,
                milage,
                year,
                engine,
                transmission,
                description,
                drive,
                coverimage,
                gallery,
                location,
                fuel
            })
        })

        const data = await response.json()

        if(data.success){
            alert(data.message)
        }else{
            alert(data.message)
        }
    }

    useEffect(()=>{
        getProduct()
    },[])

    return(
        <div className="flex flex-col w-full h-full bg-black p-4">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <div className="w-full h-full flex flex-col gap-4">
                    <div className="w-full flex items-center justify-center h-80">
                        <Image src={displayimage} height={300} width={300} alt="product image" />
                    </div>
                    <div className="flex max-w-full px-4 py-2 overflow-y-hidden items-center justify-center gap-4">
                        {
                            gallery.map((image, index)=> (
                                <button className="border rounded flex flex-col items-center justify-center min-h-24 min-w-24" key={index}
                                    onClick={()=>setDisplayimage(image)}>
                                    <Image src={image} height={100} width={100} alt="thumbnail" />
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                    <div className="flex items-center justify-end">
                        <button className="flex items-center justify-center border rounded gap-1 p-2" onClick={()=>setShowwEditDialog(true)}>Edit <Pencil1Icon /> </button>
                    </div>
                    <h1 className="text-3xl font-semibold">{productTitle}</h1>
                    <div>
                        <span className="bg-blue-500 p-2 rounded-full text-sm font-semibold">{`${currency} ${price}`}</span>
                    </div>
                    <hr />
                    <p className="text-sm">{description}</p>
                    <h1 className="font-semibold">SPECS</h1>
                    <div className="w-full">
                        <table className="w-full">
                            <tbody>
                                <tr className="bg-[#0a0a0a] border-b border-gray-200">
                                    <td className="text-sm font-semibold px-2">location</td>
                                    <td className="text-sm px-2">{location}</td>
                                </tr>
                                <tr className="bg-[#0a0a0a] border-b border-gray-200">
                                    <td className="text-sm font-semibold px-2">milage</td>
                                    <td className="text-sm px-2">{milage}</td>
                                </tr>
                                <tr className="bg-[#0a0a0a] border-b border-gray-200">
                                    <td className="text-sm font-semibold px-2">year</td>
                                    <td className="text-sm px-2">{year}</td>
                                </tr>
                                <tr className="bg-[#0a0a0a] border-b border-gray-200">
                                    <td className="text-sm font-semibold px-2">engine</td>
                                    <td className="text-sm px-2">{engine}</td>
                                </tr>
                                <tr className="bg-[#0a0a0a] border-b border-gray-200">
                                    <td className="text-sm font-semibold px-2">transmission</td>
                                    <td className="text-sm px-2">{transmission}</td>
                                </tr>
                                <tr className="bg-[#0a0a0a] ">
                                    <td className="text-sm font-semibold px-2">drive</td>
                                    <td className="text-sm px-2">{drive}</td>
                                </tr>
                                <tr className="bg-[#0a0a0a] ">
                                    <td className="text-sm font-semibold px-2">fuel</td>
                                    <td className="text-sm px-2">{fuel}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
             showeditDialog && <div className="absolute p-8 top-0 left-0 w-full h-full flex flex-col items-center justify-center mt-16">
                    <form className="flex  flex-col md:grid md:grid-cols-2 bg-black p-4 gap-4"
                        onSubmit={(e)=> editProduct(e)}>
                        <div className="flex w-full md:col-span-2 items-center justify-end">
                            <button className="p-2 border rounded" onClick={()=>setShowwEditDialog(false)}><Cross1Icon /></button>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">title</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="title"
                                onChange={(e)=>setProductTitle(e.target.value)}
                                value={productTitle}
                                required/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">description</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="description"
                                onChange={(e)=>setDescription(e.target.value)}
                                value={description}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">price</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="price"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">drive</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="drive"
                                onChange={(e)=> setDrive(e.target.value)}
                                value={drive}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">location</h1>
                            <select className="w-full rounded bg-transparent border p-2"
                            onChange={(e)=> setLocation(e.target.value)}>
                                <option value="japan" className="bg-black">Japan</option>
                                <option value="zimbabwe" className="bg-black">Zimbabwe</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">milage</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="milage"
                                onChange={(e)=> setMilage(e.target.value)}
                                value={milage}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">year</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="year"
                                onChange={(e)=>setYear(e.target.value)}
                                value={year}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">engine</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="engine"
                                onChange={(e)=>setEngine(e.target.value)}
                                value={engine}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">transmission</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="transmission"
                                onChange={(e)=>setTransimission(e.target.value)}
                                value={transmission}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">fuel</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="fuel"
                                onChange={(e)=>setFuel(e.target.value)}
                                value={fuel}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">cover image</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="cover image"
                                type="file"
                                onChange={(e)=>setCoverimage(e.target.value)}/>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <h1 className="text-xs font-semibold">gallery</h1>
                            <input className="w-full rounded bg-transparent border p-2"
                                placeholder="gallery"
                                type="file"
                                onChange={(e)=> setGallery(e.target.value)}/>
                        </div>
                        <button className="bg-blue-500 rounded p-2">Upload</button>
                    </form>
                </div>
            }
        </div>
    )
}