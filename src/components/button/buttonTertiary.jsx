const ButtonTertiary = ({ children, ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`w-full rounded-full font-semibold border border-primary-500 bg-transparent px-4 py-2 text-primary-500 dark:border-white hover:text-primary-100 dark:text-white dark:hover:text-neutral-300 dark:disabled:text-neutral-400 ${attributes.className}`}
    >
      {children}
    </button>
  );
};

export default ButtonTertiary;
