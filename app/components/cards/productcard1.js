"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'


export default function ProductCard1({title, price, image,_id}){

    const router = useRouter()
    const [emblaRef] = useEmblaCarousel()

    return(
        <button className=" relative w-full h-full bg-gray-200 shadow rounded border border-gray-200 flex items-center justify-center"
            onClick={() => router.push(`/store/products/${_id}`)}>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                        <div className="embla__slide">
                            <Image src={"/images/car1.png"} alt="car1" height={300} width={300} />
                        </div>
                        <div className="embla__slide">
                            <Image src={"/images/car3.png"} alt="car1" height={300} width={300} />
                        </div>
                        <div className="embla__slide">
                            <Image src={"/images/car3.png"} alt="car1" height={300} width={300} />
                        </div>
                </div>
            </div>
            <div className="flex items-center justify-between absolute left-8 bottom-3 w-1/2 transform -translate-y-1/2 border border-gray-900 p-1 rounded-full bg-black opacity-90">
                <h1 className="text-sm font-semibold text-white">{title}</h1>
                <span className="bg-gray-900 text-white p-1 text-sm rounded-full font-semibold opacity-100">
                    {price}
                </span>
            </div>
        </button>
    )
}