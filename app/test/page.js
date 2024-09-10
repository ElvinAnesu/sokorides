"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ProductCard2 from '../components/cards/productcard2'

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel()

  return (
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
  )
}
