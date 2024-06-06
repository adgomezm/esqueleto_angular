export const IRMScheduler = {
  Schedules: new Map<string, NodeJS.Timeout>(),
  Schedule: (identifier: string, fn: () => void, secondsInterval: number): void => {
    if (IRMScheduler.Schedules.get(identifier) != null)
      IRMScheduler.Stop(identifier)
    console.debug('Initialising scheduler ' + identifier + ' every ' + secondsInterval + ' seconds.')
    IRMScheduler.Schedules.set(identifier, setInterval(() => {
      console.debug("Executing " + identifier + ' scheduled every ' + secondsInterval + ' seconds.')
      fn()
    }, secondsInterval * 1000))
  },
  Stop: (identifier?: string) => {
    if (identifier == undefined) {
      for (const i in IRMScheduler.Schedules) {
        IRMScheduler.Stop(i)
      }
    } else {
      console.debug("Finishing scheduler " + identifier)
      clearInterval(IRMScheduler.Schedules.get(identifier))
      IRMScheduler.Schedules.delete(identifier)
    }
  }
}