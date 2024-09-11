"use client"
import Image from "next/image"
import HomeSlider from "../components/sliders/homesliders"
import ProductCard1 from "../components/cards/productcard1"
import ProductCard2 from "../components/cards/productcard2"
import { useRouter } from "next/navigation"
import useEmblaCarousel from 'embla-carousel-react'

export default function Store() {
    const router = useRouter()
    const [emblaRef] = useEmblaCarousel()

    return (
      <div className="flex flex-col gap-4 p-4 items-center justify-center w-full h-full">
           <div className="hidden md:grid grid-cols-4 w-full gap-4">
                <div className="col-span-3">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container">
                            <div className="embla__slide">
                                <ProductCard2 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                            </div>
                            <div className="embla__slide">
                                <ProductCard2 title={"Honda FIT"} price={"USD8300"} image={"/images/car2.png"}/>
                            </div>
                            <div className="embla__slide">
                                <ProductCard2 title={"Honda FIT"} price={"USD8300"} image={"/images/car3.png"}/>
                            </div>
                            <div className="embla__slide">
                                <ProductCard2 title={"Honda FIT"} price={"USD8300"} image={"/images/car4.png"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car5.png"}/>
                    <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car6.png"}/>
                </div>
           </div>
           <div className="w-full flex flex-col gap-4 md:hidden">
                <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car5.png"}/>
                <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car5.png"}/>
                <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car5.png"}/>
           </div>
           <div className="flex w-full items-center justify-center md:hidden">  
                <div className="flex">
                    <button className="border rounded-full px-4 py-2 bg-black" onClick={()=>router.push("/store/products")}>View All</button>
                </div>
           </div>
           <div className="hidden md:flex md:flex-col w-screen h-full px-4">  
                <HomeSlider />
           </div>
      </div>
    )
  }
  