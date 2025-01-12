import { homeResolvers } from './home/resolvers/homeResolvers';
import { timerResolvers } from './timer/resolvers/timerResolvers';

export const handlers = [...homeResolvers, ...timerResolvers];
