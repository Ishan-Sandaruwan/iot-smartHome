import React, { useEffect, useState } from "react";
import { database, ref, onValue, set } from "../firebase";

export default function Solid() {
  const [error, setError] = useState(null);
  const [Moisture_state, setMoisture_state] = useState(true);

  useEffect(() => {
    const gasRef = ref(database, "Soil/Moisture_state");

    const handleError = (error) => {
      setError(error.message);
      console.error("Firebase error: ", error);
    };

    const unsubscribeGasDetected = onValue(
      gasRef,
      (snapshot) => {
        try {
          const state = snapshot.val();
          setMoisture_state(state);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    return () => {
      unsubscribeGasDetected();
    };
  }, []);

  return (
    <div id="soil" className="p-2 py-20 border-b border-lime-500">
      <div>
        <h1 className="text-3xl font-semibold text-black">Soil Moisture</h1>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="text-lg">
            <div className="pt-8 ">
              Soil Moisture Presentage{" "}
              <span
                className={`${
                    Moisture_state<=20
                    ? "bg-red-600 px-4 py-1 rounded-md text-white"
                    : ""
                } ml-8`}
              >
                {Moisture_state}
              </span>
            </div>
            <div className="">
              Watering to the Plants
              <span className="ml-8">{Moisture_state<=20 ? "Yes" : "No"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
