import { TextField, Button } from "@mui/material";

export const PasswordResetForm = ({
  setFormData,
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
      value={setFormData}
      onChange={handleInputChange}
      required
      error={Boolean(validationErrors)}
      helperText={validationErrors}
    />
    <Button type="submit" variant="contained" color="primary">
      Enviar código de recuperación
    </Button>
  </form>
);
