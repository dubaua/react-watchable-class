export const HandlersByPropName = Symbol('handlers by prop name');
type Handler = (...args: any[]) => any;

type Instantiable<T = any> = { new (...args: any[]): T };

function isPrimitive(value: unknown): boolean {
  const type = typeof value;
  return value == null || (type != 'object' && type != 'function');
}

interface IWatchable {
  [HandlersByPropName]: Map<string, Set<Handler>>;
}

function createHandlersByPropNameSets(target: any): IWatchable {
  target[HandlersByPropName] = new Map<string, Set<Handler>>();

  for (const key in target) {
    target[HandlersByPropName].set(key, new Set<Handler>());
  }

  return target;
}

export function wrap<T>(target: Instantiable<T>): Instantiable<T> & IWatchable {
  return new Proxy(target, {
    construct(constructor, args) {
      return new Proxy(createHandlersByPropNameSets(Reflect.construct(constructor, args)), {
        set(target, prop: string, value, receiver): boolean {
          target[HandlersByPropName].get(prop)?.forEach((handler: Handler) => handler());
          return Reflect.set(target, prop, value, receiver);
        },
      });
    },
  }) as unknown as Instantiable<T> & IWatchable;
}
