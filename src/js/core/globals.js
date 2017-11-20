export const browser = {}

if (typeof window !== 'undefined') {
  browser.supported = 'requestAnimationFrame' in window
  browser.supportsTouch = 'ontouchstart' in window
  browser.usingTouch = false
  browser.dynamicInputDetection = true
  browser.iOS = /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream
}

/**
* The global storage array which holds all Tippy instances.
* This allows us to hide tooltips from all instances, finding the Tippy instance when
* clicking on the body, and for followCursor listeners
*/
export const store = []

/**
* Selector constants used for grabbing elements
*/
export const selectors = {
  POPPER: '.tippy-popper',
  TOOLTIP: '.tippy-tooltip',
  CONTENT: '.tippy-content',
  BACKDROP: '.tippy-backdrop',
  ARROW: '.tippy-arrow',
  ROUND_ARROW: '.tippy-roundarrow',
  REFERENCE: '[data-tippy]'
}

/**
* The default options applied to each instance
*/
export const defaults = {
  html: false,
  placement: 'top',
  animation: 'shift-away',
  animateFill: true,
  arrow: false,
  delay: 0,
  trigger: 'mouseenter focus',
  duration: 350,
  interactive: false,
  interactiveBorder: 2,
  theme: 'dark',
  size: 'regular',
  distance: 10,
  offset: 0,
  hideOnClick: true,
  multiple: false,
  followCursor: false,
  inertia: false,
  updateDuration: 350,
  sticky: false,
  stickyDuration: 200,
  appendTo: () => document.body,
  zIndex: 9999,
  touchHold: false,
  performance: false,
  dynamicTitle: false,
  flip: true,
  flipBehavior: 'flip',
  arrowType: 'sharp',
  arrowTransform: '',
  maxWidth: '',
  popperOptions: {},
  onShow() {},
  onShown() {},
  onHide() {},
  onHidden() {}
}

/**
* The keys of the defaults object for reducing down into a new object
* Used in `getIndividualOptions()`
*/
export const defaultsKeys = browser.supported && Object.keys(defaults)
