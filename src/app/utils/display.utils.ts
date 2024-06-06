export const flag = (country: string): string => {
  if(country.toLocaleLowerCase() === 'spain')
    return 'fi-es'
  return ''
}