export function trimName(name) {
	if (name.length > 15) {
		return name.substring(0, 15) + "..."; // Trim and add ellipsis
	}
	return name; // Return the original name if it's 20 characters or less
}

export function formatDate(dateString) {
	const date = new Date(dateString); // Create a Date object from the string

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		return ""; // Return an empty string for invalid dates
	}

	// Format the date to "Mon 31 Jan 2023"
	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	return new Intl.DateTimeFormat("en-US", options).format(date);
}
export function extractDate(dateString) {
	 const date = new Date(dateString).toISOString().split("T")[0]; // Get YYYY-MM-DD format
	return date
}
export function ownerAction() {
	const role = localStorage.getItem("role");
	if (role === "owner") { 
		return  true
	} else {
		return false
	}
} 

export function stringToCurrency(stringCurrency) {
	const numberValue = parseFloat(stringCurrency); 
	const formattedValue = numberValue.toFixed(2);
	return formattedValue;
}