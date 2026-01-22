import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/modules/auth/session'
import { getAdminByUsername, updateAdminProfile, updateAdminPassword } from '@/lib/modules/auth/admin'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

// GET - Get current admin profile
export async function GET() {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                msg: 'Unauthorized',
            }, { status: 401 })
        }

        const admin = await getAdminByUsername(session.username)
        if (!admin) {
            return NextResponse.json({
                success: false,
                msg: 'Admin not found',
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            profile: {
                id: admin.id,
                username: admin.username,
                name: (admin as any).name || '',
                createdAt: admin.createdAt,
                lastLoginAt: admin.lastLoginAt,
            },
        })
    } catch (error) {
        console.error('[API] Get profile error:', error)
        return NextResponse.json(createErrorResponse(error), { status: 500 })
    }
}

// PATCH - Update profile (name, username)
export async function PATCH(request: NextRequest) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                msg: 'Unauthorized',
            }, { status: 401 })
        }

        const body = await request.json()
        const { name, newUsername } = body

        // Check if new username is already taken
        if (newUsername && newUsername !== session.username) {
            const existing = await getAdminByUsername(newUsername)
            if (existing) {
                return NextResponse.json({
                    success: false,
                    msg: 'Username is already taken',
                }, { status: 400 })
            }
        }

        await updateAdminProfile(session.username, { name, newUsername })

        return NextResponse.json({
            success: true,
            msg: 'Profile updated successfully',
        })
    } catch (error) {
        console.error('[API] Update profile error:', error)
        return NextResponse.json(createErrorResponse(error), { status: 500 })
    }
}

// PUT - Update password
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                msg: 'Unauthorized',
            }, { status: 401 })
        }

        const body = await request.json()
        const { currentPassword, newPassword } = body

        if (!currentPassword || !newPassword) {
            return NextResponse.json({
                success: false,
                msg: 'Current password and new password are required',
            }, { status: 400 })
        }

        if (newPassword.length < 6) {
            return NextResponse.json({
                success: false,
                msg: 'New password must be at least 6 characters',
            }, { status: 400 })
        }

        const result = await updateAdminPassword(session.username, currentPassword, newPassword)

        if (!result.success) {
            return NextResponse.json({
                success: false,
                msg: result.msg,
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            msg: 'Password updated successfully',
        })
    } catch (error) {
        console.error('[API] Update password error:', error)
        return NextResponse.json(createErrorResponse(error), { status: 500 })
    }
}
