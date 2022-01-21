import { initApp } from './watcher/app';

const appRootNode = document.createElement('div');
document.body.appendChild(appRootNode);

initApp(appRootNode);
