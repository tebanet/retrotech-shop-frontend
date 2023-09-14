export function Main({ children }) {
	return (
		<main
			className={
				"flex flex-col flex-grow mt-16 mb-24 p-2 gap-y-4 gap-x-4 justify-start text-left"
			}
		>
			{children}
		</main>
	);
}
