import { atom, useAtom } from "jotai";
import { useRef } from "react";

export const skibidiAtom = atom(false);
export const wiggleAtom = atom(true);

export const UI = () => {
  const [skibidi, setSkibidi] = useAtom(skibidiAtom);
  const [_wiggle, setWiggle] = useAtom(wiggleAtom);
  const audio = useRef();

  const startSkibidi = (withWiggle) => {
    setSkibidi(true);
    setWiggle(withWiggle);
    audio.current.play();
    audio.current.loop = true;
  };
  const stopSkibidi = () => {
    setSkibidi(false);
    setWiggle(true);
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  return (
    <main className="pointer-events-none fixed z-10 inset-0 p-10 flex justify-between flex-col">
      <a
        className="pointer-events-auto"
        href="https://lessons.wawasensei.dev/courses/react-three-fiber"
      >
        <img className="w-20" src="/images/wawasensei-white.png" />
      </a>
      <div className="flex items-center justify-center gap-4">
        {skibidi ? (
          <button
            className="pointer-events-auto bg-white/70 hover:bg-white transition-colors duration-200 text-black px-8 py-3 rounded-full font-bold text-xl uppercase"
            onClick={stopSkibidi}
          >
            Stop
          </button>
        ) : (
          <>
            <button
              className="w-40 pointer-events-auto bg-white/70 hover:bg-white transition-colors duration-200 text-black  py-3 rounded-full font-bold text-xl uppercase"
              onClick={() => startSkibidi(false)}
            >
              Start{" "}
              <div className="text-xs -mt-1 font-medium">(without wiggle)</div>
            </button>
            <button
              className="w-40 pointer-events-auto bg-white/70 hover:bg-white transition-colors duration-200 text-black  py-3 rounded-full font-bold text-xl uppercase"
              onClick={() => startSkibidi(true)}
            >
              Start{" "}
              <div className="text-xs -mt-1 font-medium">(with wiggle)</div>
            </button>
          </>
        )}
        <audio
          src="https://www.myinstants.com/media/sounds/yes-yes-yes-skibidi.mp3"
          ref={audio}
        />
      </div>
    </main>
  );
};
