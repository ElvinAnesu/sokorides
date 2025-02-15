import { NextResponse } from 'next/server';
import connectdb from "@/mongodb";
import Customer from '@/app/models/customer';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(request) {
	try {
		noStore(); // Ensure we always get fresh data
		const { searchParams } = new URL(request.url);
		const search = searchParams.get('search') || '';

		await connectdb();

		// Build search query without role filter
		const searchQuery = search ? {
			$or: [
				{ firstname: { $regex: search, $options: 'i' } },
				{ surname: { $regex: search, $options: 'i' } },
				{ idNumber: { $regex: search, $options: 'i' } },
				{ phonenumber: { $regex: search, $options: 'i' } }
			]
		} : {};

		const customers = await Customer.find(searchQuery)
			.select('firstname surname idNumber phonenumber address _id')
			.sort({ createdAt: -1 }) // Sort by newest first
			.limit(50); // Limit results to prevent overwhelming the UI
		
		// Convert _id to string for each customer
		const _customers = customers.map(customer => ({
			...customer.toObject(),
			_id: customer._id.toString()
		}));

		return NextResponse.json({ 
			success: true,
			customers: _customers 
		});
	} catch (error) {
		console.error('Error fetching customers:', error);
		return NextResponse.json({ 
			success: false,
			error: 'Failed to fetch customers' 
		}, { 
			status: 500 
		});
	}
}