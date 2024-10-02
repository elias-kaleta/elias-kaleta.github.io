import { Router } from 'express'
import * as db from '../db/announcements.ts'
import {
  AnnouncementData,
  announcementDataSchema,
} from '../../types/Announcement.ts'

const router = Router()

router.get('/:flatId', async (req, res) => {
  try {
    const flatId = req.params.flatId
    const announcements = await db.getAnnouncements(+flatId)
    res.json(announcements)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/:flatId', async (req, res, next) => {
  try {
    const newAnnouncement: AnnouncementData = req.body
    const validationResult = announcementDataSchema.safeParse(newAnnouncement)

    if (!validationResult.success) {
      res.status(400).json({ message: 'Invalid Announcement Schema' })
      return
    }

    await db.addAnnouncement(newAnnouncement)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

export default router
