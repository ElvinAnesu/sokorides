"use client"
import Image from "next/image"
import ProductCard1 from "../cards/productcard1"

export default function HomeSlider(){
        return(
            <div className="w-full flex gap-4">
                <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
            </div>
        )
}