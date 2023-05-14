import bcrypt from 'bcrypt'

const generateHash = async (password: string) => (
  bcrypt.hash(password, await bcrypt.genSalt(10))
)

const validatePassword = async (password: string, hash: string) => (
  bcrypt.compare(password, hash as string)
)

export { generateHash, validatePassword }
