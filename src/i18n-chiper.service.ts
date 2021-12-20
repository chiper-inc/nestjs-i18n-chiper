import { Inject, Injectable, Logger } from '@nestjs/common';
import { TFunction } from 'i18next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18next = require('i18next');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18nextHttpBackend = require('i18next-http-backend');

import { I18N_CHIPER_CONFIG_TOKEN } from './i18n-chiper.constants';

import { I18nChiperOptions } from './i18n-chiper.interfaces';

import { TranslateInput } from './dto/translate.input.dto';

@Injectable()
export class I18nChiperService {
  private tFunction: TFunction;

  constructor(
    @Inject(I18N_CHIPER_CONFIG_TOKEN)
    private readonly options: I18nChiperOptions,
  ) {
    this.init();
  }

  private async init() {
    const { i18nLocalesBaseUrl, namespaces, defaultNamespace } = this.options;

    const t = await i18next.use(i18nextHttpBackend).init({
      fallbackLng: 'es-CO',
      preload: ['pt-BR', 'es-CO', 'es-MX'],
      ns: namespaces || ['translations'],
      defaultNS: defaultNamespace || 'translations',
      backend: {
        loadPath: `${i18nLocalesBaseUrl}{{lng}}/{{ns}}.json`,
      },
    });

    this.tFunction = t;
  }

  public translate(input: TranslateInput): string {
    const { key, defaultTranslation, options } = input;

    const translation = this.tFunction(key, {
      lng: 'es-CO',
      ...options,
    });

    if (translation === key) {
      Logger.warn(
        `Translation not found for key: ${key}`,
        I18nChiperService.name,
      );
      return defaultTranslation;
    }

    return translation;
  }
}
