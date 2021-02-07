const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')


let mainWindow = null
const createWindow = () => {
	mainWindow = new BrowserWindow({width: 800, height: 600})
	mainWindow.loadURL(require('url').format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))
	mainWindow.webContents.openDevTools()
	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})


const PY_DIST_FOLDER = 'mnemonicdist'
const PY_FOLDER = 'mnemonic'
const PY_MODULE = 'api'

const guessPackaged = () => {
	const fullPath = path.join(__dirname, PY_DIST_FOLDER)
	return require('fs').existsSync(fullPath)
}

const getScriptPath = () => {
	if (!guessPackaged()) {
		return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py')
	}
	if (process.platform === 'win32') {
		return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + '.exe')
	}
	return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE)
}

let pyProc = null
let pyPort = null

const selectPort = () => {
	pyPort = 4242
	return pyPort
}

const createPyProc = () => {
	let port = '' + selectPort()
	let script = getScriptPath()

	console.log(port)
	console.log(script)

	if (guessPackaged()) {
		pyProc = require('child_process').execFile(script, [port], (err, stdout, stderr) => {
			console.log(stdout)
			console.log(stderr)
		})
	} else {
		pyProc = require('child_process').spawn('python', [script, port])
	}
		
	if (pyProc != null) {
		console.log('child process success')
	}
}

const exitPyProc = () => {
	pyProc.kill()
	pyProc = null
	pyPort = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)
