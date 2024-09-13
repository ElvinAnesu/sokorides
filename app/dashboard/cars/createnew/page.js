"use client"
import { useState } from "react"


export default function AddNew(){

    const [productname, setProductname] = useState()
    const [price, setPrice] = useState()
    const [milage, setMilage] = useState()
    const [year, setYear] = useState()
    const [engine, setEngine] = useState()
    const [transmission, setTransimission] = useState()
    const [description, setDescription] = useState()
    const [drive, setDrive] = useState()
    const [coverimage, setCoverimage] = useState()
    const [gallery, setGallery] = useState()
    const [location, setLocation] = useState("japan")
    const [fuel, setFuel] = useState()


    const addProduct = async(e) => {
        e.preventDefault()
        const result = await fetch("/api/products",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                productname,
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

        const data = await result.json()

        if(data.success){
            alert(data.message)
        }else{
            alert(data.message)
        }
    }

    return(
        <form className="w-full flex  flex-col md:grid md:grid-cols-2 bg-black p-4 gap-4"
            onSubmit={(e)=> addProduct(e)}>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">title</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="title"
                    onChange={(e)=>setProductname(e.target.value)}
                    required/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">description</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="description"
                    onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">price</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="price"
                    onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">drive</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="drive"
                    onChange={(e)=> setDrive(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">location</h1>
                <select className="w-full rounded bg-transparent border p-2"
                    onChange={(e)=> setDrive(e.target.value)}>
                        <option value="japan" className="bg-black">Japan</option>
                        <option value="zimbabwe" className="bg-black">Zimbabwe</option>
                    </select>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">milage</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="milage"
                    onChange={(e)=> setMilage(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">year</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="year"
                    onChange={(e)=>setYear(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">engine</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="engine"
                    onChange={(e)=>setEngine(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">transmission</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="transmission"
                    onChange={(e)=>setTransimission(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">fuel</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="fuel"
                    onChange={(e)=>setFuel(e.target.value)}/>
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
    )
}