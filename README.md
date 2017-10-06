OodiTool

To run locally set up a connection to Kurki and make sure you have the .ooditconfig file, which is not in GitHub.

To build run:

npm run build

To build continuously when in development run:

npm run watch

To run in dev mode run:

npm start

Debugging is much easier when the last fetch call in client.jsx is commented out sibce then it doesn't do any changes in the db.

To run in production mode run:

npm run app

To build as an application remove the comments from .ooditconfig file on line 3 and run:

npm run dist

To test run:

npm test
