interface Props {
  callback: () => void;
  toggleElement: HTMLElement;
  shouldListen: boolean;
}

export function clickOutside(element: HTMLElement, props: Props) {
  let listening = false;
  function onClick(e: MouseEvent) {
    if (!element.contains(e.target as Node)) {
      props.callback();
    }
  }

  function start() {
    if (listening) return;
    listening = true;
    document.body.addEventListener("click", onClick);
  }

  function stop() {
    if (!listening) return;
    listening = false;
    document.body.removeEventListener("click", onClick);
    props.toggleElement.focus();
  }

  props.shouldListen ? start() : stop();

  return {
    update(newProps: Props) {
      props = newProps;
      props.shouldListen ? start() : stop();
    },
    destroy() {
      stop();
    },
  };
}
