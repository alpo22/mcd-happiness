# Overview

Simple app that visualizes the "Self-reported life satisfaction" ratings by country since 2011. Click on a country to see more information about that country's ratings. You can run the app locally, or view it here: https://alpo22.github.io/mcd-happiness

# Local development

```
npm i
npm run dev
```

# Deploying

App is hosted on GitHub Pages: https://alpo22.github.io/mcd-happiness and sometimes the deployment takes up to five minutes to appear online. To deploy it, run:

```
npm run deploy
```

# Project architecture

The notable architecture includes:

- `react`
- `typescript`
- `vite`
- `react-router`
- `antd`

GitHub pages allows for easily deploying with a single command.

# Data Flow and State Management

The app is simple and the component structure is shallow, so I simply manage state in the root and pass data down as props. There's no prop-drilling so no need for anything like `useContext`. Similarly, using a state management library like Redux would be overkill, though it could reduce the number of child component re-renders.

I chose to store the formatted data in a `Map` data structure as I liked the idea of easily accessing the data using `year` as the `key`, but this led to lots of added complexity for sorting and looping over the `Map`. If I had to do it again I would use something simple like: `[ {year: 2000, data: { 'AF': 5.320, 'AB': 6.055 }}, ... ]` and use `immer` to easily manipulate the objects in state.

# UX

- Slider is more interesting than a dropdown and can be used with keyboard navigation. It's colour is not used in the map and aligns with colour of line chart in the Drawer
- Map is responsive to fit width of screen
- I should have added a legend for the Map colours
- Used a Drawer instead of a new page as more visual interest
- Drawer closes when press `esc` key or `onBlur`
- Add country code to URL when click on a country in the map. You can share that link and the Drawer will open with that country's information, e.g. http://localhost:5173/mcd-happiness/CA (note: doesn't work on GitHub Pages, unfortunately)
- Added flag of active country in Drawer
- Drawer gracefully handles trying to access an invalid country code, e.g. http://localhost:5173/mcd-happiness/XX
- I didn't add any CSS frameworks like TailWind or Bootstrap

# Scalability

The app is broken down into logical components, making it easier for others to understand (hopefully) and modify.

Functions and variable names are descriptive in an effort to make the code self-documenting, and not require comments (that need to be maintained).

It uses popular libraries like `antd` and `react-router` which keeps the learning curve small.

One possible bottleneck of the app is that it sorts the dataset in order to determine a country's rank compared to other countries. As more years of data are added, this could have performance ramifications. Instead the rank could be determined by looping over the data once and incrementing a counter each time another country's score is higher than this country's score.

# Production readiness check

Confirm the code:

- [ ] meets requirements
- [ ] is commented or self-commenting
- [ ] meets company standards (linting and prettier)
- [ ] includes a README
- [ ] includes good test coverage (and they all pass)
- [ ] runs on major browsers (and mobile if necessary)
- [ ] has good performance/not sluggish, even if add more data
- [ ] includes analytics/metrics (e.g. Pendo, Google Analytics)
- [ ] includes error tracking package (e.g. Sentry, DataDog)
- [ ] fails gracefully

# TODOs

- make it mobile friendly (slider width, line graph width in Drawer)
- add tests
- add a legend, extract the colours from helpers.ts::getStyle()
- add a Spinner instead of the text "Loading..."
- textured colours in Map for a11y
- when click on a country, could store the info instead of recalculating it each time
- lazy load sidepanel chunks
- hardcode the country codes and full names instead of deriving them
- sharing a link with a country code doesn't work on Github hosting (they arent redirecting request to index.html)
- make slider responsive
- use a map that is keyboard accessible

# Citations

“Data Page: Self-reported life satisfaction”, part of the following publication: Esteban Ortiz-Ospina and Max Roser (2017) - “Happiness and Life Satisfaction”. Data adapted from World Happiness Report. Retrieved from https://ourworldindata.org/grapher/happiness-cantril-ladder [online resource]
