import { Link, useNavigate, useParams } from "react-router-dom";
import { Main } from "../components/main";
import { useEffect, useState } from "react";
import { getOrderInfo } from "../api/get-order-info";
import dayjs from "dayjs";
import { Button, Rating, TextField } from "@mui/material";
import { rateOrder } from "../api/post-order-rate";
import { toast } from "sonner";
import { API_HOST } from "../utils/constants";

export function RateOrder() {
  const navigate = useNavigate();
  let { username, orderId } = useParams();
  const [value, setValue] = useState(3);
  const [order, setOrder] = useState(null);

  async function fetchUserOrders() {
    const result = await getOrderInfo(username, orderId);

    if (result.status == "ok") {
      setOrder(result.orderInfo);
    }
    if (result.error && result.message.includes("otras personas")) {
      navigate("/404");
    }
  }

  const [formData, setFormData] = useState({
    comentaries: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rateSent = await rateOrder(
      username,
      orderId,
      value,
      formData.comentaries
    );

    if (rateSent) {
      navigate("/users/" + username + "/orders/rate");
      toast.success("¡Gracias por valorar el producto! 😊");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);
  return (
    <Main>
      <h1 className="text-3xl self-center">Envía tu valoración</h1>
      <section className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <span className="w-full md:w-1/3 bg-white grid place-items-center">
          <Link to={"/products/" + order?.product_id}>
            <img
              className="rounded-xl"
              src={API_HOST + "/uploads/" + order?.product_image}
              alt={"Foto de " + order?.product_tite}
            />
          </Link>
        </span>
        <span className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <span className="flex justify-between item-center">
            <p className="text-gray-500 font-medium hidden md:block">
              <Link to={"/users/" + order?.username}>{order?.username}</Link>
            </p>
            <span className="">
              {" "}
              <p>
                Puesto a la venta:{" "}
                {dayjs(order?.order_date).format("DD/MM/YYYY")}
                {" en "}
                {order?.location}
              </p>
            </span>
          </span>
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {order?.product_title}
          </h3>
          <p className="md:text-lg text-gray-500 text-base">
            {order?.description}
          </p>
          <p className="text-xl font-black text-gray-800">{order?.price} €</p>
          <form onSubmit={handleSubmit} className="flex flex-col mb-4 gap-4">
            <Rating
              defaultValue={3}
              name="valoracion"
              className="self-center"
              size="large"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              label="¿Quieres añadir algún comentario?"
              name="comentaries"
              value={formData.comentaries}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="outlined" color="secondary">
              ¡Manda tu valoración!
            </Button>
          </form>
        </span>
      </section>
    </Main>
  );
}
