"use client"
import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import { addClientDetails } from "@/lib/server-actions/lease";
import { useActionState } from "react";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function LeaseCar() {
	const [car, setCar] = useState();
	const [totalPice, setTotalPrice] = useState();
	const [monthlyPayments, setMonthlyPayments] = useState();
	const [downPayment, setDownpayment] = useState();
	const [dateOfIssue, setDateOfIssue] = useState();
	const [customers, setCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [state, formAction, pending] = useActionState(addClientDetails, undefined);

	// Fetch customers with search
	const fetchCustomers = async (query = '') => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/customers/all?search=${query}`);
			const data = await response.json();
			if (data.customers) {
				setCustomers(data.customers);
			}
		} catch (error) {
			console.error('Error fetching customers:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Debounce search
	useEffect(() => {
		const timer = setTimeout(() => {
			fetchCustomers(searchQuery);
		}, 500); // Wait 500ms after last keystroke before searching

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const handleCustomerSelect = (e) => {
		const customer = customers.find(c => c._id === e.target.value);
		setSelectedCustomer(customer);
	};

	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Lease Vehicle"} />
			<form
				className="bg-white rounded shadow grid grid-cols-1 md:grid-cols-3 p-4 gap-4"
				action={formAction}
			>
				<div className="md:col-span-3">
					<h1 className="font-semibold text-sm">Customer Details</h1>
				</div>
				
				{/* Search and Customer Selection */}
				<div className="md:col-span-3 space-y-4">
					{/* Search Input */}
					<div className="relative">
						<input
							type="text"
							placeholder="Search customers..."
							className="w-full border border-gray-300 rounded h-10 pl-10 pr-4 bg-gray-300 text-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
					</div>

					{/* Customer Dropdown */}
					<div>
						<h5 className="text-sm mb-2">Select Customer</h5>
						<select
							className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
							onChange={handleCustomerSelect}
							required
							disabled={isLoading}
						>
							<option value="">
								{isLoading ? "Loading..." : "Select a customer"}
							</option>
							{customers.map((customer) => (
								<option key={customer._id} value={customer._id}>
									{customer.firstname} {customer.surname} - {customer.idNumber}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Hidden input for customer ID */}
				<input
					type="hidden"
					name="clientId"
					value={selectedCustomer?._id || ''}
				/>

				{/* Display selected customer details */}
				{selectedCustomer && (
					<>
						<div className="w-full">
							<h5 className="text-sm">First Name</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-100 px-2 text-sm"
								value={selectedCustomer.firstname || ''}
								disabled
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Surname</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-100 px-2 text-sm"
								value={selectedCustomer.surname || ''}
								disabled
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">ID Number</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-100 px-2 text-sm"
								value={selectedCustomer.idNumber || ''}
								disabled
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Phone Number</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-100 px-2 text-sm"
								value={selectedCustomer.phonenumber || ''}
								disabled
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Address</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-100 px-2 text-sm"
								value={selectedCustomer.address || ''}
								disabled
							/>
						</div>
					</>
				)}

				<div className="md:col-span-3">
					<h1 className="font-semibold text-sm">Lease Details</h1>
				</div>

				{/* Rest of your existing form fields */}
				<div className="w-full">
					<h5 className="text-sm">Car</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Car"
						defaultValue={car}
						onChange={(e) => setCar(e.target.value)}
						name="leasedCar"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Date of Issue</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						type="date"
						defaultValue={dateOfIssue}
						onChange={(e) => setDateOfIssue(e.target.value)}
						name="dateOfIssue"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Total Price</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Price"
						name="totalPrice"
						defaultValue={totalPice}
						onChange={(e) => setTotalPrice(e.target.value)}
						type="number"
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Monthly Payments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						type="number"
						name="monthlyPayments"
						defaultValue={monthlyPayments}
						onChange={(e) => setMonthlyPayments(e.target.value)}
						placeholder="instalments"
					/>
					{state?.errors.monthlyPayments && (
						<p className="text-xs text-red-600">
							{state?.errors.monthlyPayments}
						</p>
					)}
				</div>
				<div className="w-full">
					<h5 className="text-sm">Down Payment</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm"
						placeholder="Payment"
						name="downPayment"
						defaultValue={downPayment}
						onChange={(e) => setDownpayment(e.target.value)}
						type="numbers"
					/>
					{state?.errors.downPayment && (
						<p className="text-xs text-red-600">{state?.errors.downPayment}</p>
					)}
				</div>
				<div className="hidden md:block"></div>
				<button 
					className="bg-purple-900 rounded text-white p-2" 
					type="submit"
					disabled={!selectedCustomer}
				>
					{pending ? "loading" : "Next"}
				</button>
			</form>
		</div>
	);
}


