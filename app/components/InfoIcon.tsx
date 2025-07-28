import { Info } from "lucide-react";
import { useState } from "react";

export default function ({ infoText }: { infoText: string }) {
  const [showText, setShowText] = useState(false);

  return (
    <div
      className="mt-auto mb-auto mr-1 hover:bg-gray-400 hover:rounded-3xl transition-all duration-300"
      onTouchStart={() => setTimeout(() => setShowText((prev) => !prev), 300)}
      onMouseOver={() => setShowText((prev) => !prev)}
      onMouseOut={() => setShowText((prev) => !prev)}
      style={{ cursor: "pointer" }}
    >
      <Info className="h-5 w-5 " />
      {showText && (
        <p className="-translate-y-14 text-sm absolute bg-(--color-primary) p-2 rounded transition-all duration-300 whitespace-wrap">
          {infoText}
        </p>
      )}
    </div>
  );
}
