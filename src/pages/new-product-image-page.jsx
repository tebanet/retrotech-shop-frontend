import { useEffect, useState } from "react";
import { Main } from "../components/main";
import { Button, Input } from "@mui/material";
import { API_HOST } from "../utils/constants";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks/use-current-user";
import { useNavigate } from "react-router-dom";

export function NewProductImage({ product_id }) {
  const [login, setLogin] = useState(false);
  const currentUser = useCurrentUser();

  console.log(product_id);
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
    const formData = new FormData();
    formData.append("product_image", selectedImage);
    formData.append("product_id", product_id);

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
        navigate("products/" + product_id);
      } else {
        toast.error("Ha fallado la subida de la imagen.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <section className="flex justify-center items-center mb-4">
        <span className="w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />

          {previewImage && (
            <img
              className="w-60 h-60 rounded-xl mx-auto"
              src={previewImage}
              alt="Image preview"
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Subir imagen
          </Button>
        </span>
      </section>
    </Main>
  );
}
