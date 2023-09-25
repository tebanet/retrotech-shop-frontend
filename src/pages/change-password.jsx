import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Main } from "../components/main";
import { toast } from "sonner";
import { changePassword } from "../api/post-change-password";
import { changePasswordSchema, validateField } from "../utils/joi-validation";
import { ChangePasswordForm } from "../forms/change-password-form";

export function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [comparisonError, setComparisonError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const codeFromQuery = searchParams.get("token");

    if (codeFromQuery) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        token: codeFromQuery,
      }));
    }
  }, [location.search]);

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

    if (formData.newPassword !== formData.repeatPassword) {
      setComparisonError("Por favor, revisa que las contraseñas sean iguales.");
      return;
    }

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

    const response = await changePassword(formData);
    if (response.ok === true) {
      toast.success("La contraseña se ha cambiado con éxito.");
      navigate("/login");
    } else {
      toast.error("Error al cambiar la contraseña.");
    }
  };

  return (
    <Main>
      <h1 className="text-4xl block self-center">Cambia tu contraseña</h1>
      <ChangePasswordForm
        formData={formData}
        handleInputChange={handleInputChange}
        validationErrors={validationErrors}
        handleSubmit={handleSubmit}
        comparisonError={comparisonError}
      />
    </Main>
  );
}
