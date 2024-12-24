import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";

export default function LeasedCarDetails() {
	return (
		<div className="flex flex-col gap-8">
			<BreadCrumb title={"Leased Vehicle"} />
			<form className="bg-white rounded shadow grid grid-cols-1 md:grid-cols-4 p-4 gap-4">
				<div className="md:col-span-4">
					<h1 className="font-semibold text-sm">Customer Details</h1>
				</div>
				<div className="w-full">
					<h5 className="text-sm">First name(s)</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"Elvin"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Surname</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"Kakomo"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Id Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"42-289200W49"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Email</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"elvin@gmail.com"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Phone Number</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"0775953491"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Physical Address</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"1068 mabvazuva rusape"}
						disabled
					/>
				</div>
				<div className="md:col-span-4">
					<h1 className="font-semibold text-sm">Lease Details</h1>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Car</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"Honda Vezel"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Date of Issue</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"3 Jan 2024"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Monthly Instalments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"USD500"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Period</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"12 Months"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Period</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"12 Months"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Current Payments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"USD 300"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Balance Due</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"USD500"}
						disabled
					/>
				</div>
				<div className="w-full">
					<h5 className="text-sm">Overdue payments</h5>
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"USD500"}
						disabled
					/>
				</div>
				<div className="md:col-span-4">
					<h1 className="font-semibold text-sm">Supporting Documents</h1>
				</div>
				<div className="w-full">
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"Agreemet of sale"}
						disabled
					/>
				</div>
				<div className="w-full">
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"Proof of residence"}
						disabled
					/>
				</div>
				<div className="w-full">
					<input
						className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
						placeholder="first name"
						name="firstname"
						value={"Change of ownership"}
						disabled
					/>
				</div>
			</form>
		</div>
	);
}
