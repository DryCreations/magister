# Magister
 
Magister is a tool for better managing github classrooms.

This project is currently a work in progress, and primarily for personal use.

## Purpose

While [Github Classroom Assistant](https://classroom.github.com/assistant), and the [Github Org Explorer](https://github.com/zamansky/github-org-explorer) exist to do some of the features included in this project, I plan to implement features to aid my specific flow in grading and managing assignments in my classroom.

## Installation

### Download Installer

You can find installation files for Windows, Mac, and Linux under [releases](https://github.com/DryCreations/magister/releases). 

### Build it Yourself

If you would like to use the current version on the main branch, you can also pull the repository and build it yourself.

```sh
npm i
npm run build
npm run electron-pack
```

## What's in The Repo?

This project is an [Electron](https://electronjs.org/) app, built using the [Svelte](https://svelte.dev/) framework. I have included some other tools that I will be using during the development process as well.

The core pieces of the project are the [src/](src/) directory, feel free to explore the code there.

### Electron

The main file housing most of the Electron code and logic for client side actions is [src/main.js](src/main.js).

### Svelte

The UI, and svelte components are primarily in the [src/components/](src/components/) directory. The starting points for the applications front end, however, are [src/App.svelte](src/App.svelte) and [src/index.js](src/index.js).

### Storybook

To help in developing the UI, I have also included storybook. This allows me to better test individual UI components and see how they change as I'm actively developing them.

The documentation, and individual components can be see on [github pages](https://drycreations.github.io/magister).

### Jest

As I build the repository I will be using jest for unit testing, and making sure nothing breaks as I continue to build the project.

you can run the tests locally:

```
npm run test
```

Currently snapshots are also generated of components that need approved manually every time a change is made, this is just to ensure all changes are intentional. To update the snapshots after changes are made you can run:

```
npm run test - --u
```

## Roadmap

### Planned Features

- Mass downloading of assignments
- Mass deletion of assignments
- Searching and filtering assignments by student, or assignment name

## Contributing

While I am open to others contributing, I cannot promise I will accept it; You are, however, more than welcome to fork this repo and work on your own branch. 

I would be more than open to feature requests or bug reports for as long as I am actively maintaining this project.

## Authors

DryCreations (Hayden Mankin)