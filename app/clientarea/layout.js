"use client";
import { PersonIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ClientSidebar from "../components/clientarea/nav/sidebar";
import ClientMobileNav from "../components/clientarea/nav/mobilenav";

export default function ClientAreaLayout({ children }) { 
    const [showMobileNav, setShowMobileNav] = useState(false)
    return (
		<div className="h-screen w-full flex flex-col md:grid md:grid-cols-5 p-4 gap-4 bg-gray-200">
			<div className="hidden md:block">
				<ClientSidebar />
			</div>
			<div className="max-h-full md:col-span-4 flex flex-col overflow-y-auto overflow-hidden">
				<div className="w-full flex items-center mb-8 justify-end gap-2  h-16">
					<div className="flex gap-2 items-center">
						<h1 className="text-black font-bold text-sm">Elvin</h1>
						<div className="bg-purple-900 text-white h-8 w-8 rounded-full flex items-center justify-center">
							<PersonIcon className="h-6 w-6" />
						</div>
					</div>
				</div> 
				<div className="mb-4 md:hidden">
					<ClientMobileNav />
				</div>
				<div className="max-h-full w-full flex-grow ">{children}</div>
			</div>
		</div>
	);
}
