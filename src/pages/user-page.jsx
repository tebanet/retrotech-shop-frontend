import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { getUserData } from "../api/get-user-data";
import { Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ProductCard } from "../components/product-card";
import { getUserProducts } from "../api/get-all-products-by-username";

export function UserPage() {
  const navigate = useNavigate();

  let { username } = useParams();
  const [userData, setUserData] = useState([]);
  async function fetchUserData() {
    const result = await getUserData(username);
    if (result.status == "ok") {
      setUserData(result.data);
    } else {
      navigate("/404");
    }
  }
  const shortDate = dayjs(userData.createdAt).format("DD/MM/YYYY");

  const [products, setProducts] = useState([]);
  async function fetchUserProducts() {
    const result = await getUserProducts(username);
    if (result.status == "ok") {
      setProducts(result.data);
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchUserProducts();
  }, []);

  return (
    <Main>
      <section className="flex">
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={userData.profile_pic}
          alt={"Foto de " + userData.username}
        />
        <section className="flex flex-col pl-4">
          <p>{userData.username}</p>
          <p>{userData.media_valoracion} Valoracion</p>
          <p>Usuario creado: {shortDate}</p>
        </section>
      </section>
      <h2 className="text-2xl">Productos</h2>
      <ul className="flex flex-row flex-wrap justify-around gap-8 md:flex-nowrap md:overflow-x-scroll">
        {products.map((product) => {
          return (
            <li key={product.product_id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </Main>
  );
}
