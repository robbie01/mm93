(function() {
    var cli = {
      wrap: async function(f) {
        var originalPrompt = this.cli.prompt.innerHTML
        try  {
          this.cli.prompt.innerHTML = ''
          this.cli.onenter = l => false
          var cli = this.cli
          var lastLog = $log('')
          await f({
              log: (...args) => {
                  var newLog = $log(...args)
                  newLog.parentElement.insertBefore(newLog, lastLog.nextSibling)
                  lastLog = newLog
                },
                set online(f) {
                cli.onenter = l => { f(l); return false }
              },
              set prompt(p) { cli.prompt.innerHTML = p },
                arg: this.arg
            })
        } finally {
          this.cli.prompt.innerHTML = originalPrompt
          this.cli.onenter = ()=>{}
        }
      }
    }
    $loader.script('https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.21.4/system.js').then(() => {
      SystemJS.registry.set('cli', SystemJS.newModule(cli))
      SystemJS.import('https://rawgit.com/robbie0630/mm93/master/mm-cli.js').then(m => le._apps.mm = m.leApp)
    })
  })()