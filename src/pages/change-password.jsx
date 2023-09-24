import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../components/main";
import { toast } from "sonner";
import { changePassword } from "../api/post-change-password";
import { changePasswordSchema, validateField } from "../utils/joi-validation";
import { ChangePasswordForm } from "../forms/change-password-form";
import { useForm } from "../hooks/use-form";

export function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const validationError = validateField(name, value, changePasswordSchema);
    setValidationErrors({
      ...validationErrors,
      [name]: validationError,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = changePasswordSchema.validate(formData, {
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

    if (formData.newPassword !== formData.repeatPassword) {
      setValidationErrors("Las contraseñas no coinciden.");
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
        handleChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={validationErrors}
      />
      {validationErrors && <p className="error">{validationErrors}</p>}
    </Main>
  );
}
