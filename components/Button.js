import { cn } from "@/lib/utils";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Button({ className, ...props }) {
  return (
    <button
      type="submit"
      className={cn(
        "text-lg h-9 px-2 py-2 focus-visible:outline-none hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 absolute right-2 top-1/2 mr-1 -translate-y-1/2 transform"
      )}
      {...props}
    >
      <FaArrowCircleRight />
    </button>
  );
}
