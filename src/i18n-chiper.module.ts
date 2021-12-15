import { DynamicModule, Module, Provider } from '@nestjs/common';

import {
  I18nChiperOptions,
  I18nChiperOptionsFactory,
  I18nChiperAsyncOptions,
} from './i18n-chiper.interfaces';

import { I18N_CHIPER_CONFIG_TOKEN } from './i18n-chiper.constants';

import { I18nChiperService } from './i18n-chiper.service';

@Module({})
export class I18nChiperModule {
  public static register(options: I18nChiperOptions): DynamicModule {
    return {
      module: I18nChiperModule,
      providers: [
        I18nChiperService,
        {
          provide: I18N_CHIPER_CONFIG_TOKEN,
          useValue: options,
        },
      ],
      exports: [I18nChiperService],
    };
  }

  public static registerAsync(options: I18nChiperAsyncOptions): DynamicModule {
    return {
      module: I18nChiperModule,
      imports: options.imports || [],
      providers: [I18nChiperService, ...this.createProviders(options)],
      exports: [I18nChiperService],
    };
  }

  private static createProviders(options: I18nChiperAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: I18nChiperAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: I18N_CHIPER_CONFIG_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: I18N_CHIPER_CONFIG_TOKEN,
      useFactory: async (optionsFactory: I18nChiperOptionsFactory) =>
        await optionsFactory.createOptions(),
      inject: [options.useClass],
    };
  }
}
