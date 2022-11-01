import { createSignal, createEffect, createMemo } from "./reactive";

import "./index.css";

export function Home() {
  console.log("1. Create Signal");
  const [getCount, setCount] = createSignal(1);
  const [name, setName] = createSignal("silan");

  console.log("2. Create Reaction");
  createEffect(() => {
    const ele = document.getElementById("text");
    if (ele) {
      ele.innerText = getCount() + "";
    }
  });

  const add = () => {
    setCount(getCount() + 1);
    setName("xx");
  };
  const clear = () => {
    setCount(0);
  };
  const sum = createMemo(() => {
    if (name() === "silan") {
      return name() + " is " + getCount() * 3;
    }
    return getCount();
  }, 0);
  createEffect(() => {
    console.log("sum", sum());
  });

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
