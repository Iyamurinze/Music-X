import { Injectable, Inject } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(private devconfigService: DevConfigService, 
    @Inject('CONFIG')
    private config: {port: string},
  ) {}

  getHello(): string {
    return `Hello World! DB Host is ${this.devconfigService.getDBHOST()} PORT: ${this.config.port}`;
  }
}
