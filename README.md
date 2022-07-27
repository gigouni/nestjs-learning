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

- [1. Getting started](#1-getting-started)
- [2. NestJS conventions](#2-nestjs-conventions)
  - [2.1. Projects structure](#21-projects-structure)
  - [2.2. Naming conventions](#22-naming-conventions)
- [3. NestJS CLI commands](#3-nestjs-cli-commands)
- [4. VS Code](#4-vs-code)
- [5. Decorators](#5-decorators)
  - [5.1. Controllers / Requests decorators](#51-controllers--requests-decorators)
- [6. Tips & notes](#6-tips--notes)
- [7. Inversion of Control Principle](#7-inversion-of-control-principle)
  - [7.1. Bad version](#71-bad-version)
  - [7.2. Better version](#72-better-version)
  - [7.3. Best version](#73-best-version)
- [8. Dependency Injection Flow](#8-dependency-injection-flow)
  - [8.1. Steps 1 & 2](#81-steps-1--2)
  - [8.2. Steps 3 & 4](#82-steps-3--4)
  - [8.3. Examples](#83-examples)
    - [8.3.1. Injecting an instance of service inside another instance of service](#831-injecting-an-instance-of-service-inside-another-instance-of-service)
    - [8.3.2. Injecting an entity](#832-injecting-an-entity)
- [9. Project examples](#9-project-examples)
  - [9.1. Project 1: Messages](#91-project-1-messages)
    - [9.1.1. Features](#911-features)
    - [9.1.2. Objective](#912-objective)
  - [9.2. Project 2: Computer](#92-project-2-computer)
    - [9.2.1. Features](#921-features)
    - [9.2.2. Objectives](#922-objectives)
  - [9.3. Project 3: Used Car Pricing API](#93-project-3-used-car-pricing-api)
    - [9.3.1. Features](#931-features)
    - [9.3.2. Objectives](#932-objectives)
- [10. Associations](#10-associations)
  - [10.1. One To One](#101-one-to-one)
  - [10.2. One To Many and Many To One](#102-one-to-many-and-many-to-one)
  - [10.3. Many To Many](#103-many-to-many)

<!-- /TOC -->

Credits to **Stephen Grider** & **Udemy** course: [NestJS: The Complete Developer's Guide](https://www.udemy.com/course/nestjs-the-complete-developers-guide/).

## 1. Getting started

Rename one of the `src-example-*` to `src` folder and run

```shell
npm run start:dev
```

## 2. NestJS conventions

### 2.1. Projects structure

- Pipe: help validating data in cinoming requests
- Guard: make sure the user is authenticated
- Controller: route the request to a particular function
- Service: run some business logic
- Repository: access a database
- Module: group together code
- Filter: handle errors that occur during request handling
- Interceptor: add extra logic to incoming requests or outgoing responses

### 2.2. Naming conventions

- One class per file (some exceptions)
- Class names should include the kind of thing we're creating
- Name of class and name of file should always match up
- Filename template: name.type_of_thing.ts

## 3. NestJS CLI commands

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

## 4. VS Code

Install the `humao.rest-client` extension and add a `requests.http` file in the root folder.
It allows to send requests thru VS Code and offers a kind of documentation of the existing routes of the app.

A _"Send request"_ button appears to test request.

## 5. Decorators

### 5.1. Controllers / Requests decorators

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

## 6. Tips & notes

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

## 7. Inversion of Control Principle

Classes should not create instances of its dependenies on its own.

> The following examples do not take care of the Nest Dependency Injection Container Flow yet

### 7.1. Bad version

```typescript
export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor() {
    // MessagesService __creates__ its own copy of MessagesRepository.
    this.messagesRepo = new MessagesRepository();
  }
}
```

### 7.2. Better version

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

### 7.3. Best version

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

## 8. Dependency Injection Flow

1. At stratup, register all classes with the container
2. Container will figure out what each dependency each class has
3. We then ask the container to create an instance of a class for us
4. Container creates all required dependencies and give us the instance
5. Container will hold onto the created dependency instances and reuse them if needed

### 8.1. Steps 1 & 2

Use the `Injectable` decorator on each class and add them to the modules list of providers

### 8.2. Steps 3 & 4

Happens automatically - Nest will try to create controller instances for us

### 8.3. Examples

#### 8.3.1. Injecting an instance of service inside another instance of service

Let's admit a first service `Power Service` to inject within a second service `Regulator Service`

1. Add the `@Injectable` decorator to `power.service.ts`
2. Add the `PowerService` to the `PowerModule`'s list of providers and exports
3. Add the `PowerService` to the `RegulatorModule` 's list of imports
4. Define the constructor method on `RegulatorService` and add `'PowerService'` to it

#### 8.3.2. Injecting an entity

1. Create an entity file and create a class in it thath lists all the properties that your entity will have
2. Connect the eneity to its parent module, this creates a repository!
3. Connect the entity to the root connection (`app.module.ts`)

## 9. Project examples

### 9.1. Project 1: Messages

#### 9.1.1. Features

App to read messages from a file while being able to update its content.

- Read existing messages from a JSON file (to simulate database)
- Get all existing messages from file content
- Get one message by its ID

#### 9.1.2. Objective

- Overview of a basic Nest project structure

### 9.2. Project 2: Computer

#### 9.2.1. Features

- Get (fake) data from a disk service
- Compute (fake) data from a CPU service
- Use a common `PowerService` dependency to set power supply
- Handle the app thru a root module `ComputerModule` to get merged data thru a GET request (API)

#### 9.2.2. Objectives

- Overview of interconnections (aka exports/imports) of modules's services thru a main `run()` method

### 9.3. Project 3: Used Car Pricing API

#### 9.3.1. Features

- Users sign up with email/password
  - POST /auth/signup
    - Body { email, password }
    - Create a new user and sign in
  - POST /auth/signin
    - Body { email, password }
    - Sign in an existing user
- Users get an estimate for how much their car is worth based on the make/model/year/mileage
  - GET /reports
    - QueryString make/model/year/mileage/longitude/latitude
    - Get an estimate for the cars value
      - Search through all reports we have
      - Find reports for the same make/model
      - Within +/- 5 longitude/latitude degrees
      - Within +/- 3 years
      - Order by closest mileage
- Users can report what they sold their vehicles for
  - POST /reports
    - Body { make, model, year, mileage, longitude, latitude, price }
    - Report how much a vehicle sold for
- Admins have to approve reported sales
  - PATCH /reports/:id
    - Body { approved }
    - Approve or reject a report submitted by a user

#### 9.3.2. Objectives

- More complex examples of interconnections between modules
- Implement side features like auth, roles, ...

## 10. Associations

### 10.1. One To One

- Bind one entity instance with only one instance of another entity
- Example: a car and its engine, a person and its birth city

```typescript
import { OneToOne } from '@nestjs/common';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  // ...

  @OneToOne(() => Engine, (engine) => engine.car)
  engine: Engine;
}

@Entity()
export class Engine {
  @PrimaryGeneratedColumn()
  id: number;

  // ...

  @OneToOne(() => Car, (car) => car.engine)
  car: Car;
}
```

- Association **is not automatically fetched** when we fetch a Car or an Engine

### 10.2. One To Many and Many To One

- Bind one entity type instance with one or several other entity type instances
- Example: a car and its wheels

```typescript
import { OneToMany, ManyToOne } from '@nestjs/common';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  // ...

  @OneToMany(() => Wheel, (wheels) => wheels.car)
  wheels: Wheel[];
}

@Entity()
export class Wheel {
  @PrimaryGeneratedColumn()
  id: number;

  // ...

  @ManyToOne(() => Car, (car) => car.wheels)
  car: Car;
}
```

- Does not change the `Car` table
- Does change the `Wheel` table
- Association **is not automatically fetched** when we fetch a Car or an Engine

### 10.3. Many To Many

- Bind several entity type instances with one or several other entity type instances
- Example: students and parties

```typescript
import { ManyToMany } from '@nestjs/common';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  // ...

  @ManyToMany(() => Party, (party) => party.students)
  parties: Party[];
}

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  // ...

  @ManyToMany(() => Student, (student) => student.parties)
  students: Student[];
}
```

- Does change the `Student` and `Party` tables
- Association **is not automatically fetched** when we fetch a Car or an Engine
