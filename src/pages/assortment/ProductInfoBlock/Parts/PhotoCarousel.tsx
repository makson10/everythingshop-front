import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDarkTheme } from '@/hooks/useDarkTheme';
import { ShowLoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

interface Props {
	photoIds: string[];
}

export default function PhotoCarousel({ photoIds }: Props) {
	const isDarkTheme = useDarkTheme();
	const didComponentMount = useRef<boolean>(false);
	const [photoURLs, setPhotoURLs] = useState<string[]>([]);
	const [isPhotosLoading, setIsPhotosLoading] = useState<boolean>(false);
	const [photoAccessKey, setPhotoAccessKey] = useState<string>();

	const fetchPhotoFileAndCreateObjectUrl = async (photoId: string) => {
		const photoFile = await axios
			.get(`https://www.googleapis.com/drive/v3/files/${photoId}?alt=media`, {
				headers: {
					Authorization: 'Bearer ' + photoAccessKey,
				},
				responseType: 'blob',
			})
			.then((res) => res.data);

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
		if (!didComponentMount.current) {
			didComponentMount.current = true;
			return;
		}

		if (!photoAccessKey) return;

		const getURLs = async () => {
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
		};

		getURLs();
	}, [photoAccessKey]);

	if (isPhotosLoading) return <ShowLoadingScreen />;

	return (
		<>
			{/* Image gallery */}
			<div className="flex flex-row justify-center mx-auto mt-6 max-w-2xl sm:px-6">
				<div className="w-4/5 overflow-hidden rounded-lg lg:block">
					<Swiper
						modules={[Navigation, Pagination, A11y]}
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
											className="h-full w-full object-contain object-center"
											src={photoLink}
											alt="#"
											width={1000}
											height={1000}
											loading="lazy"
										/>
									</SwiperSlide>
								);
							})
						)}
					</Swiper>
				</div>
			</div>
		</>
	);
}
