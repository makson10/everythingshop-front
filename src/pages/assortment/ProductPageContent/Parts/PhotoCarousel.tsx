import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { ShowPhotoInFullscreen } from '@/components/ShowModalWindow/ShowModalWindow';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';

interface Props {
	photoIds: string[];
}

export default function PhotoCarousel({ photoIds }: Props) {
	const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

	const [photoURLs, setPhotoURLs] = useState<string[]>([]);
	const [isPhotosLoading, setIsPhotosLoading] = useState<boolean>(false);
	const [photoAccessKey, setPhotoAccessKey] = useState<string>('');

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

	const getPhotoURLs = useCallback(async () => {
		if (!photoAccessKey) return;

		setIsPhotosLoading(true);

		const imageUrlsPromises = photoIds.map(async (photoId) => {
			const imageObjectUrl = await fetchPhotoFileAndCreateObjectUrl(photoId);
			return imageObjectUrl;
		});

		const imageObjectURLs = await Promise.all(imageUrlsPromises).then(
			(res) => res
		);

		setPhotoURLs(imageObjectURLs);

		setIsPhotosLoading(false);
	}, [photoAccessKey]);

	const fetchPhotoFileAndCreateObjectUrl = async (photoId: string) => {
		const response = await fetch(
			`https://www.googleapis.com/drive/v3/files/${photoId}?alt=media`,
			{
				headers: {
					Authorization: 'Bearer ' + photoAccessKey,
				},
				cache: 'force-cache',
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch product photo');
		}

		const photoFile = await response.blob();
		const imageObjectUrl = URL.createObjectURL(photoFile);
		return imageObjectUrl;
	};

	useEffect(() => {
		const getPhotoAccessKey = async () => {
			const key = await axios
				.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/getPhotoAccessKey`
				)
				.then((res) => res.data.token);

			setPhotoAccessKey(key);
		};

		getPhotoAccessKey();
	}, []);

	useEffect(() => {
		getPhotoURLs();
	}, [getPhotoURLs]);

	return (
		<>
			{isOpenPhotosInFullscreen && (
				<ShowPhotoInFullscreen
					handleClose={handleCloseFullscreenMode}
					photoURLs={photoURLs}
					initialPhotoIndex={currentSlideIndex}
				/>
			)}

			{/* Image gallery */}
			<div className="min-h-[400px] max-h-[400px] flex flex-row justify-center mx-auto mt-6 max-w-2xl sm:px-6">
				<div className="w-4/5 overflow-hidden rounded-lg lg:block">
					{isPhotosLoading ? (
						<LoadingSpinner />
					) : (
						<Swiper
							onClick={handleOpenFullscreenMode}
							onSlideChange={changeCurrentSlideIndex}
							modules={[Navigation, Pagination, A11y, EffectCoverflow]}
							effect="coverflow"
							navigation
							pagination={{ clickable: true }}>
							{photoURLs.length === 0 ? (
								<SwiperSlide>
									<div className="flex flex-row justify-center">
										<Image
											className="w-1/2 h-1/2 object-contain object-center"
											src={`https://img.icons8.com/ios/300/${
												isDarkTheme ? 'ffffff' : '000000'
											}/stack-of-photos--v1.png`}
											alt="#"
											width={300}
											height={300}
											loading="lazy"
										/>
									</div>
								</SwiperSlide>
							) : (
								photoURLs.map((photoLink, index) => {
									return (
										<SwiperSlide key={index}>
											<Image
												className="h-[400px] w-full object-contain object-center"
												src={photoLink}
												alt="#"
												width={400}
												height={400}
												loading="lazy"
											/>
										</SwiperSlide>
									);
								})
							)}
						</Swiper>
					)}
				</div>
			</div>
		</>
	);
}
