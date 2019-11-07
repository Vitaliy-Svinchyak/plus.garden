/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

const FixtureLoader = function (container, logger) {

    this.load = async function (tags) {
        for (const loader of this.loaders(tags)) {
            await loader.load()
        }
    }

    this.drop = async function (tags) {
        for (const loader of this.loaders(tags)) {
            await loader.drop()
        }
    }

    this.reload = async function (tags) {
        await this.drop(tags)
        await this.load(tags)
    }

    this.loaders = function (tags) {
        tags = tags || ['garden.js', 'fixtures', 'loader']
        const loaders = container.find(tags)

        if (loaders.length == 0) {
            logger.warn('fixture loader module not found')
            logger.info(
                'Visit https://github.com/linkshare/plus.garden/blob/master/docs/modules.md to get necessary module')
        }

        return loaders
    }

}

module.exports = FixtureLoader
module.exports.$inject = ['container', 'Logger']
