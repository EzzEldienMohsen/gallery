import React from 'react';
import { GalleryData } from '../assets/types';
import { autoFetch } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import fallbackImage from '../assets/imageGuard.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const fetchData = async (): Promise<GalleryData> => {
  const response = await autoFetch('/gallery.json');
  return response.data;
};

const Gallery: React.FC = () => {
  // Activating The Fade Animation
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  //   Fetching The Data
  const { data, isLoading, error } = useQuery<GalleryData, AxiosError>({
    queryKey: ['GalleryData'],
    queryFn: fetchData,
  });

  // Function to handle modal opening
  const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
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

  //   Spinner When Loading
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
          sorry there was an error ........
        </h2>
      </div>
    );

  // My Component
  return (
    <div className="w-full px-4 md:px-8  flex flex-col justify-center items-center md:flex-row md:justify-between gap-y-4 lg:gap-y-8  md:flex-wrap mt-8 pb-8 min-h-full">
      {data?.map((image) => {
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
                openModal(modalId);
                closeModalOnOutsideClick(modalId);
              }}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.classList.add('h-full', 'object-cover');
              }}
              className="w-full"
              data-aos="fade-down"
            />

            {/* Modal for each image */}
            <dialog id={modalId} className="modal">
              <div className="modal-box w-2/5 aspect-square max-w-5xl">
                <img src={image.img} alt="Expanded view" className="w-full" />
              </div>
            </dialog>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
