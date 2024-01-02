import Skeleton from "react-loading-skeleton";
import cn from "classnames";

export default function Loading() {
  return (
    <>
      <h1>
        <Skeleton />
      </h1>

      <div className={cn("mt-10")}>
        <Skeleton height={200} />
      </div>

      <div className={cn("mt-10")}>
        <Skeleton height={300} />
      </div>
    </>
  );
}
