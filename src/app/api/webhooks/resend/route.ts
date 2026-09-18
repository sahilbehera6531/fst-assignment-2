import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Example Webhook Payload from Resend
        // body.type will be 'email.sent', 'email.delivered', 'email.bounced', etc.
        const eventType = body.type || 'unknown_event';
        const emailData = body.data || {};
        
        // Log event into AuditLog
        await prisma.auditLog.create({
            data: {
                action: `RESEND_WEBHOOK_${eventType.toUpperCase()}`,
                details: `Email event for ${emailData.to?.[0] || 'unknown'}: ${eventType}`,
            },
        });

        return NextResponse.json({ message: "Webhook received and logged" }, { status: 200 });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }
}
