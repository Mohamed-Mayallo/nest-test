import * as chalk from 'chalk';
import * as dateFns from 'date-fns';
import {
  LoggerService as CommonLoggerService,
  Scope,
  Injectable
} from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements CommonLoggerService {
  private prefix = 'NestFactory';

  public setPrefix(prefix) {
    this.prefix = prefix;
  }

  log(message: string) {
    console.log(
      `[${chalk.yellow.bold(
        `LOG | ${dateFns.format(new Date(), 'yyyy-MM-dd h:m:s')} | ${
          this.prefix
        }`
      )}] ${chalk.greenBright(message)}`
    );
  }

  error(message: string, trace: string) {
    console.log(`
[${chalk.yellow.bold(dateFns.format(new Date(), 'yyyy-MM-dd h:m:s'))}]
[${chalk.yellow.bold(this.prefix)}]
[${chalk.yellow.bold('ERROR MESSAGE')}] ${chalk.red(message)}
[${chalk.yellow.bold('ERROR TRACE')}] ${chalk.red(trace)}`);
  }

  warn(message: string) {
    console.log(
      `[${chalk.yellow.bold(
        `WARNING | ${dateFns.format(new Date(), 'yyyy-MM-dd h:m:s')}`
      )}] ${chalk.magentaBright(message)}`
    );
  }

  debug(message: string) {
    console.log(
      `[${chalk.yellow.bold(
        `DEBUGGING | ${dateFns.format(new Date(), 'yyyy-MM-dd h:m:s')}`
      )}] ${chalk.white(message)}`
    );
  }

  verbose(message: string) {
    console.log(
      `[${chalk.yellow.bold(
        `VERBOSE | ${dateFns.format(new Date(), 'yyyy-MM-dd h:m:s')}`
      )}] ${chalk.dim(message)}`
    );
  }
}
