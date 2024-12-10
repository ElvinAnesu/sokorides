import RentedCars from "@/app/components/cards/rentedcars";

export default function RentToBuy() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3">
            <RentedCars />
        </div>
    )
}