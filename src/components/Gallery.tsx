import React from 'react';
import { GalleryData } from '../assets/types';
import { autoFetch, closeModalOnOutsideClick, openModal } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import fallbackImage from '../assets/imageGuard.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from './Modal';

const fetchData = async (): Promise<GalleryData> => {
  const response = await autoFetch('/gallery.json');
  return response.data;
};

const Gallery: React.FC = () => {
  // Carousel State Management
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  // Activating The Fade Animation
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  // Fetching The Data
  const { data, isLoading, error } = useQuery<GalleryData, AxiosError>({
    queryKey: ['GalleryData'],
    queryFn: fetchData,
  });

  // Spinner When Loading
  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center p-2">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // A message In Case Of Error
  if (error)
    return (
      <div className="w-full flex justify-center items-center p-4">
        <h2 className="text-xl text-primary capitalize">
          Sorry, there was an error.
        </h2>
      </div>
    );

  // My Component
  return (
    <div className="w-full px-4 md:px-8 flex flex-col justify-center items-center md:flex-row md:justify-between gap-y-4 lg:gap-y-8 md:flex-wrap mt-8 pb-8 min-h-full">
      {data?.map((image, index) => {
        const modalId = `modal_${image.id}`;

        return (
          <div
            key={image.id}
            className="w-4/5 md:w-[47%] lg:w-[32%] cursor-pointer"
          >
            {/* Image with onClick handler to open the modal */}
            <img
              src={image.img}
              alt="image"
              onClick={() => {
                openModal(modalId, index, setCurrentIndex);
                closeModalOnOutsideClick(modalId);
              }}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.classList.add('h-full', 'object-cover');
              }}
              className="w-full aspect-[4/3]"
              data-aos="fade-down"
            />

            {/* Modal with carousel */}
            <Modal
              modalId={modalId}
              data={data}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
