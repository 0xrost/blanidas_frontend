import { Circle } from "lucide-react";

const styles = {
  green: "fill-green-200 text-green-300",
  red: "fill-red-200 text-red-300",
  yellow: "fill-yellow-200 text-yellow-300",
  blue: "fill-blue-200 text-blue-300",
  purple: "fill-purple-200 text-purple-300",
  orange: "fill-orange-200 text-orange-300",
  gray: "fill-gray-200 text-gray-300",
  pink: "fill-pink-200 text-pink-300",
  brown: "fill-brown-200 text-brown-300",
  lime: "fill-lime-200 text-lime-300",
} as const;

type StyleKey = keyof typeof styles;

interface Props<T extends string | number | symbol> {
  status: T;
  statusToStyleMap: Record<T, StyleKey>;
}

const StatusIcon = <T extends string | number | symbol>({
  status,
  statusToStyleMap,
}: Props<T>) => {
  const styleClass = styles[statusToStyleMap[status] ?? "green"];

  return <Circle className={`w-4 h-4 shrink-0 mr-2 ${styleClass}`} />;
};

export default StatusIcon;