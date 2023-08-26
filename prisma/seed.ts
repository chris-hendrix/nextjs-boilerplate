/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { generateSeedData, prisma } from './utils'

generateSeedData()
  .then(async ({ users }) => {
    console.log({ users })
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
