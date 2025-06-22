import type { ChangeEvent } from "react";

import type {
  InitInputErrorState,
  InitInputValueState,
} from "../util/const/login-const";

import InputTitleBox from "../components/input/input-title";
import InputErrorMessage from "../components/input/input-message";
import ClickButton from "../components/button/button-click";

export default function LoginInputBox({
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
    <div className="flex flex-col gap-4">
      {/* 이메일 */}
      <div className="flex flex-col gap-1">
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
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            required
          />
        </div>
      </div>

      {/* 비밀번호 */}
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

        {/* 모달 전환 */}
        <div className="flex w-full items-end justify-end">
          <ClickButton onClick={onClickChangeForm} text="비밀번호 찾기" />
        </div>
      </div>
    </div>
  );
}
