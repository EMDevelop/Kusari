// import React from 'react';
import { useSnackbar } from 'notistack';

export default function useSnackbarPopup(message, variant) {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(message, {
    variant: variant,
  });
}
