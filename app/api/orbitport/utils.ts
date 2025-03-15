import { Hex } from 'ox'

export function entropyFromSeed(randomness: string): number {
  return Hex.toNumber(`0x${randomness}`) % 1e10
}

const sample = {
  value: '9db503b4f269804d4b9dc50899e4bf155e202f4d74de2f9b8f2dbf0496098b24',
  sig: '3046022100beea9dc065ae07b86b4507788b451e9b76d95bb358b2860067a144fccbe2ffbe02210090da5b1c066031dfb02b6fbd937a26038e47a14c26a355022a24e0584e04fae4',
  src: 'space/aptos_orbital',
}

export const entropy = {
  ...sample,
  seed: entropyFromSeed(sample.value),
}
