import {
  useActionState,
  useEffect,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import type { UserResponse } from "@supabase/supabase-js";

import { initInputErrorState, initInputValueState } from "./const/login-const";
import { updatePasswordAction } from "./function/actions";
import { isValiPasswordType } from "./function/input-submit";
import { useInputValue } from "./hook/use-input-value";

import FormTitle from "./components/form/form-title";
import InputErrorMessage from "./components/input/input-message";
import SubmitButton from "./components/button/button-submit";
import InputTitleBox from "./components/input/input-title";

const initState = {} as UserResponse;

export default function ResetPasswordDisplay() {
  const [state, formAction, isPending] = useActionState(
    updatePasswordAction,
    initState,
  );
  const { inputText, setInputText, inputError, setInputError, onChangeInput } =
    useInputValue();
  const navigate = useNavigate();

  const { error } = state;

  useEffect(() => {
    if (error === undefined) return;

    const isServerError = error?.status?.toString().startsWith("4");
    if (isServerError) {
      alert("예기치 않은 오류가 발생했습니다.");
    } else {
      alert("비밀번호가 변경되었습니다.");
      navigate("/");
    }

    setInputText(initInputValueState);
    setInputError(initInputErrorState);
  }, [error, navigate]);

  /* 제출 버튼 */
  async function onClickSubmitButton(e: MouseEvent<HTMLButtonElement>) {
    if (!isValiPasswordType({ inputText, setInputError })) {
      return e.preventDefault();
    }
  }

  return (
    <ResetDisplayLayout>
      <form action={formAction} className="flex w-full flex-col gap-6">
        {/* 제목 */}
        <div className="text-center">
          <FormTitle text="비밀번호 재설정" />
        </div>

        {/* 입력 */}
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            {/* 제목 */}
            <InputTitleBox title="비밀번호" tagName="password">
              <InputErrorMessage msg={inputError["password"].msg} />
            </InputTitleBox>

            {/* 입력 */}
            <input
              type="password"
              name="password"
              id="password"
              className={`w-full rounded-sm border-[1px] bg-white p-2 text-sm text-[#7D7D7D] focus:outline-[#5A80A5] dark:bg-[#202020] dark:text-[#9e9e9e] dark:focus:outline-0 ${inputError["password"].isError ? "border-red-500 dark:border-[#CD5656]" : "border-[#F0F0F0] dark:border-[#202020]"}`}
              placeholder="비밀번호를 입력해주세요"
              onChange={onChangeInput}
              value={inputText["password"]}
              required
              minLength={6}
            />
          </div>
        </div>

        {/* 제출 */}
        <div className="flex flex-col gap-2">
          <SubmitButton
            disabled={isPending}
            onClick={onClickSubmitButton}
            text={"변경하기"}
          />
        </div>
      </form>
    </ResetDisplayLayout>
  );
}

function ResetDisplayLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-[#FAFAFA] font-[Noto_Sans] dark:bg-[#353535]">
      <div className="flex w-full max-w-[350px] flex-col items-center justify-center gap-3">
        {children}
      </div>
    </div>
  );
}
