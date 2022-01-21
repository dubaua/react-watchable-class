import { createContext } from 'react';
import { Service } from './service';

const service = new Service();

const services = {
  service,
};

export const ServiceContext = createContext(services);
export const ServiceProvider = ServiceContext.Provider;
export default services;
