const SubmitingText = () => {
  return Array.from("...").map((char, i) => (
    <span
      key={i}
      style={{ animationDelay: `${i * 0.1}s` }}
      className="inline-block animate-letter-bounce motion-reduce:animate-none font-bold font-mono"
    >
      {char}
    </span>
  ));
};

export default SubmitingText;
