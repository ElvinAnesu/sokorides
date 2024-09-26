"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Pencil1Icon, Cross1Icon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function ViewProduct({ params }) {

	const router = useRouter();
	const { _id } = params;
	const [productTitle, setProductTitle] = useState();
	const [currency, setCurrency] = useState();
	const [description, setDescription] = useState();
	const [milage, setMilage] = useState();
	const [year, setYear] = useState();
	const [engine, setEngine] = useState();
	const [transmission, setTransimission] = useState();
	const [drive, setDrive] = useState();
	const [price, setPrice] = useState();
	const [location, setLocation] = useState();
	const [coverimage, setCoverimage] = useState();
	const [gallery, setGallery] = useState([]);
	const [displayimage, setDisplayimage] = useState();
	const [showeditDialog, setShowwEditDialog] = useState(false);
	const [fuel, setFuel] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const getProduct = async () => {
		setIsLoading(true);
		const response = await fetch(`/api/products/${_id}`, {
			method: "GET",
		});

		const data = await response.json();

		if (data.success) {
			setProductTitle(data.product.productname);
			setPrice(data.product.price);
			setCurrency(data.product.currency);
			setDescription(data.product.description);
			setMilage(data.product.milage);
			setYear(data.product.year);
			setEngine(data.product.engine);
			setDrive(data.product.drive);
			setTransimission(data.product.transmission);
			setLocation(data.product.location);
			setCoverimage(data.product.coverimage);
			setGallery(data.product.gallery);
			setDisplayimage(data.product.gallery[0]);
			setFuel(data.product.fuel);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};

	const editProduct = async (e) => {
		e.preventDefault();
		setShowwEditDialog(false);
		setIsLoading(true);
		const response = await fetch(`/api/products/${_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				productname: productTitle,
				currency,
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
				fuel,
			}),
		});

		const data = await response.json();

		if (data.success) {
			setIsLoading(false);
			alert(data.message);
		} else {
			setIsLoading(false);
			alert(data.message);
		}
	};

	const uploadSuccess = (results, options) => {
		setGallery((gallery) => [...gallery, results.info.url]);
	};

	useEffect(() => {
		getProduct();
	}, []);

	return (
		<div className="flex flex-col w-full h-full p-4">
			{isLoading ? (
				<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
					<div className="flex flex-col items-center justify-center  w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
					</div>
				</div>
			) : (
				<div className="flex flex-col md:grid md:grid-cols-2 gap-4">
					<div className="w-full h-full flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<button
								className="border border-purple-900 text-purple-900 rounded rounded-full flex items-center justify-center"
								onClick={() => router.back()}
							>
								<ArrowLeftIcon className="h-6 w-6" />
							</button>
							<h1 className="text-sm font-semibold">Car Details</h1>
						</div>
						<div className="w-full flex items-center justify-center h-80">
							<CldImage
								width="300"
								height="300"
								src={displayimage}
								sizes="100vw"
								alt="car description"
							/>
						</div>
						<div className="flex max-w-full px-4 py-2 overflow-y-hidden items-center justify-center gap-4">
							{gallery.map((image, index) => (
								<button
									className="border border-purple-900 rounded flex flex-col items-center justify-center min-h-24 min-w-24"
									key={index}
									onClick={() => setDisplayimage(image)}
								>
									<CldImage
										width="100"
										height="100"
										src={gallery[index]}
										sizes="100vw"
										alt="car description"
									/>
								</button>
							))}
						</div>
					</div>
					<div className="w-full h-full flex flex-col gap-4">
						<div className="flex items-center justify-end">
							<button
								className="flex items-center justify-center bg-purple-900 text-white rounded gap-1 px-4 py-2 text-sm"
								onClick={() => setShowwEditDialog(true)}
							>
								Edit <Pencil1Icon />{" "}
							</button>
						</div>
						<h1 className="text-3xl font-semibold text-black">
							{productTitle}
						</h1>
						<div>
							<span className="bg-purple-900 text-white p-2 rounded-full text-sm font-semibold">{`${currency} ${price}`}</span>
						</div>
						<hr className="border-gray-900" />
						<p className="text-sm">{description}</p>
						<h1 className="font-semibold">SPECS</h1>
						<div className="w-full">
							<table className="w-full">
								<tbody>
									<tr className="bg-gray-200 border-b border-gray-400">
										<td className="text-sm font-semibold px-2">location</td>
										<td className="text-sm px-2">{location}</td>
									</tr>
									<tr className="bg-gray-200 border-b border-gray-400">
										<td className="text-sm font-semibold px-2">milage</td>
										<td className="text-sm px-2">{milage}</td>
									</tr>
									<tr className="bg-gray-200 border-b border-gray-400">
										<td className="text-sm font-semibold px-2">year</td>
										<td className="text-sm px-2">{year}</td>
									</tr>
									<tr className="bg-gray-200 border-b border-gray-400">
										<td className="text-sm font-semibold px-2">engine</td>
										<td className="text-sm px-2">{engine}</td>
									</tr>
									<tr className="bg-gray-200 border-b border-gray-400">
										<td className="text-sm font-semibold px-2">transmission</td>
										<td className="text-sm px-2">{transmission}</td>
									</tr>
									<tr className="bg-gray-200 border-b border-gray-400">
										<td className="text-sm font-semibold px-2">drive</td>
										<td className="text-sm px-2">{drive}</td>
									</tr>
									<tr className="bg-gray-200 ">
										<td className="text-sm font-semibold px-2">fuel</td>
										<td className="text-sm px-2">{fuel}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
			{showeditDialog && (
				<div className="absolute  top-0 left-0 w-full h-full flex  items-center justify-center ">
					<form
						className="flex  flex-col md:grid md:grid-cols-2 bg-gray-200 p-4 gap-4 "
						onSubmit={(e) => editProduct(e)}
					>
						<div className="flex w-full md:col-span-2 items-center justify-end">
							<button
								className="p-2 border border-gray-900 rounded"
								onClick={() => setShowwEditDialog(false)}
							>
								<Cross1Icon />
							</button>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">title</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="title"
								onChange={(e) => setProductTitle(e.target.value)}
								value={productTitle}
								required
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">description</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="description"
								onChange={(e) => setDescription(e.target.value)}
								value={description}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">price</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="price"
								onChange={(e) => setPrice(e.target.value)}
								value={price}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">drive</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="drive"
								onChange={(e) => setDrive(e.target.value)}
								value={drive}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">location</h1>
							<select
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								onChange={(e) => setLocation(e.target.value)}
							>
								<option value="japan" className="bg-black">
									Japan
								</option>
								<option value="zimbabwe" className="bg-black">
									Zimbabwe
								</option>
							</select>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">milage</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="milage"
								onChange={(e) => setMilage(e.target.value)}
								value={milage}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">year</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="year"
								onChange={(e) => setYear(e.target.value)}
								value={year}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">engine</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="engine"
								onChange={(e) => setEngine(e.target.value)}
								value={engine}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">transmission</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="transmission"
								onChange={(e) => setTransimission(e.target.value)}
								value={transmission}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">fuel</h1>
							<input
								className="w-full rounded bg-transparent border border-gray-900 p-2"
								placeholder="fuel"
								onChange={(e) => setFuel(e.target.value)}
								value={fuel}
							/>
						</div>
						<div className="flex flex-col w-full gap-1">
							<h1 className="text-xs font-semibold">cover image</h1>
							<CldUploadButton
								className="border border-black text-black rounded text-white rounded p-1"
								uploadPreset="sokoimgs"
								onSuccess={(results, options) =>
									uploadSuccess(results, options)
								}
							/>
						</div>
						<div></div>
						<button className="bg-purple-900 text-white rounded p-2">
							Upload
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
