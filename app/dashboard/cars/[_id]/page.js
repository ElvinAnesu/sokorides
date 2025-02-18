import BreadCrumb from "@/app/components/dashboard/common/breadcrumb";
import EditProductForm from "@/app/components/dashboard/forms/editproductform";
import { getProductById } from "@/lib/actions";


export default async function ViewProduct(props) {
    const params = await props.params;

    const { _id } = params
    const product = await getProductById(_id)
    return (
		<div className="w-full h-full flex flex-col gap-4">
			<BreadCrumb title={"Product Details"} />
			<EditProductForm product={product} />
		</div>
	);
}
