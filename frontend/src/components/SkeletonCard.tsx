export const SkeletonCard = () => {
  return (
    <div className="w-60 h-56 bg-gray-800 rounded-lg p-1">
      {/* Image Placeholder */}
      <div className="w-full h-3/5 bg-gray-700 rounded-md animate-pulse"></div>

      {/* Date Placeholder */}
      <div className="w-32 h-4 bg-gray-600 rounded-md mt-3 animate-pulse"></div>

      {/* Title Placeholder */}
      <div className="w-full h-6 bg-gray-700 rounded-md mt-3 animate-pulse"></div>
      
    </div>
  );
};

export const SkeletonCards = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
};
