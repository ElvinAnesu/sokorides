import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
    // Add any necessary authentication here
    
    try {
        revalidatePath('/dashboard');
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ revalidated: false, message: err.message });
    }
} 