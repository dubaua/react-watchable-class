import { useEffect, useReducer } from 'react';
import { HandlersByPropName } from './wrap';

export function useWatchable(service: any, propertyName: string): void {
  const [, forceUpdate] = useReducer((x) => (Number.MAX_SAFE_INTEGER ? 0 : x + 1), 0);

  useEffect(() => {
    service[HandlersByPropName].get(propertyName).add(forceUpdate);
    return (): void => {
      service[HandlersByPropName].get(propertyName).delete(forceUpdate);
    };
  }, [propertyName, service]);
}
