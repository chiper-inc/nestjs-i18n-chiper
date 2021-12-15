"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var I18nChiperModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nChiperModule = void 0;
const common_1 = require("@nestjs/common");
const i18n_chiper_constants_1 = require("./i18n-chiper.constants");
const i18n_chiper_service_1 = require("./i18n-chiper.service");
let I18nChiperModule = I18nChiperModule_1 = class I18nChiperModule {
    static register(options) {
        return {
            module: I18nChiperModule_1,
            providers: [
                i18n_chiper_service_1.I18nChiperService,
                {
                    provide: i18n_chiper_constants_1.I18N_CHIPER_CONFIG_TOKEN,
                    useValue: options,
                },
            ],
            exports: [i18n_chiper_service_1.I18nChiperService],
        };
    }
    static registerAsync(options) {
        return {
            module: I18nChiperModule_1,
            imports: options.imports || [],
            providers: [i18n_chiper_service_1.I18nChiperService, ...this.createProviders(options)],
            exports: [i18n_chiper_service_1.I18nChiperService],
        };
    }
    static createProviders(options) {
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
    static createOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: i18n_chiper_constants_1.I18N_CHIPER_CONFIG_TOKEN,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: i18n_chiper_constants_1.I18N_CHIPER_CONFIG_TOKEN,
            useFactory: async (optionsFactory) => await optionsFactory.createOptions(),
            inject: [options.useClass],
        };
    }
};
I18nChiperModule = I18nChiperModule_1 = __decorate([
    (0, common_1.Module)({})
], I18nChiperModule);
exports.I18nChiperModule = I18nChiperModule;
//# sourceMappingURL=i18n-chiper.module.js.map