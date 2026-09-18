import * as React from 'react';
import { Html, Head, Body, Container, Text, Heading, Hr } from '@react-email/components';

interface TransactionalTemplateProps {
    userName: string;
    transactionId: string;
    amount: number;
    status: string;
}

export const TransactionalTemplate = ({ userName, transactionId, amount, status }: TransactionalTemplateProps) => {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f6f9fc', padding: '20px' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px' }}>
                    <Heading>Transaction {status}</Heading>
                    <Text>Hi {userName},</Text>
                    <Text>
                        Your transaction of ${amount.toFixed(2)} has been marked as <strong>{status}</strong>.
                    </Text>
                    <Hr />
                    <Text style={{ color: '#8898aa', fontSize: '12px' }}>
                        Transaction ID: {transactionId}
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default TransactionalTemplate;
