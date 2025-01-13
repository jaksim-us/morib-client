import { userProfileResolvers } from '@/mocks/modal/resolvers/settingModalResover';

import { homeResolvers } from './home/resolvers/homeResolvers';

export const handlers = [...homeResolvers, ...userProfileResolvers];
