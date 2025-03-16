import { Hex } from 'ox'

export function entropyFromSeed(randomness: string): number {
  return Hex.toNumber(`0x${randomness}`) % 1e10
}

export async function freshEntropy(): Promise<typeof entropy> {
  const r = await fetch(process.env.ORBITPORT_API_URL!)

  if (!r.ok) {
    return entropy
  }

  const res = await r.json()

  return {
    ...res,
    seed: entropyFromSeed(res.value),
  } 
}

const sample = {
  value: '66ac159617efbe7b294b38ce63e090b10fa15e9444c4ebe2be4d917e18e538fb',
  sig: '3045022100896ab63f5cd45dba2b5eda6a196b1c6ace6f5cfa8caa9e5def771e0ea275844202203bf8ad45b74b673f08c207a8d4679181fc7f2418c63d0f6ebe5655735f08ea5a',
  src: 'space/aptos_orbital'
}

export const entropy = {
  ...sample,
  seed: entropyFromSeed(sample.value),
}
