import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

export function Footer() {
	const [isFooterCollapsed, setIsFooterCollapsed] = useState(false);

	const handleFooterToggle = () => {
		setIsFooterCollapsed(!isFooterCollapsed);
	};

	return (
		<section className="fixed bottom-0 inset-x-0 hidden  lg:block xl:block">
			<section className="mx-auto">
				<a
					className="inline-block bg-[var(--secondary-color)] px-6 pb-2 pt-2.5 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] animate__animated animate__flash"
					data-te-collapse-init
					data-te-ripple-init
					data-te-ripple-color="light"
					href="#collapseWithScrollbar"
					role="button"
					aria-expanded={!isFooterCollapsed}
					aria-controls="collapseWithScrollbar"
					onClick={handleFooterToggle}
				>
					{isFooterCollapsed ? (
						<KeyboardArrowDownIcon />
					) : (
						<KeyboardArrowUpIcon />
					)}
				</a>
			</section>

			<div
				className={`max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out ${
					isFooterCollapsed ? "max-h-screen" : "max-h-0"
				}`}
			>
				<footer className="w-full text-gray-100 bg-[var(--secondary-color)]">
					<section className="container flex flex-col flex-wrap px-5 py-7 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
						<div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
							<Link to="/">
								<img
									src="/assets/logos/RT_Line_Logo.png"
									alt="logo de retrotech"
									className="w-60"
								/>
							</Link>
							<p className="mt-2 ml-1 text-sm text-gray-100">
								Revive la nostalgia, redescubre la tecnología!
							</p>
							<section className="mt-4">
								<span className="inline-flex justify-center mt-2">
									<a className=" first-letter:text-gray-300 cursor-pointer hover:text-white">
										<svg
											fill="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
										</svg>
									</a>
									<a className="ml-3 first-letter:text-gray-300 cursor-pointer hover:text-white">
										<svg
											fill="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
										</svg>
									</a>
									<a className="ml-3 first-letter:text-gray-300 cursor-pointer hover:text-white">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<rect
												width="20"
												height="20"
												x="2"
												y="2"
												rx="5"
												ry="5"
											></rect>
											<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
										</svg>
									</a>
									<a className="ml-3 first-letter:text-gray-300 cursor-pointer hover:text-white">
										<svg
											fill="currentColor"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24"
										>
											<path
												stroke="none"
												d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
											></path>
											<circle cx="4" cy="4" r="2" stroke="none"></circle>
										</svg>
									</a>
								</span>
							</section>
						</div>
						<div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
							<div className="w-full px-4 lg:w-1/4 md:w-1/2">
								<h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
									Sobre Retrotech
								</h2>
								<nav className="mb-10 list-none">
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											Quienes somos
										</a>
									</li>
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											Trabaja con nosotros
										</a>
									</li>
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											Blog
										</a>
									</li>
								</nav>
							</div>
							<div className="w-full px-4 lg:w-1/4 md:w-1/2">
								<h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
									AYUDA
								</h2>
								<nav className="mb-10 list-none">
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											¿Tienes dudas?
										</a>
									</li>
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											FAQ
										</a>
									</li>
								</nav>
							</div>
							<div className="w-full px-4 lg:w-1/4 md:w-1/2">
								<h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
									PLATAFORMA
								</h2>
								<nav className="mb-10 list-none">
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											Términos &amp; condiciones
										</a>
									</li>
								</nav>
							</div>
							<div className="w-full px-4 lg:w-1/4 md:w-1/2">
								<h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
									CONTACTO
								</h2>
								<nav className="mb-10 list-none">
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											Envíanos un mensaje{" "}
										</a>
									</li>
									<li className="mt-3">
										<a className="text-gray-300 cursor-pointer hover:text-white">
											Llámanos: +34 612 34 56 78
										</a>
									</li>
								</nav>
							</div>
						</div>
					</section>
					<section className="bg-gray-300 px-5 py-4 mx-auto">
						<p className="text-sm text-gray-700 xl:text-center">
							© 2023 Todos los derechos reservados.{" "}
						</p>
					</section>
				</footer>
			</div>
		</section>
	);
}
