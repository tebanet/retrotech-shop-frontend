import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../components/main";
import { ProductForm } from "../forms/new-product-form";
import { postNewProduct } from "../api/post-new-product";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks/use-current-user";
import { newProductSchema, validateField } from "../utils/joi-validation";
import { NewProductImage } from "./new-product-image-page";

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
    category: "",
    price: "",
    description: "",
    status: "available",
    place_of_sale: "",
    location: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value, newProductSchema);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = newProductSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      return;
    }

    const productCreated = await postNewProduct(
      formData.product_title,
      formData.category,
      formData.price,
      formData.description,
      formData.status,
      formData.place_of_sale,
      formData.location
    );

    if (productCreated) {
      toast.success("¡Producto creado con éxito!");
      navigate("/products/new-image");
    } else {
      toast.error("No se pudo crear el producto");
      console.error(error);
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">¿Qué vas a vender?</h1>
      <ProductForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
      />
    </Main>
  );
}
