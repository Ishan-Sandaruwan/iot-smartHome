import React, { useEffect, useState } from "react";
import { database, ref, onValue, set } from "../firebase";

export default function Light() {
  const [Brightness, setBrightness] = useState(-1);
  const [Env_Dark, setEnv_Dark] = useState(-1);
  const [manual_val, setManual_val] = useState(-1);
  const [error, setError] = useState(null);
  const [auto, setAuto] = useState(true);
  const [newVal, setNewVal] = useState("");

  useEffect(() => {
    const BrightnesRef = ref(database, "LED/Brightness");
    const Env_DarkRef = ref(database, "LED/Env_Dark");
    const autoRef = ref(database, "LED/auto");
    const manual_valRef = ref(database, "LED/manual_val");

    const handleError = (error) => {
      setError(error.message);
      console.error("Firebase error: ", error);
    };

    const unsubscribeBrightness = onValue(
      BrightnesRef,
      (snapshot) => {
        try {
          const lightValue = snapshot.val();
          setBrightness(lightValue);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    const unsubscribeEnv_Dark = onValue(
      Env_DarkRef,
      (snapshot) => {
        try {
          const brightnessValue = snapshot.val();
          setEnv_Dark(brightnessValue);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    const unsubscribeManual_valRef = onValue(
      manual_valRef,
      (snapshot) => {
        try {
          const manual = snapshot.val();
          setManual_val(manual);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    const unsubscribeAuto = onValue(
      autoRef,
      (snapshot) => {
        try {
          const auto = snapshot.val();
          setAuto(auto);
          setError(null); // Clear any previous errors
        } catch (error) {
          handleError(error);
        }
      },
      handleError
    );

    return () => {
      unsubscribeBrightness();
      unsubscribeEnv_Dark();
      unsubscribeAuto();
      unsubscribeManual_valRef();
    };
  }, []);

  const handleAuto = async () => {
    const newAutoValue = !auto;
    try {
      await set(ref(database, "LED/auto"), newAutoValue);
      setAuto(newAutoValue);
    } catch (error) {
      setError(error.message);
      console.error("Firebase error: ", error);
    }
  };

  const handleNewVal = async () => {
    try {
      await set(ref(database, "LED/manual_val"), newVal);
      setNewVal("");
    } catch (error) {
      setError(error.message);
      console.error("Firebase error: ", error);
    }
  };

  return (
    <div id="light" className="p-2 py-20 border-b border-lime-500">
      <div>
        <h1 className="text-3xl font-semibold text-black">Light Controll</h1>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="flex flex-col gap-6 my-8">
            <div className="flex gap-8">
              <div>
                <p>Light Brightness Level</p>
                <p>
                  <span>{auto ? Brightness : manual_val}</span>%
                </p>
              </div>
              <div>
                <p>Environment Darknesss</p>
                <p>
                  <span>{Env_Dark}</span>%
                </p>
              </div>
            </div>
            <div>
              AutoMode{" "}
              <button onClick={handleAuto} className="px-2">
                {auto ? "ON" : "OFF"}
              </button>
            </div>
            <div className="flex flex-col gap-4 ">
              <label htmlFor="newVal" className="text-xl">Change Brightness Manually</label>
              <div className="flex gap-2 justify-between">
                <input
                  type="text"
                  id="newVal"
                  value={newVal}
                  placeholder="Ex: 75"
                  onChange={(e) => setNewVal(e.target.value)}
                  className="py-1 px-3 rounded-md"
                />
                <button
                  onClick={handleNewVal}
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
