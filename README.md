# Nestjs i18n Chiper
# Table of Contents
- [Nestjs i18n Chiper](#nestjs-i18n-chiper)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Motivation](#motivation)
- [Requirements](#requirements)
- [Usage](#usage)
    - [Install](#install)
    - [Module Initialization](#module-initialization)
    - [Filter](#filter)


# Description
This nestjs module offers a simple way to use some functionalities from the [i18n-chiper](https://github.com/chiper-inc/nestjs-i18n-chiper).

# Motivation
As team we need to translate our application in different languages, that code is always the same, so that's we wrote this module to make it easier to translate our application.

# Requirements
1. Nodejs LTS.
2. Have nestjs project.

# Usage
## Install
`npm i nestjs-i18n-chiper -S -E`

OR

`yarn add nestjs-i18n-chiper`

## Module Initialization
Import and add `I18nChiperModule` it to the imports array of module for which you would like to discover handlers. It may make sense for your application to do this in a shared module or to re-export it so it can be used across modules more easily.
You can check this [docs](https://docs.nestjs.com/modules) in order to get more information about modules.

For example, we're using `I18nChiperModule` in `src/app.module.ts`:

```typescript
@Module({
  imports: [
    // i18n chiper module
    I18nChiperModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          i18nLocalesBaseUrl: configService.get<string>(
            'config.i18n.localesUrl',
          ),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

## Filter
The other important aspect it's the custom implementation of a filter, in favor of the translation of the error messages.

You can check this [docs](https://docs.nestjs.com/exception-filters) in order to get more information about guards.

For example we wrote a custom filter called `HttpExceptionFilter`:

```typescript
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { I18nChiperService } from 'nestjs-i18n-chiper';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  constructor(private readonly i18nService: I18nChiperService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const httpException =
      typeof exceptionResponse === 'string'
        ? {
            message: exceptionResponse,
          }
        : (exceptionResponse as any);

    if (httpException.key) {
      httpException.message = this.i18nService.translate({
        defaultTranslation: httpException.defaultMessage,
        key: httpException.key,
        options: httpException.args,
      });
    }

    response.status(statusCode);
    response.send({
      error: exception.name,
      statusCode: statusCode,
      defaultMessage: httpException.defaultMessage,
      message: httpException.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      key: httpException.key || 'common.error',
      args: httpException.args || {},
    });
  }
}

```