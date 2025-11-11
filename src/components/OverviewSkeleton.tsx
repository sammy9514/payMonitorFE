const Skeleton = ({ className = "" }: { className?: string }): any => (
  <div className={`animate-pulse bg-gray-300 ${className}`} />
);

const OverviewSkeleton = () => {
  return (
    <div>
      <div className="w-full flex justify-center ">
        <div className="w-[90%] mt-6   ">
          <div className="flex justify-between gap-5 items-center ">
            <Skeleton className="h-[40px] w-[200px]" />
            <Skeleton className="h-[30px] w-[140px]" />
          </div>
          <div className="grid grid-cols-3 gap-7 mt-[50px] ">
            <div className="w-full h-[250px] rounded-md bg-gray-200 col-span-3 px-4 py-6 flex flex-col md:flex-row justify-center gap-6 ">
              <Skeleton className="h-[38px] w-[50%] md:w-[900px]   mt-[8px]" />
              <div className="flex gap-5 items-center justify-center">
                <div className="w-[35%] h-[100px] md:w-[280px] md:h-[160px]  bg-gray-300 rounded-[12px] py-9 px-6 flex flex-col gap-1 justify-between">
                  <Skeleton className="h-[25px] w-[90%] md:w-[150px] bg-gray-400" />
                  <Skeleton className="h-[30px] w-[80%] md:w-[120px] bg-gray-400" />
                </div>
                <div className="w-[35%] h-[100px] md:w-[280px] md:h-[160px] bg-gray-300 rounded-[12px] py-9 px-6 flex flex-col gap-1 justify-between">
                  <Skeleton className="h-[25px] w-[90%] md:w-[150px] bg-gray-400" />
                  <Skeleton className="h-[30px] w-[80%] md:w-[120px] bg-gray-400" />
                </div>
              </div>
            </div>
            <div className="w-full h-[450px] rounded-md bg-gray-200 md:col-span-2 col-span-3 px-8 py-6 ">
              <Skeleton className="h-[30px] w-[220px] mb-6" />
              <div className="h-[370px] flex items-end justify-between gap-3">
                {/* Chart bar skeletons */}
                {[60, 80, 45, 70, 90, 55, 75].map((i) => (
                  <Skeleton
                    key={i}
                    className="flex-1 rounded-t"
                    // style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-[450px] rounded-md bg-gray-200 px-8 py-6 overflow-y-auto md:col-span-1 col-span-3">
              <Skeleton className="h-6 w-[130px] mb-4" />
              <div className="space-y-3 ">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border-l-4 border-gray-400 p-4 rounded-lg"
                  >
                    <Skeleton className="h-5 w-[120px] mb-2" />
                    <Skeleton className="h-4 w-[90px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSkeleton;
