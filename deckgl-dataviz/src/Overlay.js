import React from "react";
import "./Overlay.css";

export default function App({
  img_url = "./doraemon.png",
})
{
  return (
    <div style={{zIndex: -1}}>
      <img src={img_url} alt="flying in the sky" />
    </div >
  );
}
