import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    invoices: []
  }),
  actions: {
    setUser(u) { this.user = u },
    addInvoice(inv) { this.invoices.push(inv) }
  }
})
