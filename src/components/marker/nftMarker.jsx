const NftMarker = ({ children, ...attributes }) => {
  if (attributes.size == 'big') {
    return (
      <div
        {...attributes}
        className={`flex w-fit items-center justify-between gap-3 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 font-semibold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white ${attributes.className}`}
      >
        {children}
      </div>
    );
  }else{
    return (
      <div
        {...attributes}
        className={`flex w-fit items-center justify-between gap-3 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white ${attributes.className}`}
      >
        {children}
      </div>
    );
  }
};

export default NftMarker;
