import React, { useEffect, useState } from "react";
import { database, ref, onValue, set } from "../firebase";

export default function Fish() {
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(true);
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const gasRef = ref(database, "FISH/timer");

    const handleError = (error) => {
      setError(error.message);
      console.error("Firebase error: ", error);
    };

    const unsubscribeTimer = onValue(
      gasRef,
      (snapshot) => {
        try {
          const timer = snapshot.val();
          setTimer(timer);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    return () => {
      unsubscribeTimer();
    };
  }, []);

  const handleNewTime = async () => {
    try {
      await set(ref(database, "FISH/timer"), newTime);
      setNewTime("");
    } catch (error) {
      setError(error.message);
      console.error("Firebase error: ", error);
    }
  };

  return (
    <div id="fish" className="p-2 py-20 ">
      <div>
        <h1 className="text-3xl font-semibold text-black">Fish Feeder</h1>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div  className="flex flex-col gap-6 my-8">
            <div className="pt-8 text-lg">
              Current Timer{" "}
              <span
                className={`ml-8`}
              >
                {timer}
              </span>
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="newTime" className="text-xl">Change Timer</label>
              <div className="flex gap-2 justify-between">
                <input
                  type="text"
                  id="newTime"
                  value={newTime}
                  placeholder="Ex: 75"
                  onChange={(e) => setNewTime(e.target.value)}
                  className="py-1 px-3 rounded-md"
                />
                <button
                  onClick={handleNewTime}
                  className="rounded-md border py-1 px-4 border-slate-800 hover:text-blue-200 hover:bg-slate-800 transition-all"
                >
                  Sync Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
