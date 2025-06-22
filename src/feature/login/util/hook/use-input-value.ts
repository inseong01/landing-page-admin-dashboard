import { useState, type ChangeEvent } from "react";

import { initInputErrorState, initInputValueState } from "../const/login-const";

export function useInputValue() {
  const [inputText, setInputText] = useState(initInputValueState);
  const [inputError, setInputError] = useState(initInputErrorState);

  /* 입력 */
  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value.trim();

    setInputText((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setInputError((prev) => {
      return {
        ...prev,
        [name]: {
          isError: false,
          msg: "",
        },
      };
    });
  }

  return {
    inputText,
    setInputText,
    inputError,
    setInputError,
    onChangeInput,
  };
}
