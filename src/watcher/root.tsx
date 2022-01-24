/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react';
import { Form } from './form';
import { ServiceContext } from './service.provider';
import { Test } from './test';

export const Root = (): JSX.Element => {
  const { service } = useContext(ServiceContext);
  const { messages } = service;
  const [isVisible, setIsVisible] = useState(false);

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

      <input type="checkbox" onChange={(e) => setIsVisible(e.target.checked)} />
      {isVisible && <Test />}
      <Form service={service} />
    </div>
  );
};
