(function() {
    const spinnerBraille = ['\u2807', '\u280B', '\u2819', '\u2838', '\u2834', '\u2826']
    const Spinner = class {
        constructor(cb) {
            this.cb = cb
            this.t = 0
        }
        start() {
            if (this.interval) clearInterval(this.interval)
            this.interval = setInterval(() => {
            this.cb(spinnerBraille[this.t++])
            this.t %= spinnerBraille.length
            }, 100)
        }
        stop() {
            clearInterval(this.interval)
        }
    }

    var line = $log('mm download&nbsp;')
    var text = document.createTextNode('')
    line.appendChild(text)
    var spinner = new Spinner(x => text.textContent = x)
    var req = new XMLHttpRequest()
    req.onreadystatechange = () => {
        if (req.readyState != XMLHttpRequest.DONE) return;
        spinner.stop()
        if (req.status != 200) {
            text.textContent = `failed! status: ${req.statusText}`
            return
        }
        localStorage['boot/mm.js'] = req.responseText
        text.textContent = 'finished! restart windows 93 to activate'
    }
    spinner.start()
    req.send()
})()