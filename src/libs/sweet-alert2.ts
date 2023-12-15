import Swal from 'sweetalert2';

export const sweetAlert = Swal.mixin({
  toast: true,
  showConfirmButton: true,
  confirmButtonText: 'Confirm',
  target: '#__next',
  customClass: {
    container: 'swal2-container-class',
    popup: 'swal2-popup-class',
    icon: 'swal2-icon-class',
    htmlContainer: 'swal2-html-class',
    actions: 'swal2-actions-class',
    confirmButton: 'swal2-confirm-button-class',
  },
});

export const sweetConfirm = Swal.mixin({
  toast: true,
  showConfirmButton: true,
  showCancelButton: true,
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  target: '#__next',
  showClass: {
    popup: 'animate__animated animate__fadeInDown faster',
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp faster',
  },
  customClass: {
    container: 'swal2-container-class',
    popup: 'swal2-popup-class',
    icon: 'swal2-icon-class',
    htmlContainer: 'swal2-html-class',
    actions: 'swal2-actions-class',
    confirmButton: 'swal2-confirm-button-class',
    cancelButton: 'swal2-cancel-button-class',
  },
});
