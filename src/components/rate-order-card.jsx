import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { OrderStatus } from "../utils/order-status";
import { Button } from "@mui/material";
import { API_HOST } from "../utils/constants";

export function RateOrderCard({ order }) {
  const shortDate = dayjs(order.order_date).format("DD/MM/YYYY");
  let { username } = useParams();

  return (
    <section className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
      <span className="w-full md:w-1/3 bg-white grid place-items-center">
        <Link to={"/products/" + order.id_product}>
          <img
            className="rounded-xl"
            src={API_HOST + "/uploads/" + order.product_image}
            alt={"Foto de " + order.product_tite}
          />
        </Link>
      </span>
      <span className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
        <span className="flex justify-between item-center">
          <p className="text-gray-500 font-medium hidden md:block">
            <Link to={"/users/" + order.username}>{order.username}</Link>
          </p>
          <span className="">
            <OrderStatus order={order} />
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
            {shortDate}
          </span>
        </span>
        <h3 className="font-black text-gray-800 md:text-3xl text-xl">
          {order.product_title}
        </h3>
        <p className="md:text-lg text-gray-500 text-base">
          {order.description}
        </p>
        <p className="text-xl font-black text-gray-800">{order.price} €</p>
        <section className="flex justify-around item-center gap-2">
          <Link to={"/users/" + username + "/orders/rate/" + order.order_id}>
            <Button variant="outlined" color="secondary">
              Enviar valoración
            </Button>
          </Link>
        </section>
      </span>
    </section>
  );
}
