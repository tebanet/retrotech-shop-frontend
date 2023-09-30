import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../components/main";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks/use-current-user";
import { updateProductSchema, validateField } from "../utils/joi-validation";
import { UpdateProductForm } from "../forms/update-product-form";
import { updateProduct } from "../api/update-product";

export function ModifyProduct() {
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
    place_of_sale: "",
    location: "",
  });

  const { product_id } = useParams();

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value, updateProductSchema);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = updateProductSchema.validate(formData, {
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

    try {
      const productCreated = await updateProduct(
        formData.product_title,
        formData.category,
        formData.price,
        formData.description,
        formData.place_of_sale,
        formData.location,
        product_id
      );

      if (productCreated) {
        toast.success("¡Producto actualizado con éxito!");
        navigate(`/products/${product_id}`);
      } else {
        toast.error("No se pudo actualizar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Modifica tu producto</h1>
      <UpdateProductForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
      />
    </Main>
  );
}
