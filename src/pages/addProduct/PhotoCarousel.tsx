import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useDarkTheme } from '@/hooks/useDarkTheme';
import DeletePhotoButton from './DeletePhotoButton';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

interface Props {
	photoFiles: File[];
	handleAddFile: (e: ChangeEvent<HTMLInputElement>) => void;
	handleDeleteFile: (index: number) => void;
}

export default function PhotoCarousel({
	photoFiles,
	handleAddFile,
	handleDeleteFile,
}: Props) {
	const isDarkTheme = useDarkTheme();
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

	const handleSlideChange = (event: SwiperType) => {
		setCurrentPhotoIndex(event.activeIndex);
	};

	const deletePhoto = () => {
		handleDeleteFile(currentPhotoIndex);
	};

	return (
		<div className="max-h-[300px]">
			<Swiper
				onSlideChange={handleSlideChange}
				modules={[Navigation, Pagination, A11y, EffectCoverflow]}
				effect="coverflow"
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
							<DeletePhotoButton deletePhoto={deletePhoto} />
						</SwiperSlide>
					);
				})}
				{photoFiles.length < 5 && (
					<SwiperSlide>
						<label className="relative cursor-pointer px-[12px] py-[6px] flex justify-center gap-[20px]">
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
								onChange={handleAddFile}
							/>
						</label>
					</SwiperSlide>
				)}
			</Swiper>
		</div>
	);
}
