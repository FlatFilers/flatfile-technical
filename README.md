# Flatfile Technical Take-home

Welcome to the Flatfile Technical Challenge!

This challenge is based around a [Trello](https://trello.com/en-US) clone. It involves adding features, finding bugs, and putting up a PR. The front-end is written in [React](https://reactjs.org/), the server in [NestJS](https://nestjs.com/), and the database is [Postgres](https://www.postgresql.org/).

At Flatfile we [value work/life balance](https://flatfile.io/careers/). This assessment is not timed and we don't expect you to design a production ready application. We're more interested in your approach, so don't get too caught up on how much time you're taking. Have fun with it! Beyond being fun we also want this challenge to be informative, realistic, and well defined. For these reasons feedback is very much welcomed.

:warning: Before starting, fork this repository to your personal Github or Gitlab account.

## Setup

### Prerequisites

[Docker version 20](https://www.docker.com/products/docker-desktop) is the supported platform for interacting with this challenge. If you aren't comfortable running Docker it will not be held against you and it is acceptable to run the application natively.

[NodeJS](https://nodejs.org/en/download/) is suggested but not required.

### Start the application

To start the application, run the following:

```bash
docker compose up -d
```

To view the application logs, run the following:

```bash
docker compose logs -f
```

The web application is serving off of [http://localhost:3000](http://localhost:3000)

The API server is serving off of [http://localhost:3001](http://localhost:3001)

### Run tests with coverage

To determine coverage for both the client and server, run:

```bash
npm test -- --coverage
```

...in the respective directories.

### Run Prettier

To run prettier against application code for both the client and server, run:

```bash
npm run lint:prettier:fix
```

...in the respective directories.

### Create a migration

From the `server` directory, run the following to create a new migration script:

```bash
npm run migration:create NameOfTheMigration
```

### Run a migration

From the `server` directory, run the following to run all migrations:

```bash
npm run migration
```

## Instructions

1. Fork this repository to your personal Github or Gitlab account
2. Complete one of the features listed below.
3. Identify bugs and inefficiencies
4. Once complete, open up a PR

You may utilize a third-party library, though it isn't required to do so.

After you complete and submit your take home there will be a follow-up, in personal technical interview where you will present your PR. This is an informal and conversational style presentation where you can talk through your thoughts and we can ask you additional questions. We keep an extra 10 minutes open at the end for you to ask us questions about Flatfile, so have a list ready if you have unanswered questions.

### Requirements

All commits and branches must follow the [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/#summary) standard.


### Feature 1 - Card navigation

#### Description

A card can be moved to another section. 
Options for this could include: 
- Dragged and dropped from one section to another
- Selected and moved to another selection via a next/previous button or 
- A way to move to another section via dropdown menu.

#### Acceptance Criteria

- A card can be dragged and dropped from one section to another
- A card can be selected then pushed to another section

### Feature 2 - Card details

#### Description

A card has a detailed view that contains a title, description, and images. This will be shown when the card is clicked in either a modal or an expanded view.

#### Acceptance Criteria

- A card's details can be opened in a modal/expanded view
- A card's modal/expanded view contains editable fields (details)
  - Title
  - Description
  - Assignee
  - URL Link
