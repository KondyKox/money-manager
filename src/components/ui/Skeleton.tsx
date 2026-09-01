const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse rounded-2xl bg-gray-300/30 ${className}`} />
  );
};

export default Skeleton;
