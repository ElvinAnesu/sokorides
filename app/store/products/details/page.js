"use client"
import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon, DividerVerticalIcon, Share1Icon } from "@radix-ui/react-icons"

export default function ProductDetail(){
    return(
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="bg-black w-full h-full rounded-xl p-4 flex flex-col md:grid md:grid-cols-2">
                <div className="flex flex-col w-full h-full items-center justify-center gap-4">
                    <div className="flex items-center justify-center">
                        <Image src="/images/car1.png" alt="car1" height={500} width={500} />
                    </div>
                    <div className="flex items-center border rounded-full p-2">
                        <button className="px-4"><ArrowLeftIcon /></button>
                        <DividerVerticalIcon />
                        <button className="px-4"><ArrowRightIcon /></button>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="border rounded p-2">
                            <Image src="/images/car1.png" height={100} width={100}  alt="car1"/>
                        </div>
                        <div className="border rounded p-2">
                            <Image src="/images/car1.png" height={100} width={100}  alt="car1"/>
                        </div>
                        <div className="border rounded p-2">
                            <Image src="/images/car1.png" height={100} width={100}  alt="car1"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full w-full gap-4  p-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-semibold">Honda Fit Hybrid</h1>
                        <div className="flex">
                            <span className="flex bg-blue-500 rounded-full p-2 font-semibold">USD3569.00</span>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-gray-100 font-semibold">SPECS</h1>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="w-full flex p-2 border rounded-full items-center justify-between bg-[#0a0a0a]">
                                <h1 className="text-sm">milage</h1>
                                <h1 className="text-sm font-semibold">130 km</h1>
                            </div>
                            <div className="w-full flex p-2 border rounded-full items-center justify-between bg-[#0a0a0a]">
                                <h1 className="text-sm">year</h1>
                                <h1 className="text-sm font-semibold">2015/3</h1>
                            </div>
                            <div className="w-full flex p-2 border rounded-full items-center justify-between bg-[#0a0a0a]">
                                <h1 className="text-sm">engine</h1>
                                <h1 className="text-sm font-semibold">2,000cc</h1>
                            </div>
                            <div className="w-full flex p-2 border rounded-full items-center justify-between bg-[#0a0a0a]">
                                <h1 className="text-sm">trans</h1>
                                <h1 className="text-sm font-semibold">CVT</h1>
                            </div>
                            <div className="w-full flex p-2 border rounded-full items-center justify-between bg-[#0a0a0a]">
                                <h1 className="text-sm">fuel</h1>
                                <h1 className="text-sm font-semibold">Petrol</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-2 py-1 bg-teal-900 rounded text-xs"><Share1Icon />Share</button>
                        <button className="flex items-center gap-1 px-2 py-1 bg-teal-900 rounded text-xs"><Share1Icon />Call</button>
                        <button className="flex items-center gap-1 px-2 py-1 bg-green-900 rounded text-xs"><Share1Icon />Whatsapp</button>
                    </div>
                </div>
            </div>
        </div>
    )
}