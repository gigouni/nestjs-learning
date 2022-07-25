<p align="center">
  <a href="https://nestjs.com" target="blank"><img src="https://seeklogo.com/images/N/nestjs-logo-09342F76C0-seeklogo.com.png" width="120" alt="NestJS Logo" /></a>
</p>

NestJS tutorials, self-taught learning, ... Starting from the bottom, now you're here.

<p align="center">
    <a href="#" target="_blank"><img src="https://camo.githubusercontent.com/8855980a487f9e31426fbfc2cbbfdda5aa3b7f1d390e262e652e639e911b3d87/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6573746a732d2532334530323334452e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6573746a73266c6f676f436f6c6f723d7768697465" alt="NestJS" /></a>
    <a href="#" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="#" target="_blank"><img src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" /></a>
    <a href="#" target="_blank"><img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="Visual Studio Code" /></a>
    <a href="#" target="_blank"><img src="https://img.shields.io/badge/Udemy-A435F0?style=for-the-badge&logo=Udemy&logoColor=white" alt="Udemy" /></a>
</p>

<!-- TOC -->

- [1. NestJS conventions](#1-nestjs-conventions)
  - [1.1. Projects structure](#11-projects-structure)
  - [1.2. Naming conventions](#12-naming-conventions)
- [2. NestJS CLI commands](#2-nestjs-cli-commands)
- [3. VS Code](#3-vs-code)
- [4. Decorators](#4-decorators)
  - [4.1. Controllers / Requests decorators](#41-controllers--requests-decorators)
- [5. Tips & notes](#5-tips--notes)
- [6. Inversion of Control Principle](#6-inversion-of-control-principle)
  - [6.1. Bad version](#61-bad-version)
  - [6.2. Better version](#62-better-version)
  - [6.3. Best version](#63-best-version)
- [7. Dependency Injection Flow](#7-dependency-injection-flow)
  - [7.1. Steps 1 & 2](#71-steps-1--2)
  - [7.2. Steps 3 & 4](#72-steps-3--4)

<!-- /TOC -->

## 1. NestJS conventions

### 1.1. Projects structure

- Pipe: help validating data in cinoming requests
- Guard: make sure the user is authenticated
- Controller: route the request to a particular function
- Service: run some business logic
- Repository: access a database
- Module: group together code
- Filter: handle errors that occur during request handling
- Interceptor: add extra logic to incoming requests or outgoing responses

### 1.2. Naming conventions

- One class per file (some exceptions)
- Class names should include the kind of thing we're creating
- Name of class and name of file should always match up
- Filename template: name.type_of_thing.ts

## 2. NestJS CLI commands

```shell
# Generate a new NestJs project boilerplate
nest new nestjs-learning

# Generate a new Module
nest g module messages

# Generate a new Controller within an existing module
# controller: type of class to generate
# messages/messages: path where to generate the new Controller
# --flat: don't create an extra folder called "controllers" [OPTIONAL]
nest g controller messages/messages --flat

# Running the app
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod

# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## 3. VS Code

Install the `humao.rest-client` extension and add a `requests.http` file in the root folder.
It allows to send requests thru VS Code and offers a kind of documentation of the existing routes of the app.

A _"Send request"_ button appears to test request.

## 4. Decorators

### 4.1. Controllers / Requests decorators

Let's use an example

```curl
POST /messages/5?validate=true HTTP/1.1

{
    "content": "hi there"
}
```

- @Param('id'): get the value of the 'id' param (aka 5 _(as a string!)_)
- @Query(): extract 'validate=true' ("Query" like "QueryString")
- @Headers(): get the headers
  - Host: localhost: 4000
  - Content-Type: application/json
- @Body: get the content of the body

## 5. Tips & notes

- Use `class-validator` to validate properties
- Use `class-transformer` to transform JSON objects into class instances
- Services VS Repositories
  - Services
    - It's a class
    - #1 place to put any business logic
    - Uses one more repositoires to find and store data
    - Target one or several repositories, add extra logic about combined data, etc...
  - Repositories
    - It's a class
    - #1 place to put storage-related logic
    - Usually ends up being a TypeORM entity, a Mongoose schema or similar
    - Target a single entity type, with basic DTO methods

## 6. Inversion of Control Principle

Classes should not create instances of its dependenies on its own.

> The following examples do not take care of the Nest Dependency Injection Container Flow yet

### 6.1. Bad version

```typescript
export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor() {
    // MessagesService __creates__ its own copy of MessagesRepository.
    this.messagesRepo = new MessagesRepository();
  }
}
```

### 6.2. Better version

```typescript
export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor(repo: MessagesRepository) {
    // MessagesService __receives__ its dependency
    // It relies on a copy of the MessagesRepository passed in parameters
    this.messagesRepo = repo;
  }
}
```

### 6.3. Best version

```typescript
interface Repository {
  findOne(id: string);
  findAll();
  create(content: string);
}

export class MessagesService {
  messagesRepo: Repository;

  constructor(repo: Repository) {
    // MessagesService __receives__ its dependency
    // It doesn't specifically require 'MessagesRepository' but any object that satisfies the interface (it could be the Messagesrepository or any other repository)
    this.messagesRepo = repo;
  }
}
```

**Why it's the best answer?**

- In Production...
  - class MessagesService // I need something taht has findOne, findAll and create method to work perfectly
  -      ^
  -      |
  - class MessagesRepository // I can help you! I write to the hard disk, so I am a little slower
- While Automated Testing...
  - class MessagesService // I need something taht has findOne, findAll and create method to work perfectly
  -      ^
  -      |
  - class FakeRepository // I can help you! I don't actually write to the hard disk, so I am run fastly!

## 7. Dependency Injection Flow

1. At stratup, register all classes with the container
2. Container will figure out what each dependency each class has
3. We then ask the container to create an instance of a class for us
4. Container creates all required dependencies and give us the instance
5. Container will hold onto the created dependency instances and reuse them if needed

### 7.1. Steps 1 & 2

Use the `Injectable` decorator on each class and add them to the modules list of providers

### 7.2. Steps 3 & 4

Happens automatically - Nest will try to create controller instances for us
