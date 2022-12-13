import { useRef, useLayoutEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { comfortaa } from "../util/comfortaa";

gsap.registerPlugin(MotionPathPlugin);

export default function FlyingPlaneLoader() {
  const planeRef = useRef(null);
  useLayoutEffect(() => {
    gsap.to(planeRef.current, {
      motionPath: {
        path: "M -100 0 C -100 -100 100 100 100 0 C 100 -100 -100 100 -100 0 z",
        autoRotate: true,
      },
      duration: 5,
      repeat: -1,
      ease: "power1.inOut",
    });
  });
  return (
    <div className="grow grid place-content-center">
      <p
        className={`relative -top-8 font-semibold text-lg sm:text-2xl text-center ${comfortaa.className}`}
      >
        Building your next adventure!
      </p>
      <PaperAirplaneIcon
        ref={planeRef}
        className="h-10 w-10 text-white mx-auto z-10"
      />
    </div>
  );
}
