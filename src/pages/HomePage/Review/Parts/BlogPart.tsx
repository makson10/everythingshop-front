import Image from 'next/image';
import AuthorName from './AuthorName';
import Tagline from './Tagline';

export default function BlogPart() {
	return (
		<div className="flex flex-col gap-[30px]">
			<div className="flex flex-row gap-[20px] max-sm:flex-col">
				<Image
					className="w-[300px] h-[400px] rounded-[30px] max-sm:w-[250px] max-sm:h-[350px] max-sm:m-auto"
					src="https://i.pinimg.com/736x/b5/c7/64/b5c76413ca8dd6ee959c30fc370b93a0.jpg"
					alt="#"
					width={300}
					height={400}
				/>
				<div className="relative pt-1/5 flex flex-col max-sm:gap-6">
					<Tagline />
					<AuthorName />
				</div>
			</div>
		</div>
	);
}
