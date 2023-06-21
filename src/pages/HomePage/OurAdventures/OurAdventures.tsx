import { cardData } from '@/assets/cardData';
import InfoCard from './InfoCard';
import Heading from './Heading';

export default function ChooseInfoSection() {
	return (
		<div className="flex flex-col gap-[3rem] max-sm:p-4 text-base">
			<Heading />
			<div className="flex flex-row justify-center gap-[60px] max-sm:flex-col">
				{cardData.map((el, index) => {
					return <InfoCard key={index} data={el} />;
				})}
			</div>
		</div>
	);
}
