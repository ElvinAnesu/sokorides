import CarDetailsForm from "@/app/components/clientarea/forms/cardetailsform";
import PurchaseDetailsForm from "@/app/components/clientarea/forms/purchasedetails";



export default function PurchaseDetails() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CarDetailsForm /> 
            <PurchaseDetailsForm />
        </div>
    )
}