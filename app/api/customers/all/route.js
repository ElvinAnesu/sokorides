import { NextResponse } from 'next/server';
import connectdb from "@/mongodb";
import User from "@/app/models/user";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const search = searchParams.get('search') || '';

		await connectdb();

		// Build search query
		const searchQuery = search ? {
			role: 'customer',
			$or: [
				{ firstname: { $regex: search, $options: 'i' } },
				{ surname: { $regex: search, $options: 'i' } },
				{ idNumber: { $regex: search, $options: 'i' } },
				{ phonenumber: { $regex: search, $options: 'i' } }
			]
		} : { role: 'customer' };

		const customers = await User.find(searchQuery)
			.select('firstname surname idNumber phonenumber address _id')
			.limit(50); // Limit results to prevent overwhelming the UI
		
		// Convert _id to string for each customer
		const _customers = customers.map(customer => ({
			...customer.toObject(),
			_id: customer._id.toString()
		}));

		return NextResponse.json({ customers: _customers });
	} catch (error) {
		console.error('Error fetching customers:', error);
		return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
	}
}