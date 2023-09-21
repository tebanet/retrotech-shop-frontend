import { useState } from "react";
import { Main } from "../components/main";
import { useNavigate } from "react-router-dom";
import { passwordResetSchema, validateField } from "../utils/joi-validation";
import { checkEmail, resetPassword } from "../api/post-password-reset-request";
import { PasswordResetForm } from "../forms/password-reset-form";
import { toast } from "sonner";

export function PasswordResetRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "" });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value, passwordResetSchema);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = passwordResetSchema.validate(formData, {
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

    const emailExists = await checkEmail(formData.email);
    if (emailExists) {
      try {
        const resetSuccessful = await resetPassword(formData.email);
        if (resetSuccessful) {
          toast.success(
            "El código de recuperación se ha enviado correctamente."
          );
          navigate("/users/change-password");
        } else {
          toast.error("Error al enviar el código de recuperación.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al enviar el código de recuperación.");
      }
    } else {
      toast.error(
        "El correo electrónico no está registrado en nuestra base de datos."
      );
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Recupera tu contraseña</h1>
      <PasswordResetForm
        formData={setFormData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={validationErrors}
      />
    </Main>
  );
}
