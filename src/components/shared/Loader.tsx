import { SyncLoader } from "react-spinners";

type Props = {
  loading: boolean;
};
const Loader = ({ loading }: Props) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center z-[99999]  h-screen fixed bottom-0 left-0 top-0 right-0 bg-background dark:bg-background">
          <SyncLoader className="d-inline" color="hsl(var(--primary))" loading={loading} speedMultiplier={1} size={20} />
        </div>
      ) : null}
    </>
  );
};
export default Loader;
