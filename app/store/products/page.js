"use client"
import ProductCard1 from "@/app/components/cards/productcard1"
import Sidebar from "@/app/components/navbars/sidebar"

export default function Products(){
    return(
        <div className="flex flex-col md:grid md:grid-cols-5 p-4">
            <Sidebar />
            <div className="w-full h-full md:col-span-4">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
                    <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                    <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                    <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                    <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                    <ProductCard1 title={"Honda FIT"} price={"USD8300"} image={"/images/car1.png"}/>
                </div>
            </div>
        </div>
    )
}