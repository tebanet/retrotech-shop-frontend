import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const newSearchParams = {};
        if (title) {
          newSearchParams.title = title;
        }
        if (category) {
          newSearchParams.category = category;
        }
        if (location) {
          newSearchParams.location = location;
        }
        if (min) {
          newSearchParams.min = min;
        }
        if (max) {
          newSearchParams.max = max;
        }
        setSearchParams(new URLSearchParams(newSearchParams));
      }}
      onReset={(e) => {
        e.preventDefault();
        const newSearchParams = {};
        setSearchParams(new URLSearchParams(newSearchParams));
        setTitle("");
        setCategory("");
        setLocation("");
        setMin("");
        setMax("");
      }}
      className="flex flex-col mx-auto gap-4 w-full lg:w-8/12 xl:w-7/12"
    >
      <TextField
        size="small"
        label="¿Qué buscas?"
        id="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <section className="flex gap-4">
        <FormControl fullWidth size="small">
          <InputLabel id="category">Categoría</InputLabel>
          <Select
            label="Categoría"
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <MenuItem value={"accessories"}>Accesorios</MenuItem>
            <MenuItem value={"photography"}>Fotografía</MenuItem>
            <MenuItem value={"pc"}>Ordenadores</MenuItem>
            <MenuItem value={"videogame"}>Videojuegos</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="location">¿Dónde lo buscas?</InputLabel>
          <Select
            label="¿Dónde lo buscas?"
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
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
            <MenuItem value={"Castilla - La Mancha"}>
              Castilla - La Mancha
            </MenuItem>
            <MenuItem value={"Catalunya"}>Catalunya</MenuItem>
            <MenuItem value={"Comunitat Valenciana"}>
              Comunitat Valenciana
            </MenuItem>
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
      </section>
      <section className="flex gap-4">
        <TextField
          size="small"
          label="Mínimo €"
          className="w-1/2"
          id="min"
          value={min}
          onChange={(e) => {
            setMin(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="Máximo €"
          className="w-1/2"
          id="max"
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
          }}
        />
      </section>
      <Button type="submit" variant="contained" size="small">
        ¡Buscar!
      </Button>
      <Button type="reset" variant="contained" size="small">
        Reset
      </Button>
    </form>
  );
}
