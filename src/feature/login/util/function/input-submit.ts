import type { SetStateAction } from "jotai";

import { supabase } from "../../../../util/supabase/global";

import type {
  InitInputErrorState,
  InitInputValueState,
} from "../const/login-const";

type ValidationRule = {
  key: "email" | "password";
  validate: (value: string) => string | null;
};

const validationRules: ValidationRule[] = [
  {
    key: "email",
    validate: (value: string) => {
      if (!value) return "빈 칸을 입력하세요.";
      if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        return "올바른 이메일 형식이 아닙니다.";
      return null;
    },
  },
  {
    key: "password",
    validate: (value: string) => {
      if (!value) return "빈 칸을 입력하세요.";
      if (value.length < 6) return "6글자 이상이어야 합니다.";
      return null;
    },
  },
];

export function isInputValueValid({
  inputText,
  setInputError,
}: {
  inputText: InitInputValueState;
  setInputError: (value: SetStateAction<InitInputErrorState>) => void;
}) {
  const errorState: InitInputErrorState = {};

  validationRules.forEach(({ key, validate }) => {
    const value = inputText[key];
    const message = validate(value);

    errorState[key] = {
      isError: !!message,
      msg: message ?? "",
    };
  });

  setInputError(errorState);

  const hasNotError = Object.values(errorState).some(
    ({ isError }) => isError === false,
  );

  return hasNotError;
}

export function isValidEmailType({
  inputText,
  setInputError,
}: {
  inputText: InitInputValueState;
  setInputError: (value: SetStateAction<InitInputErrorState>) => void;
}) {
  const errorState: InitInputErrorState = {};
  const emailRule = [validationRules[0]];

  emailRule.forEach(({ key, validate }) => {
    const value = inputText[key];
    const message = validate(value);

    errorState[key] = {
      isError: !!message,
      msg: message ?? "",
    };
  });

  setInputError(errorState);

  const hasNotError = Object.values(errorState).some(
    ({ isError }) => isError === false,
  );

  return hasNotError;
}

export function isValiPasswordType({
  inputText,
  setInputError,
}: {
  inputText: InitInputValueState;
  setInputError: (value: SetStateAction<InitInputErrorState>) => void;
}) {
  const errorState: InitInputErrorState = {};
  const passwordRule = [validationRules[1]];

  passwordRule.forEach(({ key, validate }) => {
    const value = inputText[key];
    const message = validate(value);

    errorState[key] = {
      isError: !!message,
      msg: message ?? "",
    };
  });

  setInputError(errorState);

  const hasNotError = Object.values(errorState).some(
    ({ isError }) => isError === false,
  );

  return hasNotError;
}

/**
 * 배포할 때 redirectTo 호스트 변경
 */
export async function sendPasswordResetEmail({ email }: { email: string }) {
  const user_email = email;

  const res = await supabase.auth.resetPasswordForEmail(user_email, {
    redirectTo:
      "https://landing-page-admin-dashboard.vercel.app/reset/password",
  });

  if (res?.error?.code?.toString().startsWith("4")) {
    return alert("사용자 정보에 오류가 발생했습니다.");
  }

  return alert("메일을 확인해주세요.");
}
