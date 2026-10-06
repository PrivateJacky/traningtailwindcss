import { useEffect, useState } from "react";

export default function Tamagotchi() {
  const initValue = 60;

  const [hunger, setHunger] = useState(initValue);
  const [energy, setEnergy] = useState(initValue);
  const [running, setRunning] = useState(false);

  // Decrease hunger over time
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setHunger((h) => Math.max(0, h - 1));
    }, 800);

    return () => clearInterval(id);
  }, [running]);

  // Decrease energy over time
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setEnergy((e) => Math.max(0, e - 1));
    }, 1200);

    return () => clearInterval(id);
  }, [running]);

  const feed = () => {
    setHunger((h) => Math.min(100, h + 10));
  };

  const sleep = () => {
    setEnergy((e) => Math.min(100, e + 15));
  };

  const reset = () => {
    setHunger(50);
    setEnergy(50);
    setRunning(false);
  };

  const dead = hunger === 0 || energy === 0;

  // Auto pause when pet dies
  useEffect(() => {
    if (dead && running) {
      setRunning(false);
    }
  }, [dead, running]);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-50 to-blue-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-purple-200/50">
          {/* Header */}
          <div className="bg-linear-to-r from-purple-500 to-pink-500 px-6 py-6 text-center text-white">
            <div className="mb-2 text-6xl">🥚</div>

            <h1 className="text-2xl font-bold">React Tamagotchi</h1>

            <p className="mt-1 text-sm text-white/80">
              Take care of your little pet
            </p>
          </div>

          {/* Pet Area */}
          <div className="px-6 py-6">
            <div
              className={`
                relative flex h-40 items-center justify-center
                overflow-hidden rounded-2xl
                bg-linear-to-b from-blue-50 to-purple-50
                ${dead ? "" : "animate-pulse"}
              `}
            >
              {/* Decorative circles */}
              <div className="absolute left-5 top-5 h-3 w-3 rounded-full bg-pink-300/50" />
              <div className="absolute right-8 top-8 h-4 w-4 rounded-full bg-purple-300/50" />
              <div className="absolute bottom-5 left-10 h-2 w-2 rounded-full bg-blue-300/50" />

              <div className="text-center">
                <div className="text-7xl">
                  {dead ? "💀" : running ? "🐣" : "🥚"}
                </div>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  {dead
                    ? "Your pet needs help!"
                    : running
                      ? "Your pet is happy!"
                      : "Your pet is waiting..."}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <Stat label="Hunger" value={hunger} icon="🍎" color="orange" />

              <Stat label="Energy" value={energy} icon="⚡" color="blue" />
            </div>

            {/* Controls */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* Start / Pause */}
              <button
                onClick={() => setRunning((r) => !r)}
                disabled={dead}
                className="
                  col-span-2
                  rounded-xl
                  bg-purple-600
                  px-4 py-3
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-purple-200
                  transition
                  hover:bg-purple-700
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:bg-slate-300
                  disabled:shadow-none
                "
              >
                {running ? "⏸ Pause" : "▶ Start"}
              </button>

              {/* Feed */}
              <button
                onClick={feed}
                disabled={!running || dead}
                className="
                  rounded-xl
                  border
                  border-orange-200
                  bg-orange-50
                  px-4 py-3
                  font-semibold
                  text-orange-600
                  transition
                  hover:bg-orange-100
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                🍎 Feed
              </button>

              {/* Sleep */}
              <button
                onClick={sleep}
                disabled={!running || dead}
                className="
                  rounded-xl
                  border
                  border-blue-200
                  bg-blue-50
                  px-4 py-3
                  font-semibold
                  text-blue-600
                  transition
                  hover:bg-blue-100
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                💤 Sleep
              </button>

              {/* Reset */}
              <button
                onClick={reset}
                className="
                  col-span-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4 py-3
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-100
                  active:scale-[0.98]
                "
              >
                ↻ Reset
              </button>
            </div>

            {/* Dead Message */}
            {dead && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                <p className="font-semibold text-red-600">
                  Your pet needs help!
                </p>

                <p className="mt-1 text-sm text-red-400">
                  Press Reset to take care of your pet again.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center">
            <p className="text-xs text-slate-400">
              Keep your pet healthy and happy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon, color }) {
  const colorClasses = {
    orange: {
      background: "bg-orange-100",
      text: "text-orange-600",
      bar: "bg-orange-400",
      track: "bg-orange-100",
    },
    blue: {
      background: "bg-blue-100",
      text: "text-blue-600",
      bar: "bg-blue-400",
      track: "bg-blue-100",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      {/* Label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              ${colors.background}
            `}
          >
            {icon}
          </div>

          <span className="font-semibold text-slate-700">{label}</span>
        </div>

        <span className={`text-sm font-bold ${colors.text}`}>{value}</span>
      </div>

      {/* Progress Bar */}
      <div
        className={`
          mt-4
          h-2.5
          overflow-hidden
          rounded-full
          ${colors.track}
        `}
      >
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-300
            ${colors.bar}
          `}
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <p className="mt-2 text-right text-xs text-slate-400">{value}/100</p>
    </div>
  );
}
