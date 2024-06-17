import React, { useEffect, useState } from "react";
import { database, ref, onValue, set } from "../firebase";

export default function Tank() {
  const [error, setError] = useState(null);
  const [water_state, setWater_state] = useState(true);

  useEffect(() => {
    const waterRef = ref(database, "WaterTank/IsLow");

    const handleError = (error) => {
      setError(error.message);
      console.error("Firebase error: ", error);
    };

    const unsubscribewaterlevelDetected = onValue(
      waterRef,
      (snapshot) => {
        try {
          const state = snapshot.val();
          setWater_state(state);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    return () => {
      unsubscribewaterlevelDetected();
    };
  }, []);

  return (
    <div id="tank" className="p-2 py-20 border-b border-lime-500">
      <div>
        <h1 className="text-3xl font-semibold text-black">Water Level</h1>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="text-lg pt-8">
            Is Low
            <span className="ml-8">{water_state ? "Yes" : "No"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
