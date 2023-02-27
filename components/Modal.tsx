import { ReactNode } from "react";

interface Props{
    isOpen: boolean;
    setIsOpen: (e:boolean) => void;
    children: ReactNode;
}


function Modal({children,isOpen,setIsOpen}:Props) {

    const closeModal = () => {
        setIsOpen(false)
    }

  return (
    <>
      <input type="checkbox" readOnly checked={isOpen} id="my-modal-4" className="modal-toggle" />
      <div onClick={() => closeModal()} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {children}
        </label>
      </div>
    </>
  );
}

export default Modal;
