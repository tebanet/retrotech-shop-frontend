import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../components/main";
import { toast } from "sonner";
import { changePassword } from "../api/post-change-password";
import { changePasswordSchema } from "../utils/joi-validation";
import { ChangePasswordForm } from "../forms/change-password-form";
import { useForm } from "../hooks/use-form";

export function ChangePassword() {
  const navigate = useNavigate();
  const { formData, handleChange } = useForm({
    token: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error: validationError } = changePasswordSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationError) {
      setError(
        validationError.details.map((detail) => detail.message).join(", ")
      );
      return;
    }

    if (formData.newPassword !== formData.repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const response = await changePassword(formData);
    if (response.ok) {
      toast.success("La contraseña se ha cambiado con éxito");
      navigate("/login");
    } else {
      toast.error("Error al cambiar la contraseña");
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">
        Establece una nueva contraseña
      </h1>
      <ChangePasswordForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
      />
      {error && <p className="error">{error}</p>}
    </Main>
  );
}
