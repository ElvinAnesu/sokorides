"use client";
import { loginCustomer } from "@/lib/server-actions/customer";
import { useActionState } from "react";

export default function LoginForm() {
    const [state, formAction] = useActionState(loginCustomer, null);

    return (
        <div className="flex flex-col gap-8 bg-white rounded shadow p-8">
            <h1 className="font-semibold">Login</h1>
            <form className="flex flex-col gap-4" action={formAction}>
                <input 
                    className="border rounded h-10 px-2"
                    placeholder="phonenumber"
                    type="tel"
                    name="phoneNumber"
                />
                <input 
                    className="border rounded h-10 px-2"
                    placeholder="password"
                    type="password"
                    name="password"
       
                />
                {state?.error && (
                    <p className="text-red-500 text-sm">{state.error}</p>
                )}
                <button 
                    className="bg-purple-900 rounded p-2 flex items-center justify-center text-white"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
}