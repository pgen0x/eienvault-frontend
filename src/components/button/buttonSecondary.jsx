const ButtonSecondary = ({ children, ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`${attributes.className} w-full py-2 rounded-full bg-transparent text-center font-bold text-primary-500 hover:bg-primary-50 dark:text-white dark:hover:bg-zinc-500`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
