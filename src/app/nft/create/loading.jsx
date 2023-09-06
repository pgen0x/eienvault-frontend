export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <li className="animate-pulse">
        <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-200 p-4">
          <div className="text-gray-500">
            <div className="h-20 w-20 rounded-full bg-gray-300"></div>
            <div className="mt-2 h-4 w-20 rounded bg-gray-300"></div>
          </div>
        </div>
      </li>
      <li className="animate-pulse">
        <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-200 p-5">
          <div className="text-gray-500">
            <div className="h-20 w-20 rounded-full bg-gray-300"></div>
            <div className="mt-2 h-4 w-20 rounded bg-gray-300"></div>
          </div>
        </div>
      </li>
    </>
  );
}
