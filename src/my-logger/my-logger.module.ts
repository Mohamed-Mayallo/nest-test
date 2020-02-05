import { Module } from '@nestjs/common';
import { MyLogger } from 'src/my-logger/my-logger.service';

@Module({
  providers: [MyLogger],
  exports: [MyLogger]
})
export class MyLoggerModule {}
