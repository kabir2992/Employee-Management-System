import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

const Loader = () => {
    const { loading } = useContext(LoadingContext);

    if(!loading)
    {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white px-8 py-4 rounded-lg shadow-xl">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;