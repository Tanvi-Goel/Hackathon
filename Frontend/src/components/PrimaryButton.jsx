function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 transition duration-200 py-3 font-semibold shadow-lg shadow-cyan-500/20"
    >
      {text}
    </button>
  );
}

export default PrimaryButton;