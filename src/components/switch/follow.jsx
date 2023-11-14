const SwitchFollow = ({ followTab, setFollowTab }) => {
  const handleFollowTab = (event, target) => {
    setFollowTab(target);
  };

  return (
    <div className="flex w-fit gap-1 rounded-full bg-white px-1 py-1 dark:border-neutral-700 dark:bg-neutral-900">
      <div>
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          id="optionFollowers"
          onChange={(event) => handleFollowTab(event, 'followers')}
        />
        <label
          className={`cursor-pointer flex w-fit px-5 h-9 justify-center items-center rounded-full text-sm font-medium leading-5 ${followTab == "followers" ? 'text-white bg-primary-500 dark:bg-white dark:text-gray-900 shadow' : 'text-primary-500 hover:bg-primary-300 dark:text-white dark:hover:bg-neutral-500'}`}
          htmlFor="optionFollowers"
        >
          Followers
        </label>
      </div>
      <div>
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          id="optionFollowing"
          onChange={(event) => handleFollowTab(event, 'following')}
        />
        <label
          className={`cursor-pointer flex w-fit px-5 h-9 justify-center items-center rounded-full text-sm font-medium leading-5 ${followTab == "following" ? 'text-white bg-primary-500 dark:bg-white dark:text-gray-900 shadow' : 'text-primary-500 hover:bg-primary-300 dark:text-white dark:hover:bg-neutral-500'}`}
          htmlFor="optionFollowing"
        >
          Following
        </label>
      </div>
    </div>
  );
};

export default SwitchFollow;
