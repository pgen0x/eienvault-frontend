export const SwitchTrenndingTopTimeMobile = ({ Range, setRange }) => {
  const handleRange = (event, target) => {
    setRange(target);
  };

  return (
    <div className="flex space-x-1 rounded-full bg-white px-1 py-2 dark:bg-neutral-900 dark:text-white">
      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-2.5 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          Range == '1h'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        1h
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          onChange={(event) => handleRange(event, '1h')}
        />
      </label>

      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-2.5 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          Range == '1d'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        1d
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          onChange={(event) => handleRange(event, '1d')}
        />
      </label>
      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-2.5 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          Range == '7d'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        7d
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          onChange={(event) => handleRange(event, '7d')}
        />
      </label>
    </div>
  );
};

export const SwitchTrenndingTopTime = ({ Range, setRange }) => {
  const handleRange = (event, target) => {
    setRange(target);
  };

  return (
    <div className="flex space-x-1 rounded-full bg-white px-1 dark:bg-neutral-900">
      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-3 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          Range == '1h'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        1h
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          onChange={(event) => handleRange(event, '1h')}
        />
      </label>
      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-3 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          Range == '1d'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        1d
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          onChange={(event) => handleRange(event, '1d')}
        />
      </label>
      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-3 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          Range == '7d'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        7d
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          onChange={(event) => handleRange(event, '7d')}
        />
      </label>
    </div>
  );
};
