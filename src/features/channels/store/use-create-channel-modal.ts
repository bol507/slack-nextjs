import {atom, useAtom} from "jotai";

const modalState = atom<boolean>(false);

export const useCreateChannelModal = () => {
  return useAtom(modalState);
};