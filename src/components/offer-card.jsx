import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OrderStatus } from "../utils/order-status";
import { patchOffer } from "../api/patch-offer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_HOST } from "../utils/constants";
import { Button } from "@mui/material";

export function OfferCard({ offer }) {
  const navigate = useNavigate();
  let { username } = useParams();
  const shortDate = dayjs(offer.order_date).format("DD/MM/YYYY");

  const [status, setStatus] = useState(false);
  function checkStatus() {
    if (offer?.order_status == "pending") {
      setStatus(true);
    }
  }

  function acceptOffer() {
    const status = "accepted";
    patchOffer(username, offer.order_id, status);
    toast.success("Pedido aceptado 🤑");
    navigate("/users/" + username);
  }

  function rejectOffer() {
    const status = "rejected";
    patchOffer(username, offer.order_id, status);
    toast.success("Pedido rechazado 😭");
    navigate("/users/" + username);
  }

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <>
      <section className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <span className="w-full md:w-1/3 bg-white grid place-items-center">
          <Link to={"/products/" + offer.product_id}>
            <img
              className="rounded-xl"
              src={API_HOST + "/uploads/" + offer.product_image}
              alt={"Foto de " + offer.product_tite}
            />
          </Link>
        </span>
        <span className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <span className="flex justify-between item-center">
            <p className="text-gray-500 font-medium hidden md:block">
              <Link to={"/users/" + offer.buyer}>{offer.buyer}</Link>
            </p>
            <span className="flex items-center">
              <p className="text-gray-600 font-bold text-sm ml-1">
                {offer.buyer.valoracion} {/*aqui necesito un cable con esto*/}
              </p>
            </span>
            <span className="">
              <OrderStatus order={offer} />
            </span>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
              {shortDate}
            </div>
          </span>
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {offer.product_title}
          </h3>
          <p className="md:text-lg text-gray-500 text-base">
            {offer.description}
          </p>
          <p className="text-xl font-black text-gray-800">{offer.price} €</p>
          {status ? (
            <section className="flex justify-around item-center gap-2">
              <Button
                onMouseDown={acceptOffer}
                variant="outlined"
                color="secondary"
              >
                Aceptar oferta
              </Button>
              <Button
                onMouseDown={rejectOffer}
                variant="outlined"
                color="secondary"
              >
                Rechazar oferta
              </Button>
            </section>
          ) : (
            ""
          )}
        </span>
      </section>
    </>
  );
}
