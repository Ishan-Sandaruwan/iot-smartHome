import React from "react";

export default function Hero() {
  return (
    <div id="home" className="pt-28 w-full min-h-[50vh] flex items-center justify-centerp-2 py-20 border-b border-lime-500">
      <div className="flex flex-wrap ">
        <div className="lg:w-1/2 w-full p-6">
          <img src="./img1.jpg" alt="" className="rounded-md"/>
        </div>
        <div className="lg:w-1/2 w-full p-6 flex flex-col justify-center">
          <h1 className="text-6xl pb-8">Awaken your home</h1>
          <p className="text-lg">
            A smart home uses internet-connected devices to automate and control
            household functions like lighting, heating, and security remotely.
            This technology enhances convenience, improves energy efficiency,
            and provides better security, making daily life easier and more
            efficient.
          </p>
        </div>
      </div>
    </div>
  );
}
