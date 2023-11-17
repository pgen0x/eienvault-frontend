const Table = ({ children, ...attributes }) => {
  return (
    <div
      className={`w-full overflow-x-auto rounded-xl bg-white/60 p-3 text-gray-900 dark:bg-neutral-900 dark:text-white ${attributes.classContainer}`}
    >
      <table
        className={`w-full border-separate border-spacing-y-3 overflow-hidden whitespace-nowrap ${attributes.classTable}`}
      >
        {children}
      </table>
    </div>
  );
};

export const Td = ({ children, ...attributes }) => {
  return (
    <td
      className={`bg-white p-4 dark:bg-neutral-700 ${attributes.className}  ${
        attributes.firstElement ? 'rounded-l-xl' : ''
      }  ${attributes.lastElement ? 'rounded-r-xl' : ''}`}
    >
      {children}
    </td>
  );
};

export default Table;
