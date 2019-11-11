/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

var child_process = require('child_process');
var exec = child_process.exec;

var Command = function (dir, env, replacement, commander) {

    var utils = require('./Utils');

    this.replacement = replacement || {};
    this.env = env || 'test';
    this.dir = dir;

    this.quoteCommand = function (cmd) {
        return cmd.replace('"', '\"');
    }

    this.quote = function (name) {
        return utils.escape(name);
    }

    this.prepare = function (cmd) {
        for (var name in this.replacement) {
            var re = new RegExp(this.quote(name), 'g');
            cmd = cmd.replace(re, replacement[name]);
        }

        return cmd;
    }

    this.run = function (command, next) {
        let cmd = 'NODE_ENV=' + this.env + ' ' + this.prepareOptions() + command

        const child = exec(this.prepare(cmd), {cwd: this.dir, maxBuffer: 50000 * 1024}, function (err) {
            if (err) {
                return process.exit(err.code)
            }
            if (!next) {
                return process.exit(0)
            }

            next(err)
        })

        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
        child.stdin.pipe(process.stdin)
    }

    this.prepareOptions = function () {
        var options = '';
        Object.keys(commander).map(function(name, index) {
            var value = commander[name];
            if (false === utils.isObject(value)) {
                options += ' NODE_CONFIG__GARDEN_CLI__'+ name +'='+ value;
            }
        });
        return options + ' ';
    }

};

module.exports = Command;
