"use client"
import { useEffect, useState } from "react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"


export default function CreateNew(){
    
    const router = useRouter()
    const [customers, setCustomers] = useState([])
    const [customername, setCustomername] = useState()
    const [customerphone, setCustomerphone] = useState()
    const [customeremail, setCustomeremail] = useState()
    const [purchaseditem, setPurchaseditem] = useState()
    const [price, setPrice] = useState()
    const [origin, setOrigin] = useState()
    const [destination, setDestination] = useState()
    const [isLoading, setIsLoading] = useState(false)


    const getCustomers = async()=>{
        const response = await fetch("/api/customers",{
            method:"GET",
            headers:{"Content-Type":"applicaton/json"}
        })
        const data = await response.json()
        if(data.success){
            setCustomers(data.customers)
        }else{
            alert(data.message)
        }
    }
    const setCustomerdetails = (index) => {
        setCustomername(`${customers[index].surname} ${customers[index].firstname}`)
        setCustomerphone(customers[index].phonenumber)
        setCustomeremail(customers[index].customeremail)
    }
    const createShipment = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch("/api/shipments",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                customername,
                customerphone,
                customeremail,
                purchaseditem,
                origin,
                destination,
                price
            })
        })
        const data = await response.json()
        if(data.success){
            setIsLoading(false)
            alert(data.message)
        }else{
            setIsLoading(false)
            alert(data.message)
        }
    }
    useEffect(()=>{
        getCustomers()
    },[])
    
    return (
			<div className="w-full h-full flex flex-col gap-4 p-4">
				<div className="flex items-center gap-2">
                <button className="rounded-full border border-purple-900 text-purple-900 p-1"
                    onClick={()=>router.back()}>
						<ArrowLeftIcon className="h-5 w-5" />
					</button>
					<h1 className="text-sm font-semibold">Create New Shipment</h1>
				</div>
				{isLoading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					</div>
				) : (
					<form
						className="flex flex-col md:grid md:grid-cols-3 p-4 bg-white rounded"
						onSubmit={(e) => createShipment(e)}
					>
						<div className="flex flex-col p-2">
							<h1 className="text-xs font-bold">Customer</h1>
							<select
								className="border border-black rounded bg-transparent w-full p-2 test-sm"
								onChange={(e) => setCustomerdetails(e.target.value)}
							>
								<option className="bg-gray-900 text-white">
									--select customer--
								</option>
								{customers ? (
									customers.map((customer, index) => (
										<option
											key={index}
											className="bg-gray-900 text-white"
											value={index}
										>{`${customer.surname} ${customer.firstname}`}</option>
									))
								) : (
									<option className="bg-gray-900 text-white">
										no customers found
									</option>
								)}
							</select>
						</div>
						<div className="flex flex-col p-2">
							<h1 className="text-xs font-bold">Purchursed Vehicle</h1>
							<input
								className="border border-black rounded bg-transparent w-full p-2 test-sm"
								placeholder="purchased vehicle"
								onChange={(e) => setPurchaseditem(e.target.value)}
							/>
						</div>
						<div className="flex flex-col p-2">
							<h1 className="text-xs font-bold">Price</h1>
							<input
								className="border border-black rounded bg-transparent w-full p-2 test-sm"
								placeholder="price"
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
						<div className="flex flex-col p-2">
							<h1 className="text-xs font-bold">Origin</h1>
							<input
								className="border border-black rounded bg-transparent w-full p-2 test-sm"
								placeholder="origin"
								onChange={(e) => setOrigin(e.target.value)}
							/>
						</div>
						<div className="flex flex-col p-2">
							<h1 className="text-xs font-bold">Destination</h1>
							<input
								className="border border-black rounded bg-transparent w-full p-2 test-sm"
								placeholder="destination"
								onChange={(e) => setDestination(e.target.value)}
							/>
						</div>
						<div></div>
						<div className="flex flex-col p-2">
							<button className="w-full bg-purple-900 text-white rounded p-2">
								Create
							</button>
						</div>
					</form>
				)}
			</div>
		);
} 