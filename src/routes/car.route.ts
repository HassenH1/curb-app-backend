import express, { Request, Response, NextFunction, Router } from 'express'

const router: Router = express.Router()

router.post((req: Request, res: Response, next: NextFunction) => {
  res.send('hello world')
})
