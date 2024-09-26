"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { CldUploadButton } from "next-cloudinary"


export default function AddNew(){

    const router = useRouter()
    const [productname, setProductname] = useState()
    const [price, setPrice] = useState()
    const [milage, setMilage] = useState()
    const [year, setYear] = useState()
    const [engine, setEngine] = useState()
    const [transmission, setTransimission] = useState()
    const [description, setDescription] = useState()
    const [drive, setDrive] = useState()
    const [coverimage, setCoverimage] = useState()
    const [gallery, setGallery] = useState([])
    const [location, setLocation] = useState("japan")
	const [fuel, setFuel] = useState()
	const [isloading, setIsLoading] = useState(false)


	const uploadSuccess = (results, options) => {
		setGallery(gallery => [...gallery, results.info.url])
	};
    const addProduct = async(e) => {
		e.preventDefault()
		setIsLoading(true)
        const result = await fetch("/api/products",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                productname,
                price,
                milage,
                year,
                engine,
                transmission,
                description,
                drive,
                coverimage,
                gallery,
                location,
                fuel
            })
        })

        const data = await result.json()

		if (data.success) {
			setIsLoading(false)
            alert(data.message)
		} else {
			setIsLoading(false);
            alert(data.message)
        }
    }

    return (
			<div>
				{isloading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
						</div>
					</div>
				) : (
					<form
						className="w-full flex  flex-col md:grid md:grid-cols-3 p-4 gap-4"
						onSubmit={(e) => addProduct(e)}
					>
						<div className="md:col-span-3 flex items-center gap-2">
							<button
								className="border border-black rounded-full"
								onClick={(e) => router.back()}
							>
								<ArrowLeftIcon className="h-6 w-6" />
							</button>
							<h1 className="text-black font-semibold">Add a new car</h1>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">title</h1>
							<input
								className="w-full rounded bg-transparent border border-black p-2 text-sm text-black"
								placeholder="title"
								onChange={(e) => setProductname(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">description</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="description"
								onChange={(e) => setDescription(e.target.value)}
								value={description}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">price</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="price"
								onChange={(e) => setPrice(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">drive</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="drive"
								onChange={(e) => setDrive(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">location</h1>
							<select
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								onChange={(e) => setLocation(e.target.value)}
							>
								<option value="japan" className="text-black">
									Japan
								</option>
								<option value="zimbabwe" className="text-black">
									Zimbabwe
								</option>
							</select>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">milage</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="milage"
								onChange={(e) => setMilage(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">year</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="year"
								onChange={(e) => setYear(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">engine</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="engine"
								onChange={(e) => setEngine(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">transmission</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="transmission"
								onChange={(e) => setTransimission(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">fuel</h1>
							<input
								className="w-full rounded bg-transparent border border-black  p-2 text-sm text-black"
								placeholder="fuel"
								onChange={(e) => setFuel(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">images</h1>
							<CldUploadButton
								className="border border-black text-black rounded text-white rounded p-1"
								uploadPreset="sokoimgs"
								onSuccess={(results, options) =>
									uploadSuccess(results, options)
								}
							/>
						</div>
						<div></div>
						<button className="bg-purple-900 rounded p-2 text-white">
							Upload
						</button>
					</form>
				)}
			</div>
		);
}