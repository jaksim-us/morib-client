import { allowedServiceResolvers } from './allowedService/resolvers/allowedServiceResolvers';
import { homeResolvers } from './home/resolvers/homeResolvers';

export const handlers = [...homeResolvers, ...allowedServiceResolvers];
