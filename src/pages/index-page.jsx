import { Container } from "@mui/material";
import { Main } from "../components/main";
import { ProductCard } from "../components/product-card";
import fake from "../data/fakeproducts.json";
import { useAuth } from "../contexts/auth-context";

export function IndexPage() {
  const auth = useAuth();

  return (
    <Main>
      {auth.isAuthenticated() && <h1>Hola, {auth.user.username}!</h1>}
      <h2 className="text-4xl block">¡Productos nuevos!</h2>
      <Container maxWidth="sm">
        <ul className="flex flex-row justify-start gap-4 overflow-x-scroll min-h-[21.5rem]">
          {fake.map((fake) => {
            return (
              <li>
                <ProductCard key={fake.id} product={fake} />
              </li>
            );
          })}
        </ul>
      </Container>
    </Main>
  );
}
