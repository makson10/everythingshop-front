import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDarkTheme } from '@/hooks/useDarkTheme';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

interface Props {
	productPhotoIds: string[];
}

export default function PhotoCarousel({ productPhotoIds }: Props) {
	const isDarkTheme = useDarkTheme();
	const didComponentMount = useRef<boolean>(false);
	const [productPhotoURLs, setProductPhotoURLs] = useState<string[]>([]);
	const [photoAccessKey, setPhotoAccessKey] = useState<string>();

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
			productPhotoIds.map(async (photoId) => {
				const photoFile = await axios
					.get(
						`https://www.googleapis.com/drive/v3/files/${photoId}?alt=media`,
						{
							headers: {
								Authorization: 'Bearer ' + photoAccessKey,
							},
							responseType: 'blob',
						}
					)
					.then((res) => res.data);

				const imageObjectUrl = URL.createObjectURL(photoFile);
				setProductPhotoURLs((prevValue) => [...prevValue, imageObjectUrl]);
			});
		};

		getURLs();
	}, [photoAccessKey]);

	return (
		<>
			{/* Image gallery */}
			<div className="flex flex-row justify-center mx-auto mt-6 max-w-2xl sm:px-6">
				<div className="w-4/5 overflow-hidden rounded-lg lg:block">
					<Swiper
						modules={[Navigation, Pagination, A11y]}
						navigation
						pagination={{ clickable: true }}>
						{productPhotoURLs.length === 0 ? (
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
							productPhotoURLs.map((photoLink, index) => {
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