import { faGrip, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SwitchGrid = ({ gridList, setGridList }) => {
  const handleGridList = (event, target) => {
    setGridList(target);
  };

  return (
    <div className="hidden items-center space-x-1 rounded-full bg-white px-1 dark:bg-neutral-900 dark:text-white sm:hidden md:flex lg:flex xl:flex 2xl:flex">
      <div>
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          id="optionGrid"
          onChange={(event) => handleGridList(event, 'grid')}
        />
        <label
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium leading-5 ${
            gridList == 'grid'
              ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
              : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
          }`}
          htmlFor="optionGrid"
        >
          <FontAwesomeIcon icon={faGrip} />
        </label>
      </div>
      <div>
        <input
          className="hidden"
          type="radio"
          name="rangeOptions"
          id="optionList"
          onChange={(event) => handleGridList(event, 'list')}
        />
        <label
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium leading-5 ${
            gridList == 'list'
              ? 'bg-primary-500 text-white shadow dark:bg-white dark:text-gray-900'
              : 'text-primary-500 hover:bg-primary-300 dark:bg-neutral-900 dark:text-neutral-200'
          }`}
          htmlFor="optionList"
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </label>
      </div>
    </div>
  );
};

export default SwitchGrid;
