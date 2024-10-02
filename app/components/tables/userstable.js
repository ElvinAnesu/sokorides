"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	EyeOpenIcon,
	TrashIcon,
	PlusIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
} from "@radix-ui/react-icons";

const PAGE_SIZE = 10;

export default function UsersTable() {
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const getUsers = async () => {
		setIsLoading(true);
		const response = await fetch(
			`/api/users?page=${page}&pageSize=${PAGE_SIZE}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await response.json();
		if (data.success) {
			setIsLoading(false);
			console.log(data.users);
			setUsers(data.users);
			setTotal(data.totalUsers);
		} else {
			setIsLoading(false);
		}
	};

	const deleteUser = async (_id) => {
		let confirmDelete = confirm("Delete this user");
		if (confirmDelete) {
			setIsLoading(true);
			const response = await fetch(`/api/users/${_id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			if (data.success) {
				setIsLoading(false);
				alert(data.message);
				window.location.reload();
			} else {
				setIsLoading(false);
				alert(data.message);
			}
		}
	};

		const handlePreviousPage = () => {
			if (page > 1) {
				setPage(page - 1);
			}
		};

		const handleNextPage = () => {
			if (page * PAGE_SIZE < total) {
				setPage(page + 1);
			}
	};
	
	useEffect(() => {
		getUsers();
	}, [page]);

	return (
		<div className="flex flex-col w-full h-full gap-2">
			<div className="flex w-full items-center justify-end">
				<button
					className="bg-purple-900 text-sm rounded p-2 flex items-center gap-1 text-white"
					onClick={() => router.push("/dashboard/users/createnew")}
				>
					<PlusIcon />
					Add New
				</button>
			</div>
			<div className="w-full h-full bg-gray-200 rounded p-4">
				{isLoading ? (
					<div className="w-full flex items-center justify-center md:col-span-4 min-h-96">
						<div className="flex flex-col items-center justify-center  w-full h-full">
							<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-900"></div>
						</div>
					</div>
				) : (
					<table className="w-full">
						<tbody>
							<tr className="px-2 bg-purple-900 text-white rounded-full">
								<td className="px-2 rounded-s-full text-sm font-semibold">#</td>
								<td className="px-2 text-sm font-semibold">Surname</td>
								<td className="text-sm font-semibold">Firstname</td>
								<td className="text-sm font-semibold hidden md:table-cell">
									Phonenumber
								</td>
								<td className="text-sm font-semibold">role</td>
								<td className="px-2 rounded-e-full text-sm font-semibold">
									Action
								</td>
							</tr>
							{users.map((user, index) => (
								<tr className="border-b border-gray-500" key={index}>
									<td className="px-2 rounded-s-full text-sm">
										{(page - 1) * PAGE_SIZE + index + 1}
									</td>
									<td className="px-2 rounded-s-full text-sm">
										{user.surname}
									</td>
									<td className="text-sm">{user.firstname}</td>
									<td className="text-sm hidden md:table-cell">
										{user.phonenumber}
									</td>
									<td className="text-sm">{user.role}</td>
									<td className="px-2 rounded-e-full flex items-center justify-around">
										<button
											onClick={() =>
												router.push(`/dashboard/users/${user._id}`)
											}
										>
											<EyeOpenIcon />
										</button>
										<button onClick={() => deleteUser(user._id)}>
											<TrashIcon />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				<div className="flex w-full items-full items-center justify-center gap-4 mt-4">
					<button
						className="border border-purple-900 rounded-full p-1 text-purple-900"
						onClick={handlePreviousPage}
						disabled={page === 1}
					>
						<ArrowLeftIcon />
					</button>
					<span className="text-sm">page{page}</span>
					<button
						className="border border-purple-900 rounded-full p-1 text-purple-900"
						onClick={handleNextPage}
						disabled={page * PAGE_SIZE >= total}
					>
						<ArrowRightIcon />
					</button>
				</div>
			</div>
		</div>
	);
}
