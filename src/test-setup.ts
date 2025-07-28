import { createPinia } from 'pinia'
import { setActivePinia } from 'pinia'

const pinia = createPinia()
setActivePinia(pinia)