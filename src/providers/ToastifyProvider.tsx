'use client';

import { ToastContainer, Flip } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function ToastifyProvider() {
  return <ToastContainer transition={Flip} position="top-right" autoClose={5000} closeOnClick pauseOnHover />;
}
