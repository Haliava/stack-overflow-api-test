export type TUnescape = (source: string) => string | null
export const unescape: TUnescape = (source) => {
  return new DOMParser().parseFromString(source, 'text/html').querySelector('html')!.textContent;
}

export type TCompactize = (n: number) => string
export const compactize: TCompactize = (n) => {
  if (n >= 1000 && n < 10**6) {
    return `${Math.ceil(n / 1000)}k`
  }

  if (n >= 10**6 && n < 10**9) {
    return`${Math.ceil(n / 10**6)}m`
  }

  return String(n)
}

export type TConvertDateToString = (date: number) => string
export const convertDateToString: TConvertDateToString = (date) => {
  return (new Date(date * 1000)).toISOString().slice(0, 10).replace(/-/g, "");
}
