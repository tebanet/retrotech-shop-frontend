import { TextField, TextareaAutosize, Input, Button } from "@mui/material";

export const ModifyUserForm = ({
  formData,
  handleSubmit,
  handleInputChange,
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
      error={Boolean(validationErrors.email)}
      helperText={validationErrors.email}
    />
    <TextField
      label="Nombre de usuario"
      type="text"
      name="username"
      autoComplete="username"
      value={formData.username}
      onChange={handleInputChange}
      error={Boolean(validationErrors.username)}
      helperText={validationErrors.username}
    />
    <TextareaAutosize
      minRows={3}
      placeholder="Biografía"
      type="text"
      name="bio"
      value={formData.bio}
      onChange={handleInputChange}
      className={validationErrors.bio ? "error" : ""}
    />
    <TextField
      label="Dirección"
      type="text"
      name="address"
      autoComplete="address"
      value={formData.address}
      onChange={handleInputChange}
      error={Boolean(validationErrors.address)}
      helperText={validationErrors.address}
    />
    <TextField
      label="Contraseña"
      type="password"
      name="password"
      autoComplete="current-password"
      value={formData.password}
      onChange={handleInputChange}
      error={Boolean(validationErrors.password)}
      helperText={validationErrors.password}
    />
    <Button id="button" type="submit" variant="contained" color="primary">
      Actualizar usuario
    </Button>
  </form>
);
