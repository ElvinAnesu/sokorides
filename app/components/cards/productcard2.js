"use client"
import Image from "next/image"


export default function ProductCard2({title, price, image,}){
    return(
        <div className=" relative w-full h-full bg-black shadow rounded border border-gray-500 flex items-center justify-center">
            <Image src={image} alt="car1" height={400} width={700} />
            <div className="flex w-1/4 items-center justify-between absolute left-8 bottom-3 transform -translate-y-1/2 border p-1 rounded-full">
                <h1 className="text-sm font-semibold">{title}</h1>
                <span className="bg-blue-600 p-1 text-sm rounded-full font-semibold">
                    {price}
                </span>
            </div>
        </div>
    )
}