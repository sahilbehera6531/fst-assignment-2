import { Resend } from 'resend';
import TransactionalTemplate from '@/components/emails/TransactionalTemplate';

// Mock Resend initialization if key is missing during testing
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_123');

export async function sendTransactionEmail(userEmail: string, userName: string, transactionId: string, amount: number, status: string) {
    if (!process.env.RESEND_API_KEY) {
        console.log(`[Mock Email] Sent to ${userEmail} for transaction ${transactionId} with status ${status}`);
        return { id: 'mock-id-123' };
    }

    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [userEmail],
            subject: `Transaction Update: ${status}`,
            react: TransactionalTemplate({ userName, transactionId, amount, status }),
        });
        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
