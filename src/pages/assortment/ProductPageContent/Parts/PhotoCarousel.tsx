import { useState } from 'react';
import Image from 'next/image';
import { ShowPhotoInFullscreen } from '@/components/ShowModalWindow/ShowModalWindow';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

interface Props {
	photoIds: string[];
}

export default function PhotoCarousel({ photoIds }: Props) {
	const [isOpenPhotosInFullscreen, setIsOpenPhotosInFullscreen] =
		useState<boolean>(false);
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

	const changeCurrentSlideIndex = (swiper: SwiperType) => {
		setCurrentSlideIndex(swiper.activeIndex);
	};

	const handleOpenFullscreenMode = () => {
		setIsOpenPhotosInFullscreen(true);
	};

	const handleCloseFullscreenMode = () => {
		setIsOpenPhotosInFullscreen(false);
	};

	return (
		<>
			{isOpenPhotosInFullscreen && (
				<ShowPhotoInFullscreen
					handleClose={handleCloseFullscreenMode}
					photoURLs={photoIds}
					initialPhotoIndex={currentSlideIndex}
				/>
			)}

			<div className="min-h-[400px] max-h-[400px] flex flex-row justify-center mx-auto mt-6 max-w-2xl sm:px-6">
				<div className="w-4/5 overflow-hidden rounded-lg lg:block">
					<Swiper
						onClick={handleOpenFullscreenMode}
						onSlideChange={changeCurrentSlideIndex}
						modules={[Navigation, Pagination, A11y, EffectCoverflow]}
						effect="coverflow"
						navigation
						pagination={{ clickable: true }}>
						{photoIds.map((imageUrl, index) => (
							<SwiperSlide key={index}>
								<Image
									className="h-[400px] w-full object-contain object-center"
									src={imageUrl}
									alt="#"
									width={400}
									height={400}
									loading="lazy"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
}
