import { Box, TextField, Button } from "@mui/material";

export const ModifyUserForm = ({
  formData,
  handleSubmit,
  handleInputChange,
  validationErrors,
}) => (
  <section className="flex justify-center">
    <span className="w-full lg:w-8/12 xl:w-7/12 bg-white rounded-lg shadow-md p-5">
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4">
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
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={3}
          label="Biografía"
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          helperText={validationErrors.bio ? "error" : ""}
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
    </span>
  </section>
);
