import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: Request) {
    try {
        let logs = []

        // 1. Check schema BEFORE
        const columnsBefore: any = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'user_tokens' AND column_name IN ('balance', 'usedTokens', 'totalTokens')
    `
        logs.push({ msg: 'Schema BEFORE', columns: columnsBefore })

        // 2. Attempt to ALTER TABLE
        // We use try-catch for each in case one is already done
        try {
            await prisma.$executeRawUnsafe(`ALTER TABLE "user_tokens" ALTER COLUMN "balance" TYPE DOUBLE PRECISION`)
            logs.push({ msg: 'Altered balance' })
        } catch (e: any) {
            logs.push({ msg: 'Failed alter balance', error: e.message })
        }

        try {
            await prisma.$executeRawUnsafe(`ALTER TABLE "user_tokens" ALTER COLUMN "usedTokens" TYPE DOUBLE PRECISION`)
            logs.push({ msg: 'Altered usedTokens' })
        } catch (e: any) {
            logs.push({ msg: 'Failed alter usedTokens', error: e.message })
        }

        try {
            await prisma.$executeRawUnsafe(`ALTER TABLE "user_tokens" ALTER COLUMN "totalTokens" TYPE DOUBLE PRECISION`)
            logs.push({ msg: 'Altered totalTokens' })
        } catch (e: any) {
            logs.push({ msg: 'Failed alter totalTokens', error: e.message })
        }

        // 3. Check schema AFTER
        const columnsAfter: any = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'user_tokens' AND column_name IN ('balance', 'usedTokens', 'totalTokens')
    `
        logs.push({ msg: 'Schema AFTER', columns: columnsAfter })

        // 4. Verify Fix: Create a temp user with float balance
        const tempId = 'verify_drift_' + Date.now()
        try {
            await prisma.userToken.create({
                data: {
                    userId: tempId,
                    balance: 10.5
                }
            })
            logs.push({ msg: 'Verification Create Success', userId: tempId })
            await prisma.userToken.delete({ where: { userId: tempId } })
        } catch (e: any) {
            logs.push({ msg: 'Verification Create Failed', error: e.message })
        }

        return NextResponse.json({ success: true, logs })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message, stack: error.stack })
    }
}
