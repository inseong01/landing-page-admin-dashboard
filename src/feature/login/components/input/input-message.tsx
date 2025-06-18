export default function InputErrorMessage({ msg }: { msg: string }) {
  return (
    <span className="cursor-default text-left text-xs text-red-500 dark:text-[#CD5656]">
      {msg}
    </span>
  );
}
