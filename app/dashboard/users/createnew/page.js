"use  client"


export default function CreateNew(){
    return(
        <div className="w-full h-full flex flex-col gap-4 p-4 bg-black rounded">
            <h1 className="text-sm font-semibold">Create New User</h1>
            <div className="flex flex-col md:grid md:grid-cols-2">
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">First Name</h1>
                    <input className="border rounded bg-transparent w-full p-2 test-sm"
                        placeholder="first name" />
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Surname</h1>
                    <input className="border rounded bg-transparent w-full p-2 test-sm"
                        placeholder="surname" />
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Phone Number</h1>
                    <input className="border rounded bg-transparent w-full p-2 test-sm"
                        placeholder="phone number" />
                </div>
                <div className="flex flex-col p-2">
                    <h1 className="text-xs ">Role</h1>
                    <select className="border rounded bg-transparent w-full p-2 test-sm" >
                        <option className="bg-black">--select role--</option>
                        <option className="bg-black">admin</option>
                        <option className="bg-black">user</option>
                    </select>
                </div>
                <div className="flex flex-col p-2">
                    <button className="w-full bg-blue-500 rounded p-2">Create</button>
                </div>
            </div>
        </div>
    )
}