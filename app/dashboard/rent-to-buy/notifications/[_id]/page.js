import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";


export default function NotificationDetails() {
    return (
        <div className="flex flex-col gap-8">
            <BreadCrumb title={"Notifications"} />
            <div className="w-full p-4 rounded bg-white">
                <p>The nottification</p>
            </div>
        </div>
    )
}