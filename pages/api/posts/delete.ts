import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: Request, res: Response) {
  const data = req.body
  try {
    const post = await prisma.post.delete({
      where: {
        id: data.id
      }
    })
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occured while adding a new food.' })
  }
}
