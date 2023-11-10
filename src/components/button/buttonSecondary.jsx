const ButtonSecondary = ({ children, ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`w-full py-2 px-4 rounded-full bg-transparent text-center font-bold text-primary-500 bg-white dark:bg-transparent hover:bg-primary-50 dark:text-white dark:hover:bg-neutral-700 disabled:bg-primary-200 disabled:dark:bg-neutral-200 disabled:dark:text-neutral-100 ${attributes.className}`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
