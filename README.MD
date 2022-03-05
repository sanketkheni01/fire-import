![alt text](https://github.com/sanketkheni01/fire-import/blob/master/assets/cover.jpg?raw=true)

## You can import your firebase production data easily

# Requirements

1. Google Cloud SDK

   For installing google cloud in your computer check this out => [here](https://cloud.google.com/sdk/docs/install)

2. Firebase cli

   For installing firebase cli into your computer run the following command

   `npm i -g firebase-tools`

# Usage

Importing **firestore** data to your current firebase project directory

`fire-import firestore`

It will ask you for `projectId`. Please go to the firebase console and get the project id.
![alt text](https://github.com/sanketkheni01/fire-import/blob/master/assets/firebaseSetting.png?raw=true)

Then new browser windows will open. Choose your google account associated with firebase project.

(This package won't have access to any of your account. You are providing access to `google-cloud-sdk` only)

and then start the firebase emulator with

`firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport`

> :warning: Please make sure that you are in firebase project directory. Or initialize the firebase project by entering `firebase init` in terminal.
