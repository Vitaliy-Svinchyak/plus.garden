#!/usr/bin/env node

var GardenCli = function (options) {

    const merge = require('merge')

    const def = {
        root_dir: process.cwd(),
    }

    options = options || {}

    merge(this, def, options)

    this.run = async function () {

        const commander = require('commander')
        const Garden = require('./Garden')
        commander.version(require(Garden.getDir() + '/package.json').version).
            option('-e, --env <name>', 'environment: test, dev, ...').
            option('-d, --debug', 'debug mode')

        commander.parse(process.argv)

        var garden = new Garden(this.root_dir, commander.env || 'test')

        // define commander as a service
        garden.set('Commander', commander)
        garden.set('GardenCli', this)

        await garden.init()

        // run commands
        commander.parse(process.argv)

        // show help
        if (!commander.args.length)
            commander.help()

    }
}

GardenCli.Garden = require('./Garden')

module.exports = GardenCli
