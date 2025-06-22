import { atom } from "jotai";

export type CategoryAtom = "LOGIN" | "CHAT";
export const categoryAtom = atom<CategoryAtom>("LOGIN");

export const loginStateAtom = atom(false);

export const receivedMsgStateAtom = atom(false);
