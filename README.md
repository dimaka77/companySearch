# Company Search

By [Dmitriy Romanenko](mailto:dimaka77@gmail.com)


## Prerequisites

1. yarn v1.13.0 [yarnpkg.com](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
2. node v8.12.0 [nodejs.org](https://nodejs.org/download/release/v8.12.0/)


## Instructions

1. Navigate to [repo](https://github.com/dimaka77/companySearch)
2. Clone locally using `git clone git@github.com:dimaka77/companySearch.git`
3. Install dependencies using `yarn install`
4. Run tests using `yarn test`
5. Run test coverage `yarn test -- --coverage`
6. Start your server using `yarn start`
7. Navigate to app in [browser@localhost:3000](http://localhost:3000)
8. Enjoy!


## Discussion

I used the following technologies: HTML, CSS, React, Redux, Immutable.js, Axios, Axios Cache, Jest.
I used [Create React App](https://github.com/facebook/create-react-app)
to generate the scaffolding for this app.


## Requirements

#### The user should be able to specify a query for any well-known company
I added a input field where user is able to type a company name as a string.
The field has an error handling for an empty strings.

#### Results come from at least 2 different third-party APIs
#### API calls are parallelized
On search execution I'm making parallel calls to 3 APIs:
1. GET - [Wikipedia summary](https://en.wikipedia.org/api/rest_v1/page/summary/${companyName})
2. GET - [Github organizations](https://api.github.com/orgs/${companyName})
3. GET - [Github organization repositories](https://api.github.com/orgs/${companyName}/repos)

When Promise resolves payload from all 3 APIs is being aggregated and normalized.

#### Results are shown to the user as they come back from the APIs
Results are displayed in multiple sections:
1. Media card section displays company basic info as well as avatar from Wikipedia API
2. Tabs section can display up to 3 tabs: Wikipedia Info, Github Info, Github Repositories



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
