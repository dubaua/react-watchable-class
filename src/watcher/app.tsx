import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './root';
import services, { ServiceProvider } from './service.provider';

export function initApp(appRootNode: HTMLElement): void {
  ReactDOM.render(
    <React.StrictMode>
      <ServiceProvider value={services}>
        <Root />
      </ServiceProvider>
    </React.StrictMode>,
    appRootNode,
  );
}
