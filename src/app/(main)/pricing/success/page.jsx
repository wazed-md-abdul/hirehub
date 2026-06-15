import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Check, Mail } from 'lucide-react'

import { stripe } from "@/lib/stripe"

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        return (
            <div className="bg-[#0B0B0F] min-h-screen text-white pt-28 pb-24 font-sans relative overflow-hidden flex items-center justify-center">
                {/* Background Blobs */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
                <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                <div className="container mx-auto px-4 flex justify-center">
                    <div className="max-w-md w-full bg-[#121217] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative transition-all duration-300 hover:border-white/10 flex flex-col items-center text-center space-y-6">
                        {/* Glow indicator at the top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-b-full"></div>

                        {/* Success Icon */}
                        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
                            <Check className="w-10 h-10" />
                        </div>

                        {/* Header */}
                        <div className="space-y-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                Payment Successful
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent pt-2">
                                Welcome Aboard!
                            </h1>
                        </div>

                        {/* Message */}
                        <p className="text-sm text-[#8A8A93] leading-relaxed">
                            We appreciate your business! A confirmation email and invoice details have been sent to{' '}
                            <span className="text-white font-medium">{customerEmail}</span>.
                        </p>

                        {/* Support Block */}
                        <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center gap-3 text-left">
                            <div className="p-2.5 rounded-xl bg-white/5 text-violet-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs text-[#8A8A93]">Have questions?</p>
                                <a href="mailto:support@hireloop.com" className="text-xs text-white hover:underline font-medium">
                                    support@hireloop.com
                                </a>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full pt-4 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/"
                                className="flex-1 py-3 px-4 rounded-xl bg-white text-black hover:bg-gray-100 active:scale-98 font-bold text-sm transition-all text-center cursor-pointer shadow-lg"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/pricing"
                                className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 active:scale-98 text-white font-bold text-sm transition-all text-center cursor-pointer"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}