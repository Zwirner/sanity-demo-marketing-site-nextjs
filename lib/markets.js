// In this format so ./next.config.js can consume them
const markets = [
  {
    flag: `🇺🇸`,
    name: `US`,
    title: `USA`,
    languages: [`en`],
  },
  {
    flag: `🇨🇦`,
    name: `CA`,
    title: `Canada`,
    languages: [`en`, `fr`],
  },
  // {
  //   flag: `🇬🇧`,
  //   name: `UK`,
  //   title: `United Kingdom`,
  //   languages: [`en`],
  // },
  // {
  //   flag: `🇮🇳`,
  //   name: `IN`,
  //   title: `India`,
  //   languages: [`en`],
  // },
  // {
  //   flag: `🇯🇵`,
  //   name: `JP`,
  //   title: `Japan`,
  //   languages: [`jp`, `en`],
  // },
]

exports.markets = markets

exports.uniqueLanguages = Array.from(
  new Set(
    markets
      .map((market) =>
        market.languages.map((language) => [language, market.name].join(`-`))
      )
      .flat()
  )
)
