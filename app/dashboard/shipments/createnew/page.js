"use  client"


export default function CreateNew(){
    return(
        <div className="w-full h-full flex flex-col gap-4 p-4 bg-black rounded">
            <h1 className="text-sm font-semibold">Create New Shipment</h1>
            <div className="flex flex-col md:grid md:grid-cols-2">
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Shipment Number</h1>
                    <input className="border rounded bg-transparent w-full p-2 test-sm"
                        placeholder="shipmentno" />
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Customer</h1>
                    <select className="border rounded bg-transparent w-full p-2 test-sm" >
                        <option className="bg-black">--select customer--</option>
                        <option className="bg-black">Elvin Kokomo</option>
                        <option className="bg-black">Jestina Dausi</option>
                        <option className="bg-black">Anna Kokomo</option>
                    </select>
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Purchursed Vehicle</h1>
                    <input className="border rounded bg-transparent w-full p-2 test-sm"
                        placeholder="purchased vehicle" />
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Images</h1>
                    <input className="border rounded bg-transparent w-full p-1 test-sm"
                        type="file"
                        placeholder="purchased vehicle" />
                </div>
                <div className="flex flex-col p-2">
                    <button className="w-full bg-blue-500 rounded p-2">Create</button>
                </div>
            </div>
        </div>
    )
}