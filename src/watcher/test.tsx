import React, { useContext } from 'react';
import { ServiceContext } from './service.provider';
import { useWatchable } from './use-watchable';

export const Test = (): JSX.Element => {
  const { service } = useContext(ServiceContext);

  useWatchable(service, 'hasMessages');

  return (
    <button
      type="button"
      onClick={(): void => {
        service.hasMessages = !service.hasMessages;
      }}
    >
      flip service.hasMessages {service.hasMessages ? 'yes' : 'no'}
    </button>
  );
};
