import { createSignal, createEffect } from "./reactive";

import "./index.css";

export function Home() {
  console.log("1. Create Signal");
  const [getCount, setCount] = createSignal(1);

  console.log("2. Create Reaction");
  createEffect(() => {
    const ele = document.getElementById("text");
    if (ele) {
      ele.innerText = getCount() + "";
    }
  });

  const add = () => {
    setCount(getCount() + 1);
  };
  const clear = () => {
    setCount(0);
  };
  return (
    <div class="root">
      <div style={{ "margin-bottom": "20px" }}>mysolid</div>
      <div id="text">{getCount()}</div>
      <div onClick={add} class="button add">
        add
      </div>
      <div onClick={clear} class="button clear">
        clear
      </div>
    </div>
  );
}
