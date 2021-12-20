"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var I18nChiperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nChiperService = void 0;
const common_1 = require("@nestjs/common");
const i18next = require('i18next');
const i18nextHttpBackend = require('i18next-http-backend');
const i18n_chiper_constants_1 = require("./i18n-chiper.constants");
let I18nChiperService = I18nChiperService_1 = class I18nChiperService {
    constructor(options) {
        this.options = options;
        this.init();
    }
    async init() {
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
    translate(input) {
        const { key, defaultTranslation, options } = input;
        const translation = this.tFunction(key, Object.assign({ lng: 'es-CO' }, options));
        if (translation === key) {
            common_1.Logger.warn(`Translation not found for key: ${key}`, I18nChiperService_1.name);
            return defaultTranslation;
        }
        return translation;
    }
};
I18nChiperService = I18nChiperService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(i18n_chiper_constants_1.I18N_CHIPER_CONFIG_TOKEN)),
    __metadata("design:paramtypes", [Object])
], I18nChiperService);
exports.I18nChiperService = I18nChiperService;
//# sourceMappingURL=i18n-chiper.service.js.map