import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Batch from "@/app/models/batch";


export async function GET(request,{params}) {
    const { _id } = params
    try {
        connectdb
        const batch = await Batch.findById(_id)
        if (!batch) {
            return NextResponse.json({
                success: false,
                message:"Batch not foud"
            })
        }
        return NextResponse.json({
            success: true,
            message: "Batch fetched successfully",
            batch
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            success: false,
            message:"Error while fetching batch"
        })
    }
}
export async function DELETE(request, { params }) {
	const { _id } = params;
	try {
		connectdb;
		const batch = await Batch.findByIdAndDelete(_id);
		if (!batch) {
			return NextResponse.json({
				success: false,
				message: "Batch not foud",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Batch deleted successfully",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			success: false,
			message: "Error while deleting batch",
		});
	}
}
export async function PUT(request, { params }) {
    const { _id } = params;
    const { batchName, shipments} = await request.json();
	try {
		connectdb;
        const batch = await Batch.findByIdAndUpdate(_id, {
					batchName,
					shipments,
				});
		if (!batch) {
			return NextResponse.json({
				success: false,
				message: "Batch not foud",
			});
		}
		return NextResponse.json({
			success: true,
			message: "Batch updated successfully",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			success: false,
			message: "Error while updating batch",
		});
	}
}
