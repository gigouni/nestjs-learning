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

- [1. NestJS projects structure](#1-nestjs-projects-structure)
- [2. Naming conventions](#2-naming-conventions)
- [3. NestJS CLI commands](#3-nestjs-cli-commands)

<!-- /TOC -->

## 1. NestJS projects structure

- Pipe: help validating data in cinoming requests
- Guard: make sure the user is authenticated
- Controller: route the request to a particular function
- Service: run some business logic
- Repository: access a database
- Module: group together code
- Filter: handle errors that occur during request handling
- Interceptor: add extra logic to incoming requests or outgoing responses

## 2. Naming conventions

- One class per file (some exceptions)
- Class names should include the kind of thing we're creating
- Name of class and name of file should always match up
- Filename template: name.type_of_thing.ts

## NestJS CLI commands

```shell
# Generate a new NestJs project boilerplate
nest new nestjs-learning

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
