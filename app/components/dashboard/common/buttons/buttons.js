"use client"
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCustomer, deleteInvoice, deletePayment, deleteProduct, deletePurchase, deleteShipment, deleteUser } from '@/lib/actions';
import { ownerAction } from '@/lib/utils';
import { deleteLease } from '@/lib/server-actions/lease';

const deleteConfirmed= () => {
    if (ownerAction()) {
        const confirmDelete = confirm("Are you sure you want to delete this item?")
        if (confirmDelete) {
            return true
        }
    } else {
        alert("user not authorized to perform ths action")
    } 
    return false
}
const deleteItem = async (_id, item) => {
    if (deleteConfirmed()) {
        switch (item) {
					case "invoice":
						await deleteInvoice(_id);
						break;
					case "payment":
						await deletePayment(_id);
						break;
					case "purchase":
						await deletePurchase(_id);
					case "user":
						await deleteUser(_id);
						break;
					case "customer":
						await deleteCustomer(_id);
						break;
					case "shipment":
						await deleteShipment(_id);
						break;
					case "product":
						await deleteProduct(_id);
						break;
					case "lease":
						await deleteLease(_id)
						break;
				}
    }
}
export function DeleteBtn({ _id, item }) { 
    return (
        <button className="rounded-md border p-2 hover:bg-gray-100"
            type='button'
            onClick={()=> deleteItem(_id, item)}
        >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-4" />
        </button>
    )
} 
export function ViewBtn({url}) { 
        return (
		<Link
			href={url}
			className="rounded-md border p-2 hover:bg-gray-100"
		>
			<EyeIcon className="w-5" />
		</Link>
	);
}