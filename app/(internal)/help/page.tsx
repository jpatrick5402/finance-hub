const FAQList = [
  {
    Q: "How do I save my Data?",
    A: 'If you are not logged in, please use one of the available options displayed under the header. If you are logged in, click the "Save Info" button at the bottom of the page',
  },
];
export default function () {
  return (
    <div className="flex flex-col gap-2 container">
      <p className="text-2xl">FAQs</p>
      {FAQList.map((FAQ, index) => {
        return (
          <details key={index}>
            <summary>{FAQ.Q}</summary>
            <p>{FAQ.A}</p>
          </details>
        );
      })}
    </div>
  );
}
