import { TextField, Button } from "@mui/material";

export const ChangePasswordForm = ({
  formData,
  handleChange,
  handleSubmit,
  error,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 md:px-44 lg:px-60 xl:px-96"
  >
    <TextField
      label="Código de recuperación"
      name="token"
      type="text"
      value={formData.token}
      onChange={handleChange}
      required
    />
    <TextField
      label="Nueva Contraseña"
      name="newPassword"
      type="password"
      value={formData.newPassword}
      onChange={handleChange}
      required
    />
    <TextField
      label="Repetir Contraseña"
      name="repeatPassword"
      type="password"
      value={formData.repeatPassword}
      onChange={handleChange}
      required
    />
    <Button type="submit" variant="contained" color="primary">
      Cambiar Contraseña
    </Button>
  </form>
);
