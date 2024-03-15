import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import sgMail from '@sendgrid/mail'

import 'dotenv/config';

import { ArgumentValidationError, CustomError } from 'errors';
import { EMAIL_TYPES } from 'consts';


import {
  Email,
  MessageConfig,
  EmailTypes
} from 'types';

import { errorHandlerWrapper  } from 'utils';

export const sendEmailValidator = () => {
  return [
    body('emailAddress')
      .isEmail()
      .withMessage('Invalid Email Address.')
      .exists()
      .withMessage('Email Address is missing.'),
    body('emailType')
      .isNumeric()
      .withMessage('Invalid Email Template Type.')
      .exists()
      .withMessage('Email Type is missing'),
    body('code')
      .optional()
      .isNumeric()
      .withMessage('Invalid Code.')
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = Email;
type ReqQuery = unknown;

export const sendEmailHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {  

  
  const { emailAddress, emailType, code }  = req.body;

  if (!emailAddress && !emailType) {
    throw new ArgumentValidationError('Invalid Arguments.', [
      'Email and emailType is required',
    ]);
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  
  const msg: MessageConfig = {
    to: emailAddress,
    from: process.env.SENDER || '',
    templateId: '',
    dynamic_template_data: {
      subject: '',
    },
  };

  switch (emailType) {
    case EmailTypes.VERIFF_NOTIFICATION:
      if (!code) {
        throw new ArgumentValidationError('Invalid Arguments.', [
          'Code is required',
        ]);
      }
      msg.templateId = EMAIL_TYPES.VERIFICATION_NOTIFICATION.id;
      msg.dynamic_template_data.subject =
        EMAIL_TYPES.VERIFICATION_NOTIFICATION.subject;
      msg.dynamic_template_data.code = code;
      break;
    case EmailTypes.CREATE_KYC_CERTIFICATE_SUCCESS_NOTIFICATION:
      msg.templateId = EMAIL_TYPES.CREATE_KYC_CERTIFICATE_SUCCESS_NOTIFICATION.id;
      msg.dynamic_template_data.subject =
        EMAIL_TYPES.CREATE_KYC_CERTIFICATE_SUCCESS_NOTIFICATION.subject;
      break;

    default:
      throw new ArgumentValidationError('Invalid Arguments.', [
        'Invalid EmailType',
      ]);
  }

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new CustomError('An error occurred while sending mail via sendgrid');
  }


  res.status(httpStatus.CREATED).json("Success");
}

export const sendEmail = errorHandlerWrapper(sendEmailHandler);