import { friendResolvers } from '@/mocks/home/resolvers/friendModalResover';

import { homeResolvers } from './home/resolvers/homeResolvers';

export const handlers = [...homeResolvers, ...friendResolvers];
