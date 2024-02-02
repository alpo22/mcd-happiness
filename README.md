# Overview

Simple app that visualizes the "Self-reported life satisfaction" ratings by country since 2011. Use the slider to change the active year, or click on a country to see more information about that country's ratings.

You can run the app locally, or view it here: https://alpo22.github.io/mcd-happiness

# Local development

```
npm i
npm run dev
```

# Deploying

To deploy your code, run:

```
npm run deploy
```

Note that deployment sometimes takes a few minutes to appear online.

# Project architecture

The notable architecture includes:

- `react`
- `typescript`
- `vite`
- `react-router`
- `antd`

# Data Flow and State Management

The app is simple and the component structure is shallow, so I simply manage state in the root and pass data down as props. There's no prop-drilling so no need for anything like `useContext`. Similarly, using a state management library like `Redux` would be overkill.

I chose to store the formatted data in a `Map` data structure as I liked the idea of easily accessing the data using `year` as the `key`, but this led to lots of added complexity for sorting and looping over the `Map`. If I had to do it again I would use something simple like: `[ {year: 2000, data: { 'AF': 5.320, 'AB': 6.055 }}, ... ]` and use `immerjs` to easily manipulate the objects in state.

# UX

- Slider is more interesting than a dropdown and can be used with keyboard navigation. It's colour is not used in the WorldMap and aligns with colour of line chart in the Drawer
- WorldMap is responsive to fit width of screen
- Used a Drawer instead of a new page as it helps the user maintain context (with the main app still visible in the background); plus the animation adds more visual interest
- Drawer closes when press `esc` key or `onBlur`
- Add country code to URL when click on a country in the WorldMap. You can share that link and the Drawer will open with that country's information, e.g. http://localhost:5173/mcd-happiness/CA (note: doesn't work on GitHub Pages, unfortunately)
- Added flag of active country in Drawer for more visual interest
- Drawer gracefully handles trying to access an invalid country code, e.g. http://localhost:5173/mcd-happiness/XX

# Scalability

The app is broken down into logical components, making it easier for others to understand and modify.

Functions and variable names are descriptive in an effort to make the code self-documenting, and not require comments (that need to be maintained).

It uses popular libraries like `antd` and `react-router` which keeps the learning curve small.

One possible bottleneck of the app is that it sorts the dataset in order to determine a country's rank compared to other countries. As more years of data are added, this could have performance ramifications. Instead or sorting, the rank could be determined by looping over the data once and tracking the number of higher scores.

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
- add a legend, extract the colours from `helpers.ts::getStyle()`
- add a Spinner instead of the text "Loading..."
- textured colours in WorldMap for a11y
- when click on a country, could store the info instead of recalculating it each time
- lazy load sidepanel chunks
- hardcode the country codes and full names instead of deriving them
- sharing a link with a country code doesn't work on Github hosting (they arent redirecting request to index.html)
- make slider responsive
- use a WorldMap that is keyboard accessible

# Citations

“Data Page: Self-reported life satisfaction”, part of the following publication: Esteban Ortiz-Ospina and Max Roser (2017) - “Happiness and Life Satisfaction”. Data adapted from World Happiness Report. Retrieved from https://ourworldindata.org/grapher/happiness-cantril-ladder [online resource]
