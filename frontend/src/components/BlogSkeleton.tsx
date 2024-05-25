export const BlogSkeleton = () => {
  return (
    <div className="mt-10 mb-10">
      <div role="status" className="max-w-6xl animate-pulse">
        <div className="h-6 bg-gray-200 rounded-full w-[60%] mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[80%] mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[50%] mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[65%] mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded-full max-w-[70%]"></div>
        <span className="sr-only"></span>
      </div>
    </div>
  );
};
