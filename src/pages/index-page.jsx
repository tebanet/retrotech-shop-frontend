import { Main } from "../components/main";
import { ProductCard } from "../components/product-card";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/get-all-products";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Link } from "react-router-dom";

export function IndexPage() {
  const [products, setProducts] = useState([]);

  async function fetchAllProducts() {
    const result = await getAllProducts();
    if (result.status == "ok") {
      setProducts(result.data);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Main>
      <nav className="grid grid-cols-4 gap-4 md:flex md:justify-around">
        <Link
          className="flex flex-col items-center max-w-[100%]"
          to="/category/accessories"
        >
          <HeadphonesOutlinedIcon fontSize="large" /> Accesorios
        </Link>
        <Link
          className="flex flex-col items-center max-w-[100%]"
          to="/category/pc"
        >
          <ComputerOutlinedIcon fontSize="large" /> Ordenadores
        </Link>
        <Link
          className="flex flex-col items-center max-w-[100%]"
          to="/category/photography"
        >
          <CameraAltOutlinedIcon fontSize="large" /> Fotografia
        </Link>
        <Link
          className="flex flex-col items-center max-w-[100%]"
          to="/category/videogame"
        >
          <VideogameAssetOutlinedIcon fontSize="large" /> Videojuegos
        </Link>
      </nav>
      <section className="text-center p-7">
        <h1 className="text-3xl mb-2">
          <strong>Revive la nostalgia, </strong>redescubre la tecnología!
        </h1>
      </section>

      <section>
        <ul className="w-fit mx-auto grid grid-cols-1 xl:grid-cold-auto lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {products.map((product) => {
            return (
              <li key={product.product_id}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </section>
    </Main>
  );
}
