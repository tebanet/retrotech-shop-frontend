import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../components/main";
import { ProductForm } from "../forms/new-product-form";
import { postNewProduct } from "../api/post-new-product";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks/use-current-user";

export function NewProduct() {
	const [login, setLogin] = useState(false);
	const currentUser = useCurrentUser();

	useEffect(() => {
		const isLoggedIn = currentUser !== null;
		setLogin(isLoggedIn);
		if (!localStorage.getItem("userToken")) {
			navigate("/login");
		}
	}, [currentUser]);

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		product_title: "",
		product_image: "",
		category: "",
		price: "",
		description: "",
		status: "",
		place_of_sale: "",
		location: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleImage = (e) => {
		const file = e.target.files[0];
		setFormData({
			...formData,
			product_image: file,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const productCreated = await postNewProduct(
			formData.product_title,
			formData.product_image,
			formData.category,
			formData.price,
			formData.description,
			formData.place_of_sale,
			formData.location
		);

		if (productCreated) {
			navigate("/");
			toast.success("¡Producto creado con éxito!");
		}
	};

	return (
		<Main>
			<h1 className="text-4xl block self-center">¿Qué vas a vender?</h1>
			<ProductForm
				formData={formData}
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
				handleImage={handleImage}
			/>
		</Main>
	);
}
