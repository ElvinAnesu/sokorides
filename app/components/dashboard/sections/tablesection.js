import RecentPayments from "../tables/recentpayments";
import RecentPurchases from "../tables/recentpurchases";

export default function TableSection() {
return (
        <div className="flex w-full flex-col md:grid md:grid-cols-2 gap-4">
            <RecentPurchases />
            <RecentPayments />
        </div>
    );
}