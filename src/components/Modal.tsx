import React from 'react';
import { GalleryData } from '../assets/types';
import { nextSlide, prevSlide } from '../utils';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import fallbackImage from '../assets/imageGuard.svg';

interface ModalProps {
  modalId: string;
  data: GalleryData;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  data,
  currentIndex,
  setCurrentIndex,
}) => {
  return (
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
                <button
                  onClick={() => prevSlide(data, currentIndex, setCurrentIndex)}
                  className="btn btn-circle"
                >
                  <FaArrowRight />
                </button>
                <button
                  onClick={() => nextSlide(data, currentIndex, setCurrentIndex)}
                  className="btn btn-circle"
                >
                  <FaArrowLeft />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
