/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { deleteSeedData, prisma } from './utils'

deleteSeedData()
  .then(async (_res) => {
    console.log('Seed data successfully deleted')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
