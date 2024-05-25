export const FullBlogSkeleton = () => {
  return (
    <>
      <div className="mt-10 mb-10  flex flex-col">
        <div className="max-w-[90%]">
          <div className="flex items-center gap-32 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-full w-[60%]"></div>
            <div className="py-10">
              <h1 className="font-semibold mb-4">Author</h1>
              <div className=" flex gap-4 justify-center items-center">
                <div>
                  <div className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full ">
                    <span className="text-sm bg-gray-200 font-medium rounded-full text-gray-200 "></span>
                  </div>
                </div>
                <div className="w-[70%]">
                  <div className="h-2 bg-gray-200 rounded-full w-[200px] mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-[70%] mb-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div role="status" className="max-w-[60%] animate-pulse">
          <div className="h-6 bg-gray-200 rounded-full w-[90%] mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[80%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[80%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[65%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[50%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[65%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[50%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[70%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full max-w-[70%] mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
      </div>
    </>
  );
};
