import { useCurrentUser } from "../hooks/use-current-user";

export function ProfileButton() {
	const user = useCurrentUser();
	return (
		<button>
			<img
				className="max-w-[1.5rem]"
				src={
					user?.avatarURL ??
					"https://avatars0.githubusercontent.com/u/638974?s=460&v=4"
				}
				alt="pfp of user"
			/>
		</button>
	);
}
