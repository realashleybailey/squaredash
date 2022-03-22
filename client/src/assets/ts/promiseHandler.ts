export default async function PromiseHandler<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  let data: T
  try {
    data = await promise
    return [null, data]
  } catch (err) {
    return [err as Error, null]
  }
}
