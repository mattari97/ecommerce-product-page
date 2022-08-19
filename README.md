# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![E-commerce product page | Desktop version](./fullpage-desktop.png)

![E-commerce product page | Mobile version](./fullpage-mobile.png)

### Links

- Solution URL: [Go to solution](https://www.frontendmentor.io/solutions/ecommerce-product-page-w-sveltekit-tailwind-and-typescript-rOBF4Socjj)
- Live Site URL: [Go to live site](https://ecommerce-product-page-roan.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow
- [LocalStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) - Save data on the browser
- [SvelteKit](https://kit.svelte.dev/) - JS framework w/ SSR (Server-Side Rendering)
- [TailwindCss](https://tailwindcss.com/) - Utility-first CSS framework
- [Typescript](https://www.typescriptlang.org/) - Strongly typed JS

### What I learned

#### Create union from array of string

```ts
const localStorageHash = "553d2d4d-edc3-441a-b570-22af983bf768";
const localStorageKeys = [`${localStorageHash}-cart`] as const;
export type LocalStorageKey = typeof localStorageKeys[number];
```

#### Trap focus

Implemented this feature thinking about accessibility. I used it to make sure that user can't "leave" the menu or the lighbox with keyboard navigation when it is visible as well as focusing the element used to open the modal when closing it & being able to close it with Escape key.

```ts
// Config
const focusableSelectors = "a[href]:not([disabled='true']), button:not([disabled='true']), [tabIndex]";

interface Props {
  toggleElement: HTMLElement;
  closeCallback: () => void;
  shouldTrap: boolean;
}

// Function
export function trapFocus(element: HTMLElement, props: Props) {
  const focusableEls = Array.from(element.querySelectorAll(focusableSelectors)) as HTMLElement[];
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];
  let isTrap = false;

  const handleTrapFocus = (e: KeyboardEvent) => {
    const isTabPressed = e.key === "Tab";
    const isEscPressed = e.key === "Escape";
    if (!isTabPressed && !isEscPressed) return;
    if (isEscPressed) return props.closeCallback();
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };

  const start = () => {
    if (isTrap) return;
    isTrap = true;
    firstFocusable.focus();
    element.addEventListener("keydown", handleTrapFocus);
  };

  const stop = () => {
    if (!isTrap) return;
    isTrap = false;
    element.removeEventListener("keydown", handleTrapFocus);
    props.toggleElement.focus();
  };

  props.shouldTrap ? start() : stop();

  return {
    update(newProps: Props) {
      props = newProps;
      props.shouldTrap ? start() : stop();
    },
    destroy() {
      stop();
    },
  };
}
```

#### Slider scripts (navigation & pagination)

```ts
export function slider(element: HTMLElement) {
  const prevBtn = element.querySelector("[data-slider-prev]") as HTMLElement;
  const nextBtn = element.querySelector("[data-slider-next]") as HTMLElement;
  const wrapper = element.querySelector("[data-slider-wrapper]") as HTMLElement;
  const inner = element.querySelector("[data-slider-inner]") as HTMLElement;
  const paginationEls = Array.from(element.querySelectorAll("[data-slider-pagination]")) as HTMLElement[];
  const maxIndex = inner!.childNodes.length - 1;
  let slideWidth = wrapper.clientWidth;
  let currIndex = 0;
  let moving = false;

  const enableAllBtns = () => {
    prevBtn.removeAttribute("disabled");
    prevBtn.removeAttribute("aria-disabled");
    nextBtn.removeAttribute("disabled");
    nextBtn.removeAttribute("aria-disabled");
  };

  const enableAllPaginationEls = () =>
    paginationEls.forEach((el) => {
      el.classList.remove("pagination-disabled");
      el.removeAttribute("aria-disabled");
      el.style.cursor = "pointer";
    });

  const handleDisableBtn = () => {
    if (currIndex === 0) prevBtn.setAttribute("disabled", "true");
    if (currIndex === maxIndex) nextBtn.setAttribute("disabled", "true");
  };

  const handleDisablePagination = () => {
    paginationEls[currIndex].classList.add("pagination-disabled");
    paginationEls[currIndex].style.cursor = "auto";
    paginationEls[currIndex].setAttribute("aria-disabled", "true");
  };

  const updateIndex = (event: Event) => {
    if (event.currentTarget === prevBtn || event.currentTarget === nextBtn) {
      if (event.currentTarget === prevBtn && currIndex === 0) return false;
      if (event.currentTarget === nextBtn && currIndex === maxIndex) return false;
      event.currentTarget === prevBtn ? currIndex-- : currIndex++;
    } else {
      const newIndex = parseInt((event.currentTarget as HTMLElement).dataset.sliderPagination as string);
      if (newIndex === currIndex) return false;
      currIndex = newIndex;
    }
    return true;
  };

  const translate = () => (inner.style.transform = `translateX(-${currIndex * slideWidth}px)`);

  const move = (e: Event) => {
    if (moving || updateIndex(e) === false) return;
    moving = true;
    enableAllBtns();
    enableAllPaginationEls();
    translate();
  };

  const paginationEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") move(e);
  };

  const sliderResizeObserver = new ResizeObserver((entries) => {
    slideWidth = Math.round(entries[0].contentRect.width);
    translate();
  });

  const transitionStart = () => {
    handleDisableBtn();
    handleDisablePagination();
  };
  const transitionEnd = () => (moving = false);

  const destroySlider = () => {
    prevBtn.removeEventListener("click", move);
    nextBtn.removeEventListener("click", move);
    paginationEls.forEach((el) => {
      el.removeEventListener("click", move);
      el.removeEventListener("keydown", paginationEnter);
    });
    inner.removeEventListener("transitionstart", transitionStart);
    inner.removeEventListener("transitionend", transitionEnd);
    sliderResizeObserver.disconnect();
  };

  (function initSLider() {
    prevBtn.addEventListener("click", move);
    nextBtn.addEventListener("click", move);
    paginationEls.forEach((el) => {
      el.addEventListener("click", move);
      el.addEventListener("keydown", paginationEnter);
    });
    inner.addEventListener("transitionstart", transitionStart);
    inner.addEventListener("transitionend", transitionEnd);
    sliderResizeObserver.observe(wrapper);
  })();

  return {
    destroy() {
      destroySlider();
    },
  };
}
```

#### Click Outside handler

```ts
interface Props {
  callback: () => void;
  toggleElement: HTMLElement;
  shouldListen: boolean;
}

export function clickOutside(element: HTMLElement, props: Props) {
  let listening = false,
    childs: HTMLElement[] = [];

  const addChildNode = (node: HTMLElement) => childs.push(node);
  function getAllChildNodes(element: HTMLElement) {
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i] as HTMLElement;
      addChildNode(node);
      getAllChildNodes(node);
    }
  }
  getAllChildNodes(element);

  function onClick(e: MouseEvent) {
    if (!childs.includes(e.target as HTMLElement)) {
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
```

### Continued development

I don't like using inline svgs because it takes a lot of lines and makes the code less readable.
I wonder if there is a better way to work with them without losing the ability to style them with css for hover states & everything.

### Useful resources

- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.
- [Phosphoricons](https://phosphoricons.com/) - Flexible icon family for interfaces, diagrams, presentations, etc...
- [hidde blog](https://hidde.blog/using-javascript-to-trap-focus-in-an-element/) - Using JavaScript to trap focus in an element.
- [mobile menu accessibility](https://w3c.github.io/wai-mobile-intro/mobile/mobile-menus/) - W3C tips for mobile navigation accessibility.

## Author

- Frontend Mentor - [@AntoineC-dev](https://www.frontendmentor.io/profile/AntoineC-dev)
