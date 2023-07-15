import { useEffect } from 'react';
import Image from 'next/image';
import { FullscreenPhotoCarouselProps } from '@/types/modalWindowTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, EffectCoverflow } from 'swiper';

export default function FullscreenPhotoCarousel({
	handleClose,
	photoURLs,
	initialPhotoIndex,
}: FullscreenPhotoCarouselProps) {
	useEffect(() => {
		document.body.classList.add('overflow-hidden');

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, []);

	useEffect(() => {
		const handleClickEsc = (event: any) => {
			if (event.key === 'Escape') handleClose();
		};

		document.addEventListener('keydown', handleClickEsc);

		return () => {
			document.removeEventListener('keydown', handleClickEsc);
		};
	}, []);

	return (
		<div className="w-screen h-screen overflow-hidden bg-gray-800 bg-opacity-80">
			<button
				className="absolute right-[45px] top-[0.7rem] text-[2.5rem] h-fit transition-all ease-linear duration-100 hover:scale-[1.2] hover:text-[darkblue] dark:hover:text-[orange]"
				onClick={handleClose}>
				&times;
			</button>
			<div className="h-full flex justify-center items-center overflow-hidden">
				<Swiper
					className={photoURLs.length === 1 ? '' : 'scale-[85%]'}
					modules={[Navigation, Pagination, A11y, EffectCoverflow]}
					effect="coverflow"
					navigation
					pagination={{ clickable: true }}
					initialSlide={initialPhotoIndex}>
					{photoURLs.map((photoLink, index) => (
						<SwiperSlide key={index}>
							<Image
								className="max-h-screen w-full object-contain object-center"
								src={photoLink}
								alt="#"
								width={1000}
								height={1000}
								loading="lazy"
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
