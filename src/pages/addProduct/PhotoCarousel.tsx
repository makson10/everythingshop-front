import { useDarkTheme } from '@/hooks/useDarkTheme';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
	photoFiles: File[];
	handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PhotoCarousel({ photoFiles, handleFileInput }: Props) {
	const isDarkTheme = useDarkTheme();

	return (
		<div className="max-h-[300px]">
			<Swiper
				modules={[Navigation, Pagination, A11y]}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}>
				{photoFiles.map((file, index) => {
					const imageObjectUrl = URL.createObjectURL(file);
					return (
						<SwiperSlide key={index}>
							<Image
								className="min-h-[100px] max-h-[300px] m-auto object-contain"
								width={300}
								height={300}
								src={imageObjectUrl}
								alt="#"
							/>
						</SwiperSlide>
					);
				})}
				{photoFiles.length < 5 && (
					<SwiperSlide>
						<label className="cursor-pointer px-[12px] py-[6px] flex justify-center gap-[20px]">
							<Image
								className="w-[50px] h-[50px]"
								src={`https://img.icons8.com/ios/50/${
									isDarkTheme ? 'ffffff' : '000000'
								}/upload-to-cloud--v1.png`}
								alt="#"
								width={100}
								height={100}
							/>
							<p className="flex items-center">Choose your photo</p>
							<input
								className="hidden"
								type="file"
								multiple
								name="photoFiles"
								accept="image/*"
								onChange={handleFileInput}
							/>
						</label>
					</SwiperSlide>
				)}
			</Swiper>
		</div>
	);
}
