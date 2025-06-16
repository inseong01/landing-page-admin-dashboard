import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export default function CollapsibleList({
  children,
}: {
  children: (
    isExpanded: boolean,
    setIsExpanded: Dispatch<SetStateAction<boolean>>,
  ) => ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return <li>{children(isExpanded, setIsExpanded)}</li>;
}
