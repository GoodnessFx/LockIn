import updatedFetch from './fetch';

// Set up global fetch polyfill
// @ts-ignore
global.fetch = updatedFetch;

// Additional polyfills for Hermes compatibility
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (callback: Function, ...args: any[]) => {
    return setTimeout(callback, 0, ...args);
  };
}

if (typeof global.clearImmediate === 'undefined') {
  global.clearImmediate = (id: any) => {
    clearTimeout(id);
  };
}

// Ensure console methods are available
if (!global.console) {
  global.console = console;
}
