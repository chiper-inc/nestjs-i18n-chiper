import { I18nChiperOptions } from './i18n-chiper.interfaces';
import { TranslateInput } from './dto/translate.input.dto';
export declare class I18nChiperService {
    private readonly options;
    private tFunction;
    constructor(options: I18nChiperOptions);
    private init;
    translate(input: TranslateInput): string;
}
