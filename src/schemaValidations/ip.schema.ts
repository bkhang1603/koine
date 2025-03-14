import z from 'zod'

export const IpData = z.object({
  clientIp: z.string()
})

export const IpRes = z.object({
  data: IpData,
  message: z.string(),
  statusCode: z.number()
})

export type IpData = z.infer<typeof IpData>

export type IpRes = z.infer<typeof IpRes>
