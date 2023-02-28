import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  children: ReactNode;
}

function ModalGeneral({ children, isOpen, setIsOpen }: Props) {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box className=" max-w-none max-h-screen w-1/2 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute modal-box border-2 flex justify-center items-center ">
          <button
            onClick={() => closeModal()}
            className=" fixed z-90 top-0 right-0  w-10 h-10 flex justify-center items-center text-white text-xl btn btn-error"
          >
            X
          </button>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalGeneral;
