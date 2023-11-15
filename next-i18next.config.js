const HttpBackend = require('i18next-http-backend/cjs');
const ChainedBackend = require('i18next-chained-backend').default;
const LocalStorageBackend = require('i18next-localstorage-backend').default;

module.exports = {
    debug: process.env.NODE_ENV === 'development',
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    i18n: {
        defaultLocale: 'de', // the default language
        locales: ['de', 'en', 'simpleDe'], // language list
    },
    backend: {
        backendOptions: [
            { loadPath: '/locales/{{lng}}/{{ns}}.json' },
        ],
        backends:
            typeof window !== 'undefined'
                ? [HttpBackend]
                : [],
    },
    react: {
        bindI18n: 'languageChanged loaded',
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'ul', 'li']
    },
    serializeConfig: false,
    use: typeof window !== 'undefined' ? [ChainedBackend] : [],
};
