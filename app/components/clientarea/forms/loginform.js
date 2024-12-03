import Link from "next/link";



export default function CustomerLoginForm() {
    return (
        <div className="flex flex-col gap-8 bg-white rounded shadow p-8">
            <h1 className="font-semibold">Login</h1> 
            <form className="flex flex-col gap-4">
                <input className="border rounded h-10 px-2"
                    placeholder="phonenumber"
                    type="number" />
                <input className="border rounded h-10 px-2"
                    placeholder="password" />
                <Link href="/clientarea" className="bg-purple-900 rounded p-2 flex items-center justify-center text-white"
                    >
                    Login
                </Link>
            </form>
        </div>
    )
}