const ButtonLink = ({ children, ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`w-fit font-bold text-primary-500 dark:text-white ${attributes.className}`}
    >
      {children}
    </button>
  );
};

export default ButtonLink;
