"use client"
import { useState } from "react";
import { sendShipmentNotification } from "@/lib/actions";

export default function SendNotificationForm({ notifications , customerphone, _id }) { 

	
	const [notification, setNotification] = useState(""); // State for input value
	const handleSendMessage = async() => {
		await sendShipmentNotification(_id, notification, customerphone);
		setNotification("")
	};

	return (
		<div className="flex flex-col h-full p-4 border border-gray-300 rounded-lg shadow-md">
			<div className="flex-1 overflow-y-auto mb-4">
				<ul className="space-y-2">
					{notifications.map((message, index) => (
						<li key={index} className="bg-gray-300 text-black text-xs p-2 rounded-md">
							{message}
						</li>
					))}
				</ul>
			</div>
			<div className="flex">
				<input
					type="text"
					className="flex-1 border border-gray-300 rounded-md py-2 px-3 mr-2"
					placeholder="Type your message..."
					onChange={(e) => setNotification(e.target.value)} 
					value={notification}
				/>
				<button
					className="bg-blue-500 text-white rounded-md py-2 px-4"
					onClick={handleSendMessage}
				>
					Send
				</button>
			</div>
		</div>
	);
};
