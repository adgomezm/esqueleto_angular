import { tata } from '../../assets/js/tata.js'

const nothing: () => void = () => undefined
export const notification = {
  //#region Toasts
  Toast: {
    
    Text: (message: string, onClick = nothing, closeBtn: boolean = false): void =>
      tata.text('', message, { onClick: onClick, closeBtn: closeBtn }),

    Log: (message: string, onClick = nothing, closeBtn: boolean = false): void =>
      tata.log('', message, { onClick: onClick, closeBtn: closeBtn }),

    Info: (message: string, onClick = nothing, closeBtn: boolean = false): void =>
      tata.info('', message, { onClick: onClick, closeBtn: closeBtn }),

    Success: (message: string, onClick = nothing, closeBtn: boolean = false): void =>
      tata.success('', message, { onClick: onClick, closeBtn: closeBtn }),

    Warn: (message: string, onClick = nothing, closeBtn: boolean = false): void =>
      tata.warn('', message, { onClick: onClick, closeBtn: closeBtn }),

    Error: (message: string, onClick = nothing, closeBtn: boolean = false): void =>
      tata.error('', message, { onClick: onClick, closeBtn: closeBtn }),

  },
  //#endregion

}
