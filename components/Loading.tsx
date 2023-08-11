import React, { useContext,useEffect } from "react";
import { RenderContext } from "../context/render/renderContext";

function Loading() {

  const { loader } = useContext(RenderContext);

  useEffect(() => {
    console.log(loader);
  }, [loader])
  

  return (
    <>
      <input type="checkbox" checked={loader} disabled id="my-modal-3" className="modal-toggle" />
      <div className="modal">
      <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
      </div>
    </>
  );
}

export default Loading;
