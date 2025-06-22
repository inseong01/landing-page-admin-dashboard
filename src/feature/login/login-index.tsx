import { useActionState, useEffect, useState, type MouseEvent } from "react";
import type { AuthTokenResponsePassword } from "@supabase/supabase-js";

import {
  isInputValueValid,
  isValidEmailType,
  sendPasswordResetEmail,
} from "./util/function/input-submit";
import { loginAction } from "./util/function/actions";
import {
  initInputErrorState,
  initInputValueState,
} from "./util/const/login-const";
import { useInputValue } from "./util/hook/use-input-value";

import FormTitle from "./components/form/form-title";
import SubmitButton from "./components/button/button-submit";

import LoginInputBox from "./feature/login";
import SearchPasswordBox from "./feature/search-password";

const initState = {} as AuthTokenResponsePassword;

export default function LoginUIDisplay() {
  const [state, formAction, isPending] = useActionState(loginAction, initState);
  const [needSearchPassword, setSearchPassword] = useState(false);
  const { inputText, setInputText, inputError, setInputError, onChangeInput } =
    useInputValue();
  const { error } = state;

  /* 폼 제출 */
  useEffect(() => {
    if (error === undefined) return;

    const isServerError = error?.status?.toString().startsWith("4");
    if (isServerError) {
      alert("사용자 정보를 찾을 수 없습니다.");
    }

    setInputText(initInputValueState);
    setInputError(initInputErrorState);
  }, [error]);

  /* 제출 버튼 */
  async function onClickSubmitButton(event: MouseEvent<HTMLButtonElement>) {
    // 비밀번호 재설정
    if (needSearchPassword) {
      event.preventDefault();

      // 이메일 형식 검증
      if (!isValidEmailType({ inputText, setInputError })) return;

      const email = inputText["email"];
      await sendPasswordResetEmail({ email });

      setInputText(initInputValueState);
      setInputError(initInputErrorState);

      return;
    }

    // 검증
    if (!isInputValueValid({ inputText, setInputError })) {
      return event.preventDefault();
    }
  }

  /* 형식 전환 */
  function onClickChangeForm() {
    setSearchPassword((prev) => !prev);
    setInputText(initInputValueState);
    setInputError(initInputErrorState);
  }

  return (
    <div className="fadeIn flex h-full w-full items-center justify-center">
      <form
        className="h-[390px] w-[450px] rounded-xl bg-[#F0F0F0] px-15 py-10 shadow-[0_0_20px_rgba(0,0,0,0.2)] max-lg:w-[400px] dark:bg-[#353535]"
        action={formAction}
      >
        <div className="flex h-full w-full flex-col justify-between gap-5">
          {/* 헤더 */}
          <div className="relative w-full text-center">
            <FormTitle
              text={!needSearchPassword ? "로그인" : "비밀번호 재설정"}
            />
          </div>

          {/* 입력창 */}
          <div className="flex flex-col gap-2">
            {!needSearchPassword ? (
              // 로그인 화면
              <LoginInputBox
                inputText={inputText}
                inputError={inputError}
                onChangeInput={onChangeInput}
                onClickChangeForm={onClickChangeForm}
              />
            ) : (
              // 비밀번호 찾기 화면
              <SearchPasswordBox
                inputText={inputText}
                inputError={inputError}
                onChangeInput={onChangeInput}
                onClickChangeForm={onClickChangeForm}
              />
            )}
          </div>

          {/* 제출버튼 */}
          <div className="flex flex-col gap-2">
            <SubmitButton
              disabled={isPending}
              onClick={onClickSubmitButton}
              text={!needSearchPassword ? "로그인" : "메일 전송"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
