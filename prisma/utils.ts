import { uniqueNamesGenerator, Config, names } from 'unique-names-generator'
import { PrismaClient } from '@prisma/client'
import { generateHash } from '../src/utils/hash'

const SEED_EMAIL_DOMAIN = 'seed.com'

export const prisma = new PrismaClient()

const generateUser = async () => {
  const config: Config = { dictionaries: [names] }
  const firstName = uniqueNamesGenerator(config)
  const lastName = uniqueNamesGenerator(config)
  const username = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`

  const user = await prisma.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      username,
      email: `${username}@${SEED_EMAIL_DOMAIN}`,
      password: await generateHash('Abc1234!')
    }
  })
  return user
}

export const generateSeedData = async (userCount = 20) => {
  const users = await Promise.all([...Array(userCount)].map(() => generateUser()))
  return { users }
}

export const deleteSeedData = async () => prisma.user.deleteMany({
  where: { email: { endsWith: `@${SEED_EMAIL_DOMAIN}` } }
})
