/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const HandlersByPropNameSymbol = Symbol('handlers by prop name');

interface IAbstractType<T> extends Function {
  new (...args: any): T;
  prototype: T;
}

type Handler = (...args: any[]) => any;

interface IWatchable {
  [HandlersByPropNameSymbol]: Map<string, Set<Handler>>;
}

function isPrimitive(value: unknown) {
  const type = typeof value;
  return value == null || (type != 'object' && type != 'function');
}

export function Watchable<T extends object>(constructor: IAbstractType<T>) {
  const original = constructor;

  // eslint-disable-next-line func-style
  const newConstructor: any = function newConstructor(...args: any[]): any {
    const instance: any = new original(...args); // according the comments;

    instance[HandlersByPropNameSymbol] = new Map<string, Set<Handler>>();

    const proxy = new Proxy(instance, {
      set(target, prop, value, receiver) {
        if (isPrimitive(value)) {
          const handlers = instance[HandlersByPropNameSymbol].get(prop);
          handlers.forEach((handler: Handler) => handler());
        }
        return Reflect.set(target, prop, value, receiver); // (2)
      },
    });

    for (const key in instance) {
      const value = instance[key];
      if (isPrimitive(value)) {
        instance[HandlersByPropNameSymbol].set(key, new Set());
      }
    }
    return proxy;
  };

  newConstructor.prototype = original.prototype;

  return newConstructor;
}

export class Watch {
  [HandlersByPropNameSymbol] = new Map<string, Set<Handler>>();

  constructor() {
    const proxy = new Proxy(this, {
      set(target, prop: string, value, receiver) {
        if (isPrimitive(value)) {
          proxy[HandlersByPropNameSymbol].get(prop)?.forEach((handler) => handler());
        }
        return Reflect.set(target, prop, value, receiver);
      },
    });

    for (const key in this) {
      const value = this[key];
      if (isPrimitive(value)) {
        this[HandlersByPropNameSymbol].set(key, new Set());
      }
    }

    return proxy;
  }
}

// service.messagesById = new Proxy(service.messagesById, {
//   get(target: any, prop: PropertyKey, receiver: any): any {
//     const value = Reflect.get(target, prop, receiver);
//     if (prop === 'set' || prop === 'clear') {
//       setState(state + 1);
//     }
//     return typeof value == 'function' ? value.bind(target) : value;
//   },
// });
