export default function ({ infoText }: { infoText: string }) {
  return (
    <img
      src="/info.png"
      alt="info"
      className="h-4 w-4 mt-auto mb-auto mr-1 hover:bg-gray-400 hover:rounded-3xl transition-all duration-700"
      title={infoText}
    />
  );
}
