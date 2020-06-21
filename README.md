# choose-life-backend

The graphql backend for the choose life web app

## How to set the project up

- Clone the project

```sh
  git clone git@github.com:Ibdevs/choose-life-backend.git
```

OR

```sh
  git clone https://github.com/Ibdevs/choose-life-backend.git
```

- Set up the environment variables and keys. Duplicate the `variables.env.sample` into `variables.env`.

- Install the dependencies. Make sure you have mongodb install on your local machine to setup the seed data for the database.

```sh
  npm install
  npm run seed // to setup the seed data
  npm run blowitaway // to remove the seed data
```

- Start the server by running `npm run start`.
