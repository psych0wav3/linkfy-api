import { SetMetadata } from '@nestjs/common';

export const AUTH_KEY = 'authentication';

export const NotAuth = () => SetMetadata(AUTH_KEY, true);
