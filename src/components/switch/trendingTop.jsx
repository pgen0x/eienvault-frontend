export const SwitchTrenndingTopMobile = ({ TrendingTop, setTrendingTop }) => {
  const handleTrendingTop = (event, target) => {
    setTrendingTop(target);
  };

  return (
    <div className="flex justify-between rounded-full bg-white px-1 py-2 dark:bg-neutral-900 dark:text-white">
      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-2.5 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          TrendingTop === 'trending'
            ? 'bg-primary-500 text-white dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        Trending
        <input
          className="hidden"
          type="radio"
          name="trendingTopOptions"
          onChange={(event) => handleTrendingTop(event, 'trending')}
        />
      </label>
      <label
        className={`flex w-full cursor-pointer items-center justify-center rounded-full px-2.5 py-2 text-center text-sm font-bold leading-5 transition-colors duration-200 ${
          TrendingTop === 'top'
            ? 'bg-primary-500 text-white dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        Top
        <input
          className="hidden"
          type="radio"
          name="trendingTopOptions"
          onChange={(event) => handleTrendingTop(event, 'top')}
        />
      </label>
    </div>
  );
};

export const SwitchTrenndingTop = ({ TrendingTop, setTrendingTop }) => {
  const handleTrendingTop = (event, target) => {
    setTrendingTop(target);
  };

  return (
    <div className="flex w-full space-x-1 rounded-full bg-white px-1 dark:bg-neutral-900 dark:text-white">
      <label
        className={`flex w-full cursor-pointer items-center rounded-full px-2.5 py-2 text-sm font-bold leading-5 transition-colors duration-200 ${
          TrendingTop == 'trending'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        Trending
        <input
          className="hidden"
          type="radio"
          name="trendingTopOptions"
          onChange={(event) => handleTrendingTop(event, 'trending')}
        />
      </label>
      <label
        className={`flex w-full cursor-pointer items-center rounded-full px-2.5 py-2 text-sm font-bold leading-5 transition-colors duration-200 ${
          TrendingTop == 'top'
            ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
            : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
        }`}
      >
        Top
        <input
          className="hidden"
          type="radio"
          name="trendingTopOptions"
          onChange={(event) => handleTrendingTop(event, 'top')}
        />
      </label>
    </div>
  );
};
