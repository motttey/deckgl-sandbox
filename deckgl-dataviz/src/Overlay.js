import React from "react";
import "./Overlay.css";

export default function App({
  img_url = "./logo192.png",
})
{
  return (
    <div style={{zIndex: -1}}>
      <img src={img_url} alt="flying in the sky" />
    </div >
  );
}
