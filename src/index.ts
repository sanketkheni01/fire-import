#! /usr/bin/env node
import { program } from 'commander'
import firestore from './commands/firestore.js'
import storage from './commands/storage.js'

program
  .command('firestore')
  .description('Import firestore data to active folder')
  .action(firestore)

program
  .command('storage')
  .description('Import firebase storage data to active folder')
  .action(storage)

// program.command('test').description('test').action(test)

program.parse()
