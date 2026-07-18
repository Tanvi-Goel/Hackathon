function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 transition py-3 font-semibold"
    >
      {text}
    </button>
  );
}

export default PrimaryButton;