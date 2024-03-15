export type Email = {
    emailAddress: string,
    code?: number,
    emailType: number,
}

export type MessageConfig = {
    to: string;
    from: string;
    templateId: string;
    dynamic_template_data: {
        subject: string;
        code?: number;
    };
};

/**
 * 0 - VERIFF_NOTIFICATION
 * 1 - CREATE_KYC_CERTIFICATE_SUCCESS_NOTIFICATION
 */
export enum EmailTypes {
    VERIFF_NOTIFICATION,
    CREATE_KYC_CERTIFICATE_SUCCESS_NOTIFICATION,
}