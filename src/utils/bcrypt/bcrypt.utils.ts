import bcrypt from 'bcrypt';

const comparePasswords = async (password: string, hashedPassword: string) =>
  await bcrypt.compare(password, hashedPassword);

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export { comparePasswords, hashPassword };
