TODO: it is getting data locally. use api. put it somewhere where it wont complain about too many requests.
TODO: deploy it somewhere
TODO: improve the readme

- caching, optimizing (am i using proper react hooks?)

decisions:
map vs set vs object vs array
some years are missing for some countries (e.g. Central African republic)

what do when click on a country (sidepanel vs takeover vs new page)

what to put in url (country, year)

responsiveness

which drawer (accessible vs light)

how store data (by year or by country). went by year so could easily get min/max/rating

# mcd-happiness

Visualization of "Self-reported life satisfaction" by country since 2011.

# Local dev

```
npm i
npm run dev
```

# Deploying

App is hosted on GitHub pages: https://alpo22.github.io/mcd-happiness
To deploy it, run:

```
npm run deploy
```

# Citations

“Data Page: Self-reported life satisfaction”, part of the following publication: Esteban Ortiz-Ospina and Max Roser (2017) - “Happiness and Life Satisfaction”. Data adapted from World Happiness Report. Retrieved from https://ourworldindata.org/grapher/happiness-cantril-ladder [online resource]
