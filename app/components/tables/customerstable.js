"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EyeOpenIcon, TrashIcon, PlusIcon } from "@radix-ui/react-icons"

const PAGE_SIZE = 10

export default function CustomersTable(){
    const router = useRouter()
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState(null)
    const [fetchingfailed, setFetchingFailed] = useState(false)
    const [errorMessage, setErrormessage] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const getCustomers = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/customers/?page=${page}&searchQuery=${searchQuery}&pageSize=${PAGE_SIZE}`,{
            method:"GET",
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            setCustomers(data.customers)
            console.log(data.customers)
            setIsLoading(false)
        }else{
            setErrormessage(data.message)
            setFetchingFailed(true)
            setIsLoading(false)
        }
    }

    const deleteCustomer = async(_id)=>{
        const response = await fetch(`/api/customers/${_id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })

        const data = await response.json()

        if(data.success){
            alert(data.message)
        }else{
            alert(data.message)
        }
    }
    useEffect(()=>{
        getCustomers()
    },[])

    return (
			<div className="flex flex-col w-full h-full gap-2">
				<div className="flex w-full items-center justify-end">
					<button
						className="bg-purple-900 rounded p-2 flex text-white text-sm items-center gap-2"
						onClick={() => router.push("/dashboard/customers/createnew")}
					>
						<PlusIcon /> Add New
					</button>
				</div>
				<div className="w-full h-full bg-gray-200 rounded p-4">
					{fetchingfailed ? (
						<div className="w-full h-full items-center justify-center">
							<h1>{errorMessage}</h1>
						</div>
					) : isLoading ? (
						<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
							<div className="flex flex-col items-center justify-center  w-full h-full">
								<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
							</div>
						</div>
					) : (
						<table className="w-full">
							<tbody>
								<tr className="px-2 bg-purple-900 text-white rounded-full">
									<td className="px-2 rounded-s-full text-sm font-semibold">
										#
									</td>
									<td className="px-2 text-sm font-semibold">Surname</td>
									<td className="text-sm font-semibold">Firstname</td>
									<td className="text-sm font-semibold">Phonenumber</td>
									<td className="px-2 rounded-e-full text-sm font-semibold">
										Action
									</td>
								</tr>
								{customers.map((customer, index) => (
									<tr className="border-b border-gray-500" key={index}>
										<td className="px-2  text-sm">{index + 1}</td>
										<td className="px-2 text-sm">{customer.surname}</td>
										<td className="text-sm">{customer.firstname}</td>
										<td className="text-sm">{customer.phonenumber}</td>
										<td className="px-2 rounded-e-full flex items-center justify-around">
											<button
												onClick={() => {
													router.push(`/dashboard/customers/${customer._id}`);
												}}
											>
												<EyeOpenIcon />
											</button>
											<button
												onClick={() => {
													deleteCustomer(customer._id);
												}}
											>
												<TrashIcon />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		);
}