import axios, { AxiosInstance } from 'axios';
import React from 'react';
import { GalleryData } from '../assets/types';
// Handling Fetching Data Function
const url: string = '/api';
export const autoFetch: AxiosInstance = axios.create({
  baseURL: url,
});

// Function to handle modal opening
export const openModal = (
  id: string,
  index: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal) {
    setCurrentIndex(index);
    modal.showModal();
  }
};

// Function to close modal when clicking outside of the modal content
export const closeModalOnOutsideClick = (id: string) => {
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
export const prevSlide = (
  data: GalleryData,
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  if (data) {
    const newIndex = (currentIndex - 1 + data.length) % data.length;
    setCurrentIndex(newIndex);
  }
};

// Navigate to the next image
export const nextSlide = (
  data: GalleryData,
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  if (data) {
    const newIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(newIndex);
  }
};
