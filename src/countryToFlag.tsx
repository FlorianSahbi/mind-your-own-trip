function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char: string) =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      )
    : isoCode;
}

export default countryToFlag;
