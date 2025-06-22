export type InitInputValueState = { [key: string]: string };
export type InitInputErrorState = {
  [key: string]: { isError: boolean; msg: string };
};

export const initInputValueState: InitInputValueState = {
  email: "",
  password: "",
};
export const initInputErrorState: InitInputErrorState = {
  email: { isError: false, msg: "" },
  password: { isError: false, msg: "" },
};
