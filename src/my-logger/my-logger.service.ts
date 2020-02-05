import * as chalk from 'chalk';
import * as dateFns from 'date-fns';
import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: string) {
    console.log(
      `[${chalk.dim.bold(
        `LOG | ${dateFns.format(new Date(), 'yyyy-MMdd h:m:s')}}`
      )}] ${chalk.greenBright(message)}
---------------------------`
    );
  }

  error(message: string, trace: string) {
    console.log(`
[${chalk.red(dateFns.format(new Date(), 'yyyy-MMdd h:m:s'))}}]
[${chalk.red.bold('ERROR MESSAGE')}] ${chalk.red(message)}
[${chalk.red.bold('ERROR TRACE')}] ${chalk.magenta(trace)}
---------------------------`);
  }

  warn(message: string) {
    console.log(`[${chalk.yellow.bold(
      `WARNING | ${dateFns.format(new Date(), 'yyyy-MMdd h:m:s')}}`
    )}] ${chalk.yellow(message)}
---------------------------`);
  }

  debug(message: string) {
    console.log(
      `[${chalk.white.bold(
        `DEBUGGING | ${dateFns.format(new Date(), 'yyyy-MMdd h:m:s')}}`
      )}] ${chalk.white(message)}
---------------------------`
    );
  }

  verbose(message: string) {
    console.log(
      `[${chalk.dim.bold(
        `VERBOSE | ${dateFns.format(new Date(), 'yyyy-MMdd h:m:s')}}`
      )}] ${chalk.dim(message)}
---------------------------`
    );
  }
}