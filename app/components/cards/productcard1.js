"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CldImage } from "next-cloudinary";

export default function ProductCard1({title, price, images,_id}){

    const router = useRouter()
    const [emblaRef] = useEmblaCarousel()

    return (
			<button
				className=" relative w-full h-full bg-gray-200 shadow rounded border border-gray-200 flex items-center justify-center"
				onClick={() => router.push(`/store/products/${_id}`)}
			>
				<div className="embla" ref={emblaRef}>
					<div className="embla__container">
						{images.map((image, index) => (
							<div className="embla__slide" key={index}>
								<CldImage
									width="300"
									height="300"
									src={image}
									sizes="100vw"
									alt="car image"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="flex items-center justify-between absolute left-8 bottom-3 w-1/2 transform -translate-y-1/2 border border-gray-900 p-1 rounded-full bg-black opacity-90">
					<h1 className="text-xs font-semibold text-white">{title}</h1>
					<span className="bg-purple-900 text-white p-1 text-xs rounded-full font-semibold opacity-100">
						{price}
					</span>
				</div>
			</button>
		);
}