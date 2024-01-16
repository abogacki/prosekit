import type { DevToolbarApp } from 'astro'

import { setDarkMode } from './set-dark-mode'

const astroDarkModeToolbarApp: DevToolbarApp = {
  id: 'astro-dark-mode-toolbar-app',
  name: 'Dark Mode',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"/></svg>',
  init(canvas, eventTarget) {
    eventTarget.addEventListener('app-toggled', (event: Event) => {
      const state: boolean = (event as CustomEvent).detail.state
      setDarkMode(!!state)
    })
  },
}

export default astroDarkModeToolbarApp
