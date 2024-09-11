"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'


export default function ProductCard1({title, price, image,}){

    const router = useRouter()
    const [emblaRef] = useEmblaCarousel()

    return(
        <button className=" relative w-full h-full bg-black shadow rounded border border-gray-500 flex items-center justify-center"
            onClick={() => router.push("/store/products/details")}>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                        <div className="embla__slide">
                            <Image src={image} alt="car1" height={300} width={300} />
                        </div>
                        <div className="embla__slide">
                            <Image src={image} alt="car1" height={300} width={300} />
                        </div>
                        <div className="embla__slide">
                            <Image src={image} alt="car1" height={300} width={300} />
                        </div>
                </div>
            </div>
            <div className="flex items-center justify-between absolute left-8 bottom-3 w-1/2 transform -translate-y-1/2 border p-1 rounded-full">
                <h1 className="text-sm font-semibold">{title}</h1>
                <span className="bg-blue-600 p-1 text-sm rounded-full font-semibold">
                    {price}
                </span>
            </div>
        </button>
    )
}