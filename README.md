<h1 align="center">
   <img src="./src/img/icon.png" alt ="logo" width="auto" height="500">
</h1>

# Screw your neighbor: frontend solution [^1]

[^1]: By group 36 of the course "Software Praktikum"@UZH in FS 22.

## Github Badges:

[![Checks](https://github.com/sopra-fs22-group-36/screw-your-neighbor-react/actions/workflows/checks.yml/badge.svg)](https://github.com/sopra-fs22-group-36/screw-your-neighbor-react/actions/workflows/checks.yml)
[![Deploy](https://github.com/sopra-fs22-group-36/screw-your-neighbor-react/actions/workflows/deploy-heroku.yml/badge.svg)](https://github.com/sopra-fs22-group-36/screw-your-neighbor-react/actions/workflows/deploy-heroku.yml)

## SonarCloud Badges:

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sopra-fs22-group-36_screw-your-neighbor-react&metric=bugs)](https://sonarcloud.io/summary/new_code?id=sopra-fs22-group-36_screw-your-neighbor-react)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sopra-fs22-group-36_screw-your-neighbor-react&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=sopra-fs22-group-36_screw-your-neighbor-react)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sopra-fs22-group-36_screw-your-neighbor-react&metric=coverage)](https://sonarcloud.io/summary/new_code?id=sopra-fs22-group-36_screw-your-neighbor-react)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sopra-fs22-group-36_screw-your-neighbor-react&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=sopra-fs22-group-36_screw-your-neighbor-react)

## Introduction
We are developing an online version of the world famous card game "Härdöpfle" also known as "Screw your neighbour" played with the 36 Swiss "Jasskarten". Main feature are
implemented as well as the stack rule and the special round with only one card. The game is made for 2 to 5 players. 

## Technologies
These are the main technologies we used: 

![react](doc/img/react.png)
![matrial ui](doc/img/mi.png)
![MobX](doc/img/mobx.png)
![Typescript](doc/img/tsx.png)

![prettier and linter](doc/img/eslint.png)
![npm](doc/img/npm.png)

## High-level components

### Components

* [Views](src/components/views)  
Here are the different views of the application. Components only used in these views reside in the folder
of corresponding view.
* Requests to the Api  
The DOM and the classes to send requests to the api are generated with `openapi-typescript-codegen`.
How the DOM looks and what operations are possible is described in
[screw-your-neighbor-server-openapi.json](screw-your-neighbor-server-openapi.json).
The corresponding classes are generated into the src/generated folder. How they should be used is described in the
"State Management" chapter.

* State Management  
The state of the application is saved in the [stores](src/stores).
For more information, read the State Management Chapter.

### State Management

This app uses [MobX](https://github.com/mobxjs/mobx) as state management.  
The api is provided in [api.ts](src/api/api.ts), but then wrapped with the hook [useApi()](src/hooks/api/useApi.ts)
to provide global error handling and to display the [ApiErrorSnackBar](src/components/ui/ApiErrorSnackBar.tsx).  
The error message to show is stored in the [AppStore](src/stores/AppStore.ts) which also contains all other stores.  
The AppStore is provided via the [useContext()](https://reactjs.org/docs/hooks-reference.html#usecontext)
hook mechanism in [AppContext](src/AppContext.tsx).
The [PlayerStore](src/stores/PlayerStore.ts) stores your own player and the list of players in the lobby.

The stores and the api should not be used directly in the components,
but wrapped together with api calls in custom hooks like in [usePlayers()](src/hooks/api/usePlayers.ts).

If you want to use values from the store, don't forget to wrap your component in an observer(), like shown
in [Lobby](src/components/views/lobby/Lobby.tsx).

## Launch & Deployment

### Launch

This is just the frontend.
To get started, you also need the backend from [screw-your-neighbor-server](../screw-your-neighbor-server)
You find all scripts in [package.json](package.json).
To get started, run:  

```
npm ci
npm run openapi-generate
npm run start
```

If you are using windows, you may have to check some settings.
See the steps with the condition `runner.os == 'Windows'` in [checks.yml](.github/workflows/checks.yml).

Tests can be run with:

```
npm run test
```

### Deployment

This project has a heroku deployment setup. Required are the following repository secrets:
```yaml
      HEROKU_KEY: ${{ secrets.HEROKU_API_KEY }}
      HEROKU_EMAIL: ${{ secrets.HEROKU_EMAIL }}
      HEROKU_APP_NAME: ${{ secrets.HEROKU_APP_NAME }}
```
Then every merge on main with passing status checks gets deployed on the configured heroku (if available).

### Generate the classes of the api:

`npm run openapi-generate`

### Update the classes of the api:

Add the properties you need to  [screw-your-neighbor-server-openapi.json](screw-your-neighbor-server-openapi.json)

Then run again `npm run openapi-generate`

### Jitsi API
We implemented the Jitsi API into our game to give the players an option to video chat and 
to fulfill the requirements given to us by the SoPra Team.


## Illustrations

### Lobby & Room

### Game announcing round

### Game playing

### Winner :tada: / Looser :screwdriver::facepalm: page 

## Roadmap
### Top features to contribute
- Clear visualisation who's turn is right now
- Create your own avatar 
- Choose backside image for cards
- Change frontend to socket.io solution 
- Add soundeffects & potentially music

## Contributors
The "Screw your neighbor" application was developed in context of the SoPra (Software Praktikum / Software Engineerin Lab) module at the Institut für Informatik at the University of Zurich by Lucius Bachmann, Beat Furrer, Carmen Kirchdorfer, Moris Camporesi and Salome Wildermuth.

Any new contributors are welcome to contribute to our Screw-your-neighbor-family. Please don't hesitate to open a PR or an issue if there's something that needs improvement or if you want to help with implementing one of our roadmap features!


## License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE.txt) for more information.
