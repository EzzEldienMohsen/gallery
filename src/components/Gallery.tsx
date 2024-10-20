import React from 'react';
import { GalleryData } from '../assets/types';
import { autoFetch } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import fallbackImage from '../assets/imageGuard.svg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  // Function to handle modal opening
  const openModal = (id: string, index: number) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      setCurrentIndex(index);
      modal.showModal();
    }
  };

  // Function to close modal when clicking outside of the modal content
  const closeModalOnOutsideClick = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      modal.addEventListener('click', (event) => {
        const rect = modal.querySelector('.modal-box')?.getBoundingClientRect();
        if (
          rect &&
          (event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom)
        ) {
          modal.close();
        }
      });
    }
  };

  // Navigate to the previous image
  const prevSlide = () => {
    if (data) {
      const newIndex = (currentIndex - 1 + data.length) % data.length;
      setCurrentIndex(newIndex);
    }
  };

  // Navigate to the next image
  const nextSlide = () => {
    if (data) {
      const newIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(newIndex);
    }
  };

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
                openModal(modalId, index);
                closeModalOnOutsideClick(modalId);
              }}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.classList.add('h-full', 'object-cover');
              }}
              className="w-full"
              data-aos="fade-down"
            />

            {/* Modal with carousel */}
            <dialog id={modalId} className="modal">
              <div className="modal-box w-3/5 max-w-5xl relative">
                {data && (
                  <div className="carousel w-full">
                    <div className="carousel-item relative w-full">
                      <img
                        src={data[currentIndex]?.img || fallbackImage}
                        alt="Expanded view"
                        className="w-full"
                      />
                      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={prevSlide} className="btn btn-circle">
                          <FaArrowRight />
                        </button>
                        <button onClick={nextSlide} className="btn btn-circle">
                          <FaArrowLeft />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </dialog>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
