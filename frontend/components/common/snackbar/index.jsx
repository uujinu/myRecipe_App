import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Button } from "@material-ui/core";

export function SnackBar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose,
  };
}

export default function InfoBox({ open, onClose, message, id }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={3000}
      open={open}
      onClose={onClose}
      message={message}
      key={id}
      action={
        <Button color="inherit" size="small" onClick={onClose}>
          X
        </Button>
      }
    />
  );
}
