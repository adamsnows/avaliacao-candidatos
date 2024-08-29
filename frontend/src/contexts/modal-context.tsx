"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalContextType {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  modalContent: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {isOpen && <Modal>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

const Modal = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModal();

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: "0",
          backdropFilter: "blur(35px)",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          opacity: children ? "0.5" : "0",
          zIndex: 40,
          transition: "opacity 0.3s",
          pointerEvents: children ? "auto" : "none",
        }}
        onClick={closeModal}
      />

      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          children ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: 600, zIndex: 50 }}
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="py-4">{children}</div>
        </div>
      </div>

      <IoClose
        className="fixed top-4 z-50 cursor-pointer text-white text-xl"
        style={{ right: 610 }}
        onClick={closeModal}
      />
    </>
  );
};
