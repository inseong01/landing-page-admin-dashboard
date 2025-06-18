export default function FormTitle({ text }: { text: string }) {
  return (
    <span className="cursor-default text-3xl font-bold text-black dark:text-white">
      {text}
    </span>
  );
}
