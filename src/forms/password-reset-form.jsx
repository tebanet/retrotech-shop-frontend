import { TextField, Button } from "@mui/material";

export const PasswordResetForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  validationErrors,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col mx-auto gap-4 w-full lg:w-8/12 xl:w-7/12"
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
