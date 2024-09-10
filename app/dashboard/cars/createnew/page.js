"use client"
import { useState } from "react"


export default function AddNew(){

    return(
        <div className="w-full flex  flex-col md:grid md:grid-cols-2 bg-black p-4 gap-4">
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">title</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="title"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">description</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="description"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">price</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="price"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">milage</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="milage"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">year</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="year"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">engine</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="engine"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">trans</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="trans"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">fuel</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="fuel"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">cover image</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="cover image"/>
            </div>
            <div className="flex flex-col w-full gap-1">
                <h1 className="text-xs font-semibold">gallery</h1>
                <input className="w-full rounded bg-transparent border p-2"
                    placeholder="gallery"/>
            </div>
            <button className="bg-blue-500 rounded p-2">Upload</button>
        </div>
    )
}