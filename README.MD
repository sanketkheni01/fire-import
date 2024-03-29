![alt text](https://github.com/sanketkheni01/fire-import/blob/master/assets/cover.jpg?raw=true)

## Import your firebase production data easily to local firebase emulator

# Requirements

1. Google Cloud SDK

   For installing google cloud cli in your computer check this out => [here](https://cloud.google.com/sdk/docs/install)

2. Firebase cli

   For installing firebase cli into your computer run the following command

   `npm i -g firebase-tools`

# Usage

## First Install the `fire-import` cli

```
npm i -g fire-import
```

## 1. FireStore

```
fire-import firestore
```

It will ask you for `projectId`. How to get [Project Id](#how-to-get-firebase-project-id) ?

Then new browser windows will open. Choose your google account associated with firebase project.

(This package won't have access to any of your account. You are providing access to `google-cloud-sdk` only)

> :warning: Please make sure that you are in firebase project directory. Or initialize the firebase project by entering `firebase init` in terminal.

## 2. Firebase Storage

```
fire-import storage
```

# FAQs

## How to get firebase project id?

Please go to the firebase console and get the project id.

![alt text](https://github.com/sanketkheni01/fire-import/blob/master/assets/firebaseSetting.png?raw=true)

## How to start emulator?

Start firebase emulator with

`firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport`
