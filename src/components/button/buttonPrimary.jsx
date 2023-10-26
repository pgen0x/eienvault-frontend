const ButtonPrimary = ({ children, ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-200 text-white disabled:hover:bg-primary-200 ${attributes.className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
