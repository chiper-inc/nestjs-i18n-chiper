import { ModuleMetadata, Type } from '@nestjs/common';

export interface I18nChiperOptions {
  i18nLocalesBaseUrl: string;
}

export interface I18nChiperOptionsFactory {
  createOptions(): Promise<I18nChiperOptions> | I18nChiperOptions;
}

export interface I18nChiperAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<I18nChiperOptionsFactory>;
  useClass?: Type<I18nChiperOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<I18nChiperOptions> | I18nChiperOptions;
  inject?: any[];
}
