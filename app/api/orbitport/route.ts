import { NextRequest, NextResponse } from 'next/server'
import { freshEntropy } from './utils'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  const r = await freshEntropy()

  return NextResponse.json(r)
}