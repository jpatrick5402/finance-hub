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
      <img src="/info.png" alt="info" className="h-4 w-4 " />
      {showText && (
        <p className="text-sm absolute bg-(--color-primary) p-2 rounded mt-3 transition-all duration-300">
          {infoText}
        </p>
      )}
    </div>
  );
}
