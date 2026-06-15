import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export const PLAN_PRICE_ID = {
    'seeker_pro_plan': 'price_1ThdPU2IKff8eCd8KZ90PhLf',
    'seeker_premium_plan': 'price_1TifnZ2IKff8eCd8ee1O7em1',
    'recruiter_growth_plan': 'price_1Tifpz2IKff8eCd8j5CbjErM',
    'recruiter_enterprise_plan': 'price_1Tifpz2IKff8eCd8j5CbjErM'

}