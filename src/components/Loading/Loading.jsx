import React from "react";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex items-center space-x-2 py-10">
                <div className="w-3 h-3 bg-[#FA6509] rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-[#FA6509] rounded-full animate-bounce delay-150"></div>
                <div className="w-3 h-3 bg-[#FA6509] rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    );
};

export default Loading;
