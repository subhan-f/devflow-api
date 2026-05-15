import { Injectable } from '@nestjs/common';
import { APP_NAME, APP_VERSION } from './common/constants';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      status: 'ok',
      name: APP_NAME,
      version: APP_VERSION,
      timestamp: new Date().toISOString(),
    };
  }
}
