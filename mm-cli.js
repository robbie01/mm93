const { wrap } = require('cli')

const delay = ms => new Promise(res => setTimeout(res, ms))

const readLine = cli => new Promise(res => cli.online = res)
console.log(window)
const cmds = {
  'help': async cli => {
    cli.log(`Windows 93 Module Manager Help Screen
mm help: this screen
mm load &lt;name&gt; &lt;module-url&gt;
mm unload &lt;name&gt;
mm reload &lt;name&gt;`)
  },
  'load': async (cli, [name, url]) => {
    await SystemJS.import(url).then(m => {
      le._apps[name] = m.leApp
      le._apps[name].secretMmURL = url
    })
  },
  'unload': async (cli, [name]) => {
    SystemJS.registry.delete(le._apps[name].secretMmURL)
    delete le._apps[name]
  },
  'reload': async (cli, [name]) => {
    SystemJS.registry.delete(le._apps[name].secretMmURL)
    var url = le._apps[name].secretMmURL
    delete le._apps[name]
    await SystemJS.import(url).then(m => {
      le._apps[name] = m.leApp
      le._apps[name].secretMmURL = url
    })
  }
}

const app = async cli => {
  const argv = cli.arg.arguments
  if (argv.length < 1) {
    cli.log('usage: mm &lt;subcommand&gt; ...')
    cli.log('see mm help for more info')
    return
  }
  if (!(argv[0] in cmds)) {
    cli.log('bad subcommand!')
    cli.log('see mm help for more info')
    return
  }
  await cmds[argv[0]](cli, argv.slice(1))
}

exports.leApp = {
  terminal: true,
  exec: function() { wrap.call(this, app) }
}