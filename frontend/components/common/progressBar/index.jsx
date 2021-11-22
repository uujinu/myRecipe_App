/* eslint-disable no-unused-vars */
import NProgress from "nprogress";
import router from "next/router";
import { useState, useEffect } from "react";

export default function ProgressBar() {
  const [state, setState] = useState({
    color: "#fb9c98",
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 2.5,
  });
  let timer = null;

  const routeChangeStart = () => {
    NProgress.set(state.startPosition);
    NProgress.start();
  };

  const routeChangeEnd = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      NProgress.done(true);
    }, state.stopDelayMs);
  };

  useEffect(() => {
    NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });
    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeEnd);
    router.events.on("routeChangeError", routeChangeEnd);
  }, []);

  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${state.color} !important;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: ${state.height}px !important;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 5px ${state.color}, 0 0 5px ${state.color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
    `}</style>
  );
}
