"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectdb from "@/mongodb";
import Customer from "@/app/models/customer";
import Purchase from "@/app/models/purchase";
import Payment from "@/app/models/payment";
import Invoice from "@/app/models/invoice";
import User from "@/app/models/user";
import Shipment from "@/app/models/shipment";
import { Twilio } from "twilio";
import Product from "@/app/models/product";
import Batch from "@/app/models/batch";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

const ITEMS_PER_PAGE = 5;



//customer actions
export async function getTotalCustomers() {
	try {
		connectdb();
		const totalCustomers = await Customer.countDocuments();
		return totalCustomers;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getAllCustomers() {
	try {
		connectdb();
		const customers = await Customer.find()
			const _customers = customers.map((batch) => ({
				...batch.toObject(), // Convert Mongoose document to plain object
				_id: batch._id.toString(), // Convert ObjectId to string
			}));
		return _customers;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getCustomersPages(query) {
	try {
		const searchQuery =
			query != null
				? {
						$and: [
							{
								$or: [
									{
										firstname: { $regex: new RegExp(query, "i") },
									},
									{
										surname: { $regex: new RegExp(query, "i") },
									},
								],
							},
						],
				  }
				: {};

		connectdb();
		const totalCustomers = await Customer.countDocuments(searchQuery);
		return totalCustomers;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function getPaginatedCustomers(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
					$and: [
						{
							$or: [
								{
									surname: { $regex: new RegExp(query, "i") },
								},
								{
									firstname: { $regex: new RegExp(query, "i") },
								},
							],
						},
					],
			  }
			: {};
	try {
		connectdb();
		const customers = await Customer.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE);
		
				const _customers = customers.map((batch) => ({
					...batch.toObject(), // Convert Mongoose document to plain object
					_id: batch._id.toString(), // Convert ObjectId to string
				}));
		return _customers;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getCustomerById(_id) {
	try {
		connectdb();
		const customer = await Customer.findById(_id)
		const _customer = customer.toObject() 
		_customer._id = _customer._id.toString()
		return _customer;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function deleteCustomer(_id) {
	try {
		connectdb();
		await Customer.findByIdAndDelete(_id);
	} catch (error) {
		console.log("Error:", error.message);
	}
	revalidatePath("/dashboard/customers");
	redirect("/dashboard/customers");
}
export async function createCustomer(
	firstname,
	surname,
	phonenumber,
	address,
	purchases,
	activeShipments
) {
	try {
		connectdb();
		await Customer.create({
			firstname,
			surname,
			phonenumber,
			address,
			purchases,
			activeShipments,
		});
	} catch (error) {
		console.log("Error:", error.message);
	}
	revalidatePath("/dashboard/customers");
	redirect("/dashboard/customers");
}
export async function updateCustomers(
	_id,
	firstname,
	surname,
	phonenumber,
	address,
	purchases,
	activeShipments
) {
	try {
		connectdb();
		await Customer.findByIdAndUpdate(_id, {
			firstname,
			surname,
			phonenumber,
			address,
			purchases,
			activeShipments,
		});
	} catch (error) {
		console.log("Error:", error.message);
	}
	revalidatePath("/dashboard/customers");
	redirect("/dashboard/customers");
}
   
//invoiices actions
export async function createIinvoice(
	customername,
	customerId,
	amount,
	isPaid,
	description,
	invoiceUrl
) {
	try {
		connectdb();
		await Invoice.create({
			customername,
			customerId,
			amount,
			isPaid,
			description,
			invoiceUrl,
		});
	} catch (error) {
		console.log("Error:", error.message);
	}
	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}
export async function updateInvoice(
	_id,
	customername,
	customerId,
	amount,
	isPaid,
	description,
	invoiceUrl
) {
	try {
		connectdb();
		await Invoice.findByIdAndUpdate(_id, {
			customername,
			customerId,
			amount,
			isPaid,
			description,
			invoiceUrl,
		});
	} catch (error) {
		console.log("Error:", error.message);
	}

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}
export async function getInvoicecById(_id) {
	try {
		connectdb();
		const invoice = await Invoice.findById(_id) 
		const _invoice = invoice.toObject()
		_invoice._id = _invoice._id.toString() 
		_invoice.purchase = _invoice.purchase.toString(); 
		_invoice.customerId = _invoice.customerId.toString();
		return _invoice;

	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function getInvoicesPages(query) {
	try {
		const searchQuery =
			query != null
				? {
						$and: [
							{
								$or: [
									{ description: { $regex: new RegExp(query, "i") } },
									{
										customername: { $regex: new RegExp(query, "i") },
									},
								],
							},
						],
				  }
				: {};

		connectdb();
		const totalInvoices = await Invoice.countDocuments(searchQuery);
		return totalInvoices;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function getPaginatedInvoices(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
					$and: [
						{
							$or: [
								{ description: { $regex: new RegExp(query, "i") } },
								{
									customername: { $regex: new RegExp(query, "i") },
								},
							],
						},
					],
			  }
			: {};
	try {
		connectdb();
		const invoices = await Invoice.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE); 
		
		const _invoices = invoices.map((invoice) => ({
			...invoice.toObject(), // Convert Mongoose document to plain object
			_id: invoice._id.toString(), // Convert ObjectId to string
		}));

		return _invoices;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getPendingInvoices() {
	try {
		connectdb();
		const totalInvoices = await Invoice.aggregate([
			{
				$match: { isPaid: false },
			},
			{
				$group: {
					_id: null,
					totalAmount: { $sum: "$amount" },
				},
			},
		]);
		console.log(totalInvoices[0]?.totalAmount);
		//converting amount from cents to dollars
		const dollarAmount = totalInvoices[0]?.totalAmount;
		return dollarAmount || 0;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function deleteInvoice(_id) {
	try {
		connectdb();
		await Invoice.findByIdAndDelete(_id);
	} catch (error) {
		console.log("Erroor:", error.message);
	}
	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

//purchases actions
export async function getTotalPurchases() {
	try {
		connectdb();
		const totalPurchases = await Purchase.countDocuments();
		return totalPurchases;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getLatestPurchases() {
	try {
		connectdb();
		//await new Promise((resolve) => setTimeout(resolve, 3000));
		const latestPurchases = await Purchase.find()
			.sort({ createdAt: -1 })
			.limit(5);
		return latestPurchases;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getPaginatedPurchases(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
					$and: [
						{
							$or: [
								{ customerName: { $regex: new RegExp(query, "i") } },
								{
									purchasedItem: { $regex: new RegExp(query, "i") },
								},
								{
									vehicleStatus: { $regex: new RegExp(query, "i") },
								},
							],
						},
					],
			  }
			: {};
	try {
		connectdb();
		const purchases = await Purchase.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE);
		
		const _purchases = purchases.map((batch) => ({
			...batch.toObject(), // Convert Mongoose document to plain object
			_id: batch._id.toString(), // Convert ObjectId to string
		}));
		
		return _purchases;
	} catch (error) {
		console.log(error);
	}
}
export async function getPurchasesPages(query) {
	try {
		const searchQuery =
			query != null
				? {
						$and: [
							{
								$or: [
									{ description: { $regex: new RegExp(query, "i") } },
									{
										customername: { $regex: new RegExp(query, "i") },
									},
								],
							},
						],
				  }
				: {};

		connectdb();
		const totalPurchases = await Purchase.countDocuments(searchQuery);
		return totalPurchases;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function deletePurchase(_id) {
	try {
		connectdb();
		await Purchase.findByIdAndDelete(_id);
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/purchases");
	redirect("/dashboard/purchases");
}
export async function getPurchaseById(_id) {
	try {
		connectdb();
		const purchase = await Purchase.findById(_id);
		const _purchase = purchase.toObject()
		_purchase._id = _purchase._id.toString()
		return _purchase;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function createPurchase(
	customerName,
	customerId,
	purchasedItem,
	vehicleStatus,
	totalPrice,
	currentPayment,
	customerPhonenumber,
	gallery
) {
	try {
		connectdb();
		await Purchase.create({
			customerName,
			customerId,
			purchasedItem,
			vehicleStatus,
			totalPrice,
			currentPayment,
			customerPhonenumber,
			gallery,
		});
	} catch (error) {
		console.log("Error:", error.message);
	}
	revalidatePath("/dashboard/purchases");
	redirect("/dashboard/purchases");
}
export async function updatePurchase(
	_id,
	customerName,
	customerId,
	purchasedItem,
	vehicleStatus,
	totalPrice,
	currentPayment,
	customerPhonenumber,
	gallery
) {
	try {
		connectdb();
		await Purchase.findByIdAndUpdate(_id, {
			customerName,
			customerId,
			purchasedItem,
			vehicleStatus,
			totalPrice,
			currentPayment,
			customerPhonenumber,
			gallery,
		});
	} catch (error) {
		console.log("Error:", error.message);
	}
	revalidatePath("/dashboard/purchases");
	redirect("/dashboard/purchases");
}

//payments actions
export async function getLatestPayments() {
	try {
		connectdb();
		const latestPayments = await Payment.find()
			.sort({ createdAt: -1 })
			.limit(5);
		return latestPayments;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getTotalPayments() {
	try {
		connectdb();
		const totalPayments = await Payment.aggregate([
			{
				$group: {
					_id: null,
					totalAmount: { $sum: "$amount" },
				},
			},
		]);
		return totalPayments[0].totalAmount || 0;
	} catch (error) {
		console.log("Error:", error.message);
	}
}
export async function getPaginatedPayments(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
					$and: [
						{
							$or: [
								{ description: { $regex: new RegExp(query, "i") } },
								{
									fullname: { $regex: new RegExp(query, "i") },
								},
								{ paymentMethod: { $regex: new RegExp(query, "i") } },
							],
						},
					],
			  }
			: {};
	try {
		connectdb();
		const payments = await Payment.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE); 
		
				const _payments = payments.map((batch) => ({
					...batch.toObject(), // Convert Mongoose document to plain object
					_id: batch._id.toString(), // Convert ObjectId to string
				}));
		
		return _payments;
	} catch (error) {
		console.log(error);
	}
}
export async function createPayment(
	fullname,
	date,
	amount,
	description,
	paymentMethod
) {
	try {
		connectdb();
		await Payment.create({
			fullname,
			date,
			amount,
			description,
			paymentMethod,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/payments");
	redirect("/dashboard/payments");
}
export async function deletePayment(_id) {
	try {
		connectdb();
		await Payment.findByIdAndDelete(_id);
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/payments");
	redirect("/dashboard/payments");
}
export async function getPaymentById(_id) {
	try {
		connectdb();
		const payment = await Payment.findById(_id);
		const _payment = payment.toObject()
		_payment._id = _payment._id.toString()
		return _payment;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function updatePayment(
	_id,
	fullname,
	date,
	amount,
	description,
	paymentMethod
) {
	try {
		connectdb();
		await Payment.findByIdAndUpdate(_id, {
			fullname,
			date,
			amount,
			description,
			paymentMethod,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/payments");
	redirect("/dashboard/payments");
}

// users actions
export async function getUsersPages(query) {
	try {
		const searchQuery =
			query != null
				? {
						$and: [
							{
								$or: [
									{
										firstname: { $regex: new RegExp(query, "i") },
									},
									{
										surname: { $regex: new RegExp(query, "i") },
									},
								],
							},
						],
				  }
				: {};

		connectdb();
		const totalPurchases = await User.countDocuments(searchQuery);
		return totalPurchases;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function getPaginatedUsers(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
					$and: [
						{
							$or: [
								{ surname: { $regex: new RegExp(query, "i") } },
								{ firstname: { $regex: new RegExp(query, "i") } },
							],
						},
					],
			  }
			: {};
	try {
		connectdb();
		const users = await User.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE); 
		
				const _users = users.map((batch) => ({
					...batch.toObject(), // Convert Mongoose document to plain object
					_id: batch._id.toString(), // Convert ObjectId to string
				}));
		return _users;
	} catch (error) {
		console.log(error);
	}
}
export async function getUserById(_id) {
	try {
		connectdb();
		const user = await User.findById(_id);
		const _user = user.toObject()
		_user._id = _user._id.toString()
		return _user;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function deleteUser(_id) {
	try {
		connectdb();
		await User.findByIdAndDelete(_id);
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/users");
	redirect("/dashboard/users");
}
export async function createUser(
	firstname,
	surname,
	phonenumber,
	role,
	password
) {
	try {
		connectdb();
		await User.create({
			firstname,
			surname,
			phonenumber,
			role,
			password,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/users");
	redirect("/dashboard/users");
}
export async function updateUser(
	_id,
	firstname,
	surname,
	phonenumber,
	role,
	password
) {
	try {
		connectdb();
		await User.findByIdAndUpdate(_id, {
			firstname,
			surname,
			phonenumber,
			role,
			password,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/users");
	redirect("/dashboard/users");
}

// shipments actions
export async function getShipmentsPages(query) {
	try {
		const searchQuery =
			query != null
				? {
						$and: [
							{
								$or: [
									{
										customername: { $regex: new RegExp(query, "i") },
									},
									{
										purchaseditem: { $regex: new RegExp(query, "i") },
									},
								],
							},
						],
				  }
				: {};

		connectdb();
		const totalShipments = await Shipment.countDocuments(searchQuery);
		return totalShipments;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function getPaginatedShipments(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
					$and: [
						{
							$or: [
								{ customername: { $regex: new RegExp(query, "i") } },
								{
									purchaseditem: { $regex: new RegExp(query, "i") },
								},
							],
						},
					],
			  }
			: {};
	try {
		connectdb();
		const shipments = await Shipment.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE);
		
				const _shipments = shipments.map((batch) => ({
					...batch.toObject(), // Convert Mongoose document to plain object
					_id: batch._id.toString(), // Convert ObjectId to string
				}));
		return _shipments;
	} catch (error) {
		console.log(error);
	}
}
export async function getShipmentById(_id) {
	try {
		connectdb();
		const shipment = await Shipment.findById(_id);
		const _shipment = shipment.toObject()
		_shipment._id = shipment._id.toString()
		return _shipment;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function deleteShipment(_id) {
	try {
		connectdb();
		await Shipment.findByIdAndDelete(_id);
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/shipments");
	redirect("/dashboard/shipments");
}
export async function createShipment(
	customername,
	customerphone,
	purchaseditem,
	origin,
	destination,
	price
) {
	try {
		connectdb();
		await Shipment.create({
			customername,
			customerphone,
			purchaseditem,
			origin,
			destination,
			price,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/shipments");
	redirect("/dashboard/shipments");
}
export async function updateShipment(
	_id,
	customername,
	customerphone,
	purchaseditem,
	origin,
	destination,
	price
) {
	try {
		connectdb();
		await Shipment.findByIdAndUpdate(_id, {
			customername,
			customerphone,
			purchaseditem,
			origin,
			destination,
			price,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/shipments");
	redirect("/dashboard/shipments");
}
export async function sendShipmentNotification(
	_id,
	notification,
	customerphone
) {
	try {
		connectdb();
		await Promise.all([
			Shipment.findByIdAndUpdate(_id, {
				$push: { update: notification },
			}),
			sendWhatsappMessage(notification, customerphone),
		]);
	} catch (error) {
		console.log("Error:", error.message);
	}
	revalidatePath(`/dashboard/shipments/${_id}`);
	redirect(`/dashboard/shipments/${_id}`);
}

// products actions
export async function getProductsPages(query) {
	try {
		const searchQuery =
			query != null
				? {
						$and: [
							{
								$or: [
									{
										productname: { $regex: new RegExp(query, "i") },
									},
									{
										description: { $regex: new RegExp(query, "i") },
									},
								],
							},
						],
				  }
				: {};

		connectdb();
		const totalProducts = await Product.countDocuments(searchQuery);
		return totalProducts;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function getPaginatedProducts(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
					$and: [
						{
							$or: [
								{ productname: { $regex: new RegExp(query, "i") } },
								{
									description: { $regex: new RegExp(query, "i") },
								},
							],
						},
					],
			  }
			: {};
	try {
		connectdb();
		const products = await Product.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE);
		
		const _products = products.map((batch) => ({
			...batch.toObject(), // Convert Mongoose document to plain object
			_id: batch._id.toString(), // Convert ObjectId to string
		}));
		return _products;
	} catch (error) {
		console.log(error);
	}
}
export async function getProductById(_id) {
	try {
		connectdb();
		const product = await Product.findById(_id);
		const _product = product.toObject();
		_product._id = _product._id.toString(); 
		return _product;
	} catch (error) {
		console.log("Error: ", error.message);
	}
} 
export async function deleteProduct(_id) {
	try {
		connectdb();
		await Product.findByIdAndDelete(_id);
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/cars");
	redirect("/dashboard/cars");
}
export async function createProduct(
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
) {
	try {
		connectdb();
		await Product.create({
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
			fuel,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/cars");
	redirect("/dashboard/cars");
}
export async function updateProduct(
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
) {
	try {
		connectdb();
		await Product.findByIdAndUpdate(_id, {
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
			fuel,
		});
	} catch (error) {
		console.log("Error: ", error.message);
	}
	revalidatePath("/dashboard/cars");
	redirect("/dashboard/cars");
}
//batches action
export async function getBatchesPages(query) {
	try {
		const searchQuery =
			query != null
				? {
						$and: [
							{
								$or: [
									{
										batchName: { $regex: new RegExp(query, "i") },
									},
								],
							},
						],
				  }
				: {};

		connectdb();
		const totalBatches = await Batch.countDocuments(searchQuery);
		return totalBatches;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
export async function getPaginatedBatches(query, currentPage) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;
	const searchQuery =
		query != null
			? {
				$and: [
					{
						$or: [
							{ batchName: { $regex: new RegExp(query, "i") } },
						],
					},
				],
			}
			: {};
	try {
		connectdb();
		const batches = await Batch.find(searchQuery)
			.sort({ _id: -1 })
			.skip(offset)
			.limit(ITEMS_PER_PAGE);

		// Convert _id to string
		const _batches = batches.map((batch) => ({
			...batch.toObject(), // Convert Mongoose document to plain object
			_id: batch._id.toString(), // Convert ObjectId to string
		})); 

		return _batches;
	} catch (error) {
		console.log(error);
	}
}

//send whatsapp message action
async function sendWhatsappMessage(message, to) {
	const customerPhone = to.slice(1);
	try {
		await client.messages.create({
			body: message,
			from: "whatsapp:+17744893074",
			to: `whatsapp:+263${customerPhone}`,
		});
		console.log("notification sent to", customerPhone)
	} catch (error) {
		console.error("Failed to send WhatsApp message:", error);
	}
}
