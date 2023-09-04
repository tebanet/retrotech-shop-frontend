import { Avatar, Button } from "@mui/material";

export function ExampleTailwindCss() {
	return (
		<article className="flex flex-col items-center gap-16">
			<p className="text-red-500 bg-[var(--tertiary-color)] text-5xl border-y-orange-400 border-8">
				Esto es una prueba de CSS
			</p>

			<Button variant="contained"> Ejemplo de boton </Button>
			<Avatar
				sx={{ width: 96, height: 96 }}
				alt="ejemplo"
				src="https://i.pravatar.cc/150?img=29"
			/>
		</article>
	);
}
