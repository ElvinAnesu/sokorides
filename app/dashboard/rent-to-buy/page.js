import NotificationsCard from "@/app/components/cards/notifications";
import RentedCars from "@/app/components/cards/rentedcars";
import TransactionsCard from "@/app/components/cards/transactions";


const leasedCars = [
    {
        customerName: "Elvin Kakomo",
        model: "Honda Fit gke",
        currentPayments: 3000,
        outstandingBalance: 1500
    } ,
    {
        customerName: "Marshal Madziya",
        model: "Nissan NV350",
        currentPayments: 9000,
        outstandingBalance: 3500
    },
     {
        customerName: "Ariyela Maxwell",
        model: "Tpyota Prius",
        currentPayments: 4000,
        outstandingBalance: 3500
    }
]
export default function RentToBuy() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <RentedCars leasedCars={leasedCars} />
            <TransactionsCard /> 
            <NotificationsCard />
        </div>
    )
}