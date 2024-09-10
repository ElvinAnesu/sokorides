import DashBoardNav from "../components/navbars/dashboardnav";



export default function DashBoardLayout({children}){
    return(
        <div className="min-h-[500px] w-full flex flex-col md:grid md:grid-cols-5 p-4 gap-4">
            <div>
                <DashBoardNav />
            </div>
            <div className="md:col-span-4 flex flex-col">
                {children}
            </div>
        </div>
    )
}