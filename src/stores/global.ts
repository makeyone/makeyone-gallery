import { FormEventHandler } from 'react';

import { create } from 'zustand';

type GlobalStore = {
  editPostCurrentFormSubmit: FormEventHandler<HTMLFormElement> | undefined;
  // setEditPostCurrentFormSubmit: <T extends FieldValues>(submitFn: UseFormHandleSubmit<T, undefined>) => void;
  setEditPostCurrentFormSubmit: any;
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  editPostCurrentFormSubmit: undefined,
  setEditPostCurrentFormSubmit: (submitFn: any) =>
    set({
      editPostCurrentFormSubmit: submitFn,
    }),
}));

export default useGlobalStore;
