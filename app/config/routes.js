module.exports = function (garden) {

    const commander = garden.get('Commander')

    // show info
    garden.get('CommanderInfo').printInput()

    // fixtures
    commander
        .command('fixtures.load')
        .description('load all fixtures')
        .action(async function () {
            await garden.get('FixtureLoader').reload()
            process.exit(0)
        });

    commander
        .command('fixtures.drop')
        .description('drop all fixtures')
        .action(async function () {
            await garden.get('FixtureLoader').drop()
            process.exit(0)
        })

    // tests
    commander.option('-l, --list', 'show list of tests')
    commander.option('-t, --tags [name]', 'use tags. ex.: --tags @tag-name')
    commander.option('-f, --format [name]', 'to specify the format of the output. ex.: --format pretty')
    commander.option('-r, --rerun [name]',
        'rerun failed tests which were written into the file [name], by default @rerun.txt. ex.: --rerun [name]')
    commander.option('-b, --browser [name]', 'webdriver browser name, ex: --browser chrome')
    commander.option('--require [dir]', 'cucumber require option (custom world dir), ex: --require api')

    commander
        .command('test [name]')
        .description('run functional test/tests')
        .action(async function (name) {
            await garden.get('CommandFunctionalTest').run(name)
            process.exit(0)
        })
}
