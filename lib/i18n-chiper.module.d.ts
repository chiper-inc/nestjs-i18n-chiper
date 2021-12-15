import { DynamicModule } from '@nestjs/common';
import { I18nChiperOptions, I18nChiperAsyncOptions } from './i18n-chiper.interfaces';
export declare class I18nChiperModule {
    static register(options: I18nChiperOptions): DynamicModule;
    static registerAsync(options: I18nChiperAsyncOptions): DynamicModule;
    private static createProviders;
    private static createOptionsProvider;
}
