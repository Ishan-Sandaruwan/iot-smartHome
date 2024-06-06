import React, { useEffect, useState } from "react";
import { database, ref, onValue, set } from "../firebase";

export default function Gas() {
  const [error, setError] = useState(null);
  const [leak_detected, setLeak_detected] = useState(true);

  useEffect(() => {
    const gasRef = ref(database, "SMOKE/leak_detected");

    const handleError = (error) => {
      setError(error.message);
      console.error("Firebase error: ", error);
    };

    const unsubscribeGasDetected = onValue(
      gasRef,
      (snapshot) => {
        try {
          const leak = snapshot.val();
          setLeak_detected(leak);
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
    <div id="gas" className="p-2 py-20 border-b border-lime-500">
      <div>
        <h1 className="text-3xl font-semibold text-black">Gas Detection</h1>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div>
            <div className="pt-8 text-lg">
              Gas Leak Detected{" "}
              <span
                className={`${
                  leak_detected
                    ? "bg-red-600 px-4 py-1 rounded-md text-white"
                    : ""
                } ml-8`}
              >
                {leak_detected ? "Yes" : "No"}
              </span>
            </div>
            {leak_detected && (
              <div className="font-semibold text-red-600 text-right text-lg">
                Buzzer is active
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
