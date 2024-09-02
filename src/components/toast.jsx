import { useState } from 'react';
import { f7 } from 'framework7-react';

const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    if (!toast) {
      const newToast = f7.toast.create({
        text: message,
        closeTimeout: 2500,
        cssClass: 'toastStyle',
        position: 'top',
      });
      setToast(newToast);
      newToast.open();
    } else {
      toast.open();
    }
  };

  return showToast;
};

export default useToast;