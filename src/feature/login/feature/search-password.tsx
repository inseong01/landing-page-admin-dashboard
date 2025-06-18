import type { ChangeEvent } from "react";

import type {
  InitInputErrorState,
  InitInputValueState,
} from "../const/login-const";

import InputTitleBox from "../components/input/input-title";
import InputErrorMessage from "../components/input/input-message";
import ClickButton from "../components/button/button-click";

export default function SearchPasswordBox({
  inputText,
  inputError,
  onChangeInput,
  onClickChangeForm,
}: {
  inputText: InitInputValueState;
  inputError: InitInputErrorState;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickChangeForm: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        {/* 제목 */}
        <InputTitleBox title="이메일" tagName="email">
          <InputErrorMessage msg={inputError["email"].msg} />
        </InputTitleBox>

        {/* 입력 */}
        <input
          type="text"
          name="email"
          id="email"
          className={`w-full rounded-sm border-[1px] bg-white p-2 text-sm text-[#7D7D7D] focus:outline-[#5A80A5] dark:bg-[#202020] dark:text-[#9e9e9e] dark:focus:outline-0 ${inputError["email"].isError ? "border-red-500 dark:border-[#CD5656]" : "border-[#F0F0F0] dark:border-[#202020]"}`}
          placeholder="이메일을 입력해주세요"
          onChange={onChangeInput}
          value={inputText["email"]}
          required
        />

        {/* 모달 전환 */}
        <div className="flex items-end justify-end text-xs">
          <ClickButton onClick={onClickChangeForm} text="로그인 하기" />
        </div>
      </div>
    </div>
  );
}
