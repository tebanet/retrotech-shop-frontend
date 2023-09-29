import {
  Button,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export const ProductForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  handleImage,
  validationErrors,
}) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col mx-auto gap-4 w-full lg:w-8/12 xl:w-7/12"
  >
    <TextField
      label="¿Qué estas vendiendo?"
      name="product_title"
      value={formData.product_title}
      onChange={handleInputChange}
      error={Boolean(validationErrors.product_title)}
      helperText={validationErrors.product_title}
      required
    />
    <Input
      accept="image/*"
      label="¡Enseñanos que vendes!"
      type="file"
      name="product_image"
      id="product_image"
      onChange={handleImage}
      style={{ display: "none" }}
    />
    <label htmlFor="product_image">
      <Button variant="contained" component="span">
        ¡Sube la foto!
      </Button>
    </label>
    <FormControl required>
      <InputLabel id="category">Categoría</InputLabel>
      <Select
        name="category"
        value={formData.category}
        id="category"
        label="Categoría"
        onChange={handleInputChange}
      >
        <MenuItem value={"accessories"}>Accesorios</MenuItem>
        <MenuItem value={"photography"}>Fotografía</MenuItem>
        <MenuItem value={"pc"}>Ordenadores</MenuItem>
        <MenuItem value={"videogame"}>Videojuegos</MenuItem>
      </Select>
    </FormControl>
    <TextField
      label="Precio"
      type="number"
      name="price"
      required
      value={formData.price}
      onChange={handleInputChange}
      error={Boolean(validationErrors.price)}
      helperText={validationErrors.price}
    />
    <TextField
      id="outlined-multiline-static"
      multiline
      rows={3}
      label="¡Cuentanos algo más del producto!"
      type="text"
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      error={Boolean(validationErrors.description)}
      helperText={validationErrors.description}
    />
    <FormControl required>
      <InputLabel id="place_of_sale">¿Cómo lo vas a vender?</InputLabel>
      <Select
        name="place_of_sale"
        value={formData.place_of_sale}
        id="place_of_sale"
        label="¿Cómo lo vas a vender?"
        onChange={handleInputChange}
        required
      >
        <MenuItem value={"online"}>Lo voy a enviar</MenuItem>
        <MenuItem value={"delivery"}>Lo entrego en mano</MenuItem>
      </Select>
    </FormControl>
    <FormControl required>
      <InputLabel id="location">¿Dónde lo vendes?</InputLabel>
      <Select
        name="location"
        value={formData.location}
        id="location"
        label="¿Dónde lo vendes?"
        onChange={handleInputChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: "scroll",
            },
          },
        }}
      >
        <MenuItem value={"Andalucía"}>Andalucía</MenuItem>
        <MenuItem value={"Aragón"}>Aragón</MenuItem>
        <MenuItem value={"Asturias"}>Asturias</MenuItem>
        <MenuItem value={"Balears"}>Balears</MenuItem>
        <MenuItem value={"Canarias"}>Canarias</MenuItem>
        <MenuItem value={"Cantabria"}>Cantabria</MenuItem>
        <MenuItem value={"Castilla y León"}>Castilla y León</MenuItem>
        <MenuItem value={"Castilla - La Mancha"}>Castilla - La Mancha</MenuItem>
        <MenuItem value={"Catalunya"}>Catalunya</MenuItem>
        <MenuItem value={"Comunitat Valenciana"}>Comunitat Valenciana</MenuItem>
        <MenuItem value={"Extremadura"}>Extremadura</MenuItem>
        <MenuItem value={"Galicia"}>Galicia</MenuItem>
        <MenuItem value={"Madrid"}>Madrid</MenuItem>
        <MenuItem value={"Murcia"}>Murcia</MenuItem>
        <MenuItem value={"Navarra"}>Navarra</MenuItem>
        <MenuItem value={"País Vasco"}>País Vasco</MenuItem>
        <MenuItem value={"Rioja"}>Rioja</MenuItem>
        <MenuItem value={"Ceuta"}>Ceuta</MenuItem>
        <MenuItem value={"Melilla"}>Melilla</MenuItem>
      </Select>
    </FormControl>
    <Button type="submit" variant="contained" color="primary">
      ¡Publicar!
    </Button>
  </form>
);
