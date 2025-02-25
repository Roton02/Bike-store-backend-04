import { Router } from 'express'
import {
  paymentCancel,
  paymentFail,
  paymentIpn,
  paymentSuccess,
} from './payment.controller'

const router = Router()

router.post('/success', paymentSuccess)
router.post('/fail', paymentFail)
router.post('/cancel', paymentCancel)
router.post('/ipn', paymentIpn)

export default router
