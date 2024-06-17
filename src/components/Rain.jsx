import React, { useEffect, useState } from "react";
import { database, ref, onValue, set } from "../firebase";

export default function Rain() {
  const [error, setError] = useState(null);
  const [rain_state, setRain_state] = useState(true);

  useEffect(() => {
    const rainRef = ref(database, "RAIN/IsRain");

    const handleError = (error) => {
      setError(error.message);
      console.error("Firebase error: ", error);
    };

    const unsubscribeRainDetected = onValue(
        rainRef,
      (snapshot) => {
        try {
          const state = snapshot.val();
          setRain_state(state);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    return () => {
        unsubscribeRainDetected();
    };
  }, []);

  return (
    <div id="rain" className="p-2 py-20 border-b border-lime-500">
      <div>
        <h1 className="text-3xl font-semibold text-black">Raining</h1>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="text-lg pt-8">
            Is Raining
            <span className="ml-8">{rain_state ? "Yes" : "No"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
