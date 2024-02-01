# mcd-happiness

Visualization of world happiness index

# Local dev

```
npm i
npm run dev
```

# Deploying

App is hosted on...?
Pushing to main will deploy to production.

# TODO:

- a great readme
- at least one test?
- host it somewhere free

# CITATIONS

“Data Page: Self-reported life satisfaction”, part of the following publication: Esteban Ortiz-Ospina and Max Roser (2017) - “Happiness and Life Satisfaction”. Data adapted from World Happiness Report. Retrieved from https://ourworldindata.org/grapher/happiness-cantril-ladder [online resource]

/\*
TODO: click on a country:

- changes url
- drills into its data (maybe a sidepanel, or a takeover)
- handle invalid url
  TODO: fix all the typescript errors
  TODO: it is gettind data locally. use api. put it somewhere where it wont complain about too many requests.
  TODO: make it look a little nicer
  TODO: fancier loading state
  TODO: deploy it somewhere

- caching, optimizing (am i using proper react hooks?)

decisions:
map vs set vs object vs array
some years are missing for some countries

what do when click on a country (sidepanel vs takeover vs new page)

what to put in url (country, year)

responsiveness

which drawer (accessible vs light)

how store data (by year or by country). went by year so could easily get min/max/rating
\*/
