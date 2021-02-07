const zerorpc = require("zerorpc")
let client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:4242")

let input = document.querySelector('#input')
let output = document.querySelector('#output')
input.addEventListener('input', () => {
	client.invoke('echo', input.value, (error, res) => {
		if(error) {
			console.error(error)
		} else {
			output.textContent = res
		}
	})
})
input.dispatchEvent(new Event('input'))
