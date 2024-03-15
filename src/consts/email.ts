import 'dotenv/config';

export const VERIFICATION_NOTIFICATION = {
    id: process.env.VERIFICATION_TEMPLATE_ID,
    subject: 'Verification Code'
}

export const CREATE_KYC_CERTIFICATE_SUCCESS_NOTIFICATION = {
    id: process.env.CREATE_KYC_CERTIFICATE_SUCCESS_TEMPLATE_ID,
    subject: 'Create KYC Certification Success'
}