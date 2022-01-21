/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import { Form } from './form';
import { ServiceContext } from './service.provider';

export const Root = (): JSX.Element => {
  const { service } = useContext(ServiceContext);
  const [state, setState] = useState(0);
  const messages = Array.from(service.messagesById.values());

  service.messagesById = new Proxy(service.messagesById, {
    get(target: any, prop: PropertyKey, receiver: any): any {
      const value = Reflect.get(target, prop, receiver);
      if (prop === 'set' || prop === 'clear') {
        setState(state + 1);
      }
      return typeof value == 'function' ? value.bind(target) : value;
    },
  });

  return (
    <div>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
      <button type="button" onClick={(): void => service.clearMessages()}>
        Clear messages
      </button>
      <Form service={service} />
    </div>
  );
};
