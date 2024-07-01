import { SyncLoader } from "react-spinners";

type Props = {
  loading: boolean;
};
const Loader = ({ loading }: Props) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center z-[99999]  h-screen fixed bottom-0 left-0 top-0 right-0 bg-white">
          <SyncLoader className="d-inline" color="#F3AE48" loading={loading} speedMultiplier={1} size={20} />
        </div>
      ) : null}
    </>
  );
};
export default Loader;
