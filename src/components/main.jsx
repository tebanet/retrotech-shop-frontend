export function Main({ children }) {
	return (
		<main className="overflow-scroll flex flex-col flex-grow my-16 p-2 gap-y-4 gap-x-4 justify-start text-left min-h-[calc(98vh-8rem)]">
			{children}
		</main>
	);
}
