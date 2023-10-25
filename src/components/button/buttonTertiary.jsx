const ButtonTertiary = ({ children, ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`w-full rounded-full font-semibold border border-primary-500 bg-white px-4 py-2 text-primary-500 hover:bg-primary-100 ${attributes.className}`}
    >
      {children}
    </button>
  );
};

export default ButtonTertiary;
