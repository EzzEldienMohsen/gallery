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
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);
  const { data, isLoading, error } = useQuery<GalleryData, AxiosError>({
    queryKey: ['GalleryData'],
    queryFn: fetchData,
  });
  console.log(data, isLoading, error);
  if (isLoading)
    <div className="w-full flex justify-center items-center p-2">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>;
  if (error)
    <div className="w-full flex justify-center items-center p-2">
      <h2 className="text-xl text-primary capitalize">
        {' '}
        sorry there was an error ........
      </h2>
    </div>;
  return (
    <div className="w-full px-4 md:px-8 flex flex-col justify-center items-center md:flex-row md:justify-between gap-y-2 md:gap-x-2 lg:gap-x-4 md:flex-wrap my-8">
      {data?.map((image) => {
        return (
          <img
            key={image.id}
            src={image.img}
            alt="image"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
              e.currentTarget.classList.add('h-full', 'object-cover');
            }}
            className="w-4/5 md:w-[45%] lg:w-[32%]"
            data-aos="fade-down"
          />
        );
      })}
    </div>
  );
};

export default Gallery;
