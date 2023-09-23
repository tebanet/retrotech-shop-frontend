import { Link } from "react-router-dom";
import AccountMenu from "./account-menu";

export function Header() {
	return (
		<>
			<header className="flex flex-row items-center justify-between bg-[var(--secondary-color)] border-b border-b-black min-h-[4rem] px-4 gap-4 fixed right-0 left-0 lg:hidden">
				<Link to="/">
					<img
						src="/assets/logos/RT_Square_Logo.png"
						alt="logo de retrotech"
						className="w-12"
					/>
				</Link>
			</header>
			<header className="hidden lg:flex flex-row items-center justify-between bg-[var(--secondary-color)] border-b border-b-black min-h-[4rem] px-4 gap-4 fixed right-0 left-0">
				<Link to="/">
					<img
						src="/assets/logos/RT_Line_Logo.png"
						alt="logo de retrotech"
						className="w-60"
					/>
				</Link>
				<AccountMenu />
			</header>
		</>
	);
}
