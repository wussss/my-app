//@ts-nocheck
const effectStack = [];
function subscribe(runningEffect, subs) {
  subs.add(runningEffect);
  runningEffect.deps.add(subs);
}
function cleanup(runningEffect) {
  for (const dep of runningEffect.deps) {
    dep.delete(runningEffect);
  }
  runningEffect.deps.clear();
}

export function createSignal(value) {
  const subs = new Set();
  const getter = () => {
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      subscribe(effect, subs);
    }
    return value;
  };
  const setter = (newValue) => {
    value = newValue;
    for (const sub of [...subs]) {
      sub.execute();
    }
  };
  return [getter, setter];
}
export function createEffect(callback) {
  const execute = () => {
    cleanup(effect);
    effectStack.push(effect);
    try {
      callback();
    } finally {
      effectStack.pop();
    }
  };
  const effect = { execute, deps: new Set() };
  execute();
}
