export default function PhotoBlock() {
	return (
		<div className="flex items-center max-sm:hidden">
			<img
				className="relative w-[720px] h-[480px]"
				src="https://media.istockphoto.com/id/1224234335/photo/conceptual-photo-of-happy-girl-holds-shopping-packages-on-blue-background.jpg?s=612x612&w=0&k=20&c=5bgmMIx7xbO6e61nd7nDUKY44P2zLU2IsTDfZ6RyI4g="
			/>
			<p className="absolute top-[80%] font-sans text-[2rem] font-[700] w-fit px-[2rem] py-[0.7rem] bg-white">
				25+ Years of Experience
			</p>
		</div>
	);
}