#! /usr/bin/env node
import { program } from 'commander'
import firestore from './commands/firestore.js'

program
  .command('firestore')
  .description('Import firestore data to active folder')
  .action(firestore)

program.parse()
