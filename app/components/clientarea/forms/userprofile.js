


export default function UserProfileForm(){
    return ( 
        <div className="bg-white rounded shadow">
					<div className="rounded-t bg-purple-900 p-2">
						<h5 className="text-white">Profile</h5>
					</div>
					<form className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
						<div className="w-full">
							<h5 className="text-sm">First name(s)</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
								placeholder="first name"
								name="firstname"
								value={"Elvin"}
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Surname</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
								placeholder="first name"
								name="firstname"
								value={"Kakomo"}
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Gender</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
								placeholder="first name"
								name="firstname"
								value={"Male"}
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Id Number</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
								placeholder="first name"
								name="firstname"
								value={"42-289200W49"}
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Email</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
								placeholder="first name"
								name="firstname"
								value={"elvin@gmail.com"}
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Phone Number</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
								placeholder="first name"
								name="firstname"
								value={"0775953491"}
							/>
						</div>
						<div className="w-full">
							<h5 className="text-sm">Physical Address</h5>
							<input
								className="w-full border border-gray-300 rounded h-10 bg-gray-300 px-2 text-sm font-semibold"
								placeholder="first name"
								name="firstname"
								value={"1068 mabvazuva rusape"}
							/>
						</div>
					</form>
				</div>
    )
}