var _ = require('lodash'),
    config = require('../../config'),
    channelConfig;

channelConfig = function channelConfig() {
    var defaults = {
        index: {
            name: 'index',
            route: '/',
            frontPageTemplate: 'home'
        },
        tag: {
            name: 'tag',
            route: '/' + config.routeKeywords.tag + '/:slug/',
            postOptions: {
                filter: 'tags:\'%s\''
            },
            data: {
                tag: {
                    type: 'read',
                    resource: 'tags',
                    options: {slug: '%s'}
                }
            },
            slugTemplate: true,
            editRedirect: '/ghost/settings/tags/:slug/'
        },
        rubric: {
            name: 'rubric',
            route: '/' + config.routeKeywords.rubric + '/:slug/',
            postOptions: {
                filter: 'tags:\'rubric-%s\''
            },
            data: {
                tag: {
                    type: 'read',
                    resource: 'tags',
                    options: {slug: 'rubric-%s'}
                }
            },
            slugTemplate: true,
            editRedirect: '/ghost/settings/tags/rubric-:slug/'
        },
        author: {
            name: 'author',
            route: '/' + config.routeKeywords.author + '/:slug/',
            postOptions: {
                filter: 'author:\'%s\''
            },
            data: {
                author: {
                    type: 'read',
                    resource: 'users',
                    options: {slug: '%s'}
                }
            },
            slugTemplate: true,
            editRedirect: '/ghost/team/:slug/'
        }
    };

    return defaults;
};

module.exports.list = function list() {
    return channelConfig();
};

module.exports.get = function get(name) {
    return _.cloneDeep(channelConfig()[name]);
};
