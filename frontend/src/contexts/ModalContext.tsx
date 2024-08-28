"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

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
        className={`fixed inset-0 blur-sm opacity-10 z-40 transition-opacity duration-300 ${
          children ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      />

      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-lg z-50 w-[550px] transform transition-transform duration-300 ${
          children ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 relative">
          <button className="absolute top-4 left-0 ms-10" onClick={closeModal}>
            Fechar
          </button>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </>
  );
};
