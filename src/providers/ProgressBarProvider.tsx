'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider() {
  return <ProgressBar height="4px" color="#fa934e" options={{ showSpinner: false }} shallowRouting />;
}
