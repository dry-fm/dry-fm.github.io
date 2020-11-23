/**
 * Retro Terminal Effect
 * (C) 2020 by Frank Winter. All rights reserved.
 */

class Terminal {
	constructor(domId) {
		this.outerDomElement = document.getElementById(domId)
		this.innerDomElement = document.createElement('span')
		this.outerDomElement.appendChild(this.innerDomElement)

		this.printSpeed = 20
		this.printSpeedSpace = 100
	}

	sleep(milliseconds) {
		return new Promise((resolve) => setTimeout(resolve, milliseconds))
	}

	async clear() {
		this.innerDomElement.innerText = ''
	}

	async print(text, markup = false) {
		if (markup) {
			this.innerDomElement.insertAdjacentHTML('beforeend', text)
			this.outerDomElement.scrollTop = this.outerDomElement.scrollHeight
		} else {
			for (let c of text) {
				await this.sleep(
					(c == ' ') | (c == '\n') ? this.printSpeedSpace : this.printSpeed
				)
				this.innerDomElement.insertAdjacentHTML(
					'beforeend',
					c == '\n' ? '<br />' : c
				)
				this.outerDomElement.scrollTop = this.outerDomElement.scrollHeight
			}
		}
	}

	async println(text = '') {
		await this.print(text + '\n')
	}

	async printLink(text, key, callback) {
		let aTag = document.createElement('a')
		aTag.addEventListener('click', callback)
		aTag.innerText = text
		document.addEventListener('keypress', (e) => {
			if (e.key == key) {
				callback(e)
			}
		})
		this.innerDomElement.appendChild(aTag)
	}
}
