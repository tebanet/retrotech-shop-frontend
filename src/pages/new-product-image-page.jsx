import { useEffect, useState } from "react";
import { Main } from "../components/main";
import { Button, Input } from "@mui/material";
import { API_HOST } from "../utils/constants";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks/use-current-user";
import { useNavigate } from "react-router-dom";
import { getLastUserProduct } from "../api/get-last-product-id";

export function NewProductImage() {
  const [login, setLogin] = useState(false);
  const currentUser = useCurrentUser();

  const id_seller = currentUser.id;

  useEffect(() => {
    const isLoggedIn = currentUser !== null;
    setLogin(isLoggedIn);
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  }, [currentUser]);

  const token = localStorage.userToken;

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileInputChange = (e) => {
    setSelectedImage(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleSubmit = async () => {
    const productData = await getLastUserProduct(id_seller);
    const product_id = productData.data.product_id;

    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("product_image", selectedImage);
    try {
      const response = await fetch(API_HOST + "/products/new-image", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("La imagen se ha subido correctamente.");
        navigate("/products/" + product_id);
      } else {
        toast.error("Ha fallado la subida de la imagen.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <section className="flex flex-col justify-center items-center mb-4">
        <span className="w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5 text-center">
          <Input
            type="file"
            accept="image/*"
            id="product_image"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
          <label htmlFor="product_image">
            <Button variant="contained" component="span">
              ¡Sube la foto!
            </Button>
          </label>

          {previewImage && (
            <img
              className="w-60 h-60 rounded-xl mx-auto my-4"
              src={previewImage}
              alt="Image preview"
            />
          )}

          {previewImage && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Subir imagen
            </Button>
          )}
        </span>
      </section>
    </Main>
  );
}
