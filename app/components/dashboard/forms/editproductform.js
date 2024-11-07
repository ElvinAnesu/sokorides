"use client";
import { useState } from "react";
import { CldUploadButton, CldImage  } from "next-cloudinary";
import { updateProduct} from "@/lib/actions";

export default function EditProductForm({ product }) {  

    const _id = product._id
	const [productname, setProductName] = useState();
	const [price, setPrice] = useState();
	const [milage, setMilage] = useState();
	const [year, setYear] = useState(false);
	const [engine, setEngine] = useState();
	const [transmission, setTransmission] = useState();
	const [description, setDescription] = useState();
	const [drive, setDrive] = useState();
	const [location, setLocation] = useState();
	const [gallery, setGallery] = useState([]);
	const [fuel, setFuel] = useState();

	const uploadSuccess = (results, options) => {
		setGallery((gallery) => [...gallery, results.info.url]);
	};

	const editProduct = async (e) => {
		e.preventDefault();
        await updateProduct(
            _id,
			productname,
			price,
			milage,
			year,
			engine,
			transmission,
			description,
			drive,
			gallery,
			location,
			fuel
		);
	};

	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col w-full bg-white rounded-lg p-2">
				<form
					className="flex flex-col md:grid md:grid-cols-3 w-full gap-4 bg-gray-200 rounded p-4"
					onSubmit={(e) => editProduct(e)}
				>
					<div>
						<h1 className="text-xs font-semibold">Product Name</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								placeholder="product name"
								onChange={(e) => setProductName(e.target.value)}
								defaultValue={product.productname}
							/>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Description</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								placeholder="description"
								onChange={(e) => setDescription(e.target.value)}
								defaultValue={product.description}
							/>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Price</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								placeholder="price"
								type="number"
								onChange={(e) => setPrice(e.target.value)}
								defaultValue={product.price}
							/>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Drive</h1>
						<div className="relative">
							<select
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setDrive(e.target.value)}
								defaultValue={product.drive}
							>
								<option value="">Select Drive</option>
								<option value="4WD">4WD</option>
								<option value="2WD">2WD</option>
							</select>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Milage</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								placeholder="milage"
								onChange={(e) => setMilage(e.target.value)}
								defaultValue={product.milage}
							/>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Year</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2  pl-2 text-sm outline-2 placeholder:text-gray-500"
								placeholder="year"
								onChange={(e) => setYear(e.target.value)}
								defaultValue={product.year}
							/>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Engine</h1>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								placeholder="engine"
								onChange={(e) => setEngine(e.target.value)}
								defaultValue={product.engine}
							/>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Transmission</h1>
						<div className="relative">
							<select
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setTransmission(e.target.value)}
								defaultValue={product.transmission}
							>
								<option value="">Select Transmission</option>
								<option value="automatic">Automatic</option>
								<option value="manual">Manual</option>
							</select>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Fuel</h1>
						<div className="relative">
							<select
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setFuel(e.target.value)}
								defaultValue={product.fuel}
							>
								<option value="">Select Fuel</option>
								<option value="disel">Disel</option>
								<option value="petrol">Petrol</option>
							</select>
						</div>
					</div>
					<div>
						<h1 className="text-xs font-semibold">Location</h1>
						<div className="relative">
							<select
								className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
								onChange={(e) => setLocation(e.target.value)}
								defaultValue={product.location}
							>
								<option value="">Select Location</option>
								<option value="japan">Japan</option>
								<option value="zimbabwe">Zimbabwe</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<h1 className="text-xs font-semibold">upload images</h1>
						<CldUploadButton
							className="border border-black text-black rounded text-purple-900 rounded p-1 max-w-32 shadow"
							uploadPreset="sokoimgs"
							onSuccess={(results, options) => uploadSuccess(results, options)}
						/>
					</div>
					<button className="bg-purple-900 rounded p-2 text-white max-w-32">
						Edit
					</button>
				</form>
				<div className="w-full">
					<h1 className="text-xs font-semibold">Images</h1>
					<div className="grid grid-cols-3 md:grid-cols-8 gap-2">
						{product.gallery.map((image, index) => (
							<button
								className="border border-gray-200 rounded flex flex-col items-center justify-center min-h-24 min-w-24 overflow-hidden"
								key={index}
							>
								<CldImage
									width="100"
									height="100"
									src={image}
									sizes="100vw"
									alt="car description"
								/>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
