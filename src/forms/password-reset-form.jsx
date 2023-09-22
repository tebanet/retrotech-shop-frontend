import { TextField, Button } from "@mui/material";

export const PasswordResetForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  validationErrors,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
  >
    <TextField
      label="Correo electrónico"
      type="email"
      name="email"
      autoComplete="email"
      value={formData.email}
      onChange={handleInputChange}
      required
      error={!!validationErrors}
      helperText={validationErrors}
    />
    <Button type="submit" variant="contained" color="primary">
      Enviar código de recuperación
    </Button>
  </form>
);
