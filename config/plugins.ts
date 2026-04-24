import type { Core } from '@strapi/strapi';

// เปลี่ยนจาก Core.Config.Plugin เป็น any เพื่อให้ใส่ config ของปลั๊กอินต่างๆ ได้ง่ายขึ้น
const config = ({ env }: Core.Config.Shared.ConfigParams): any => ({
  
  // 1. ส่วนตั้งค่าการอัปโหลดไฟล์ (S3-Compatible)
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('S3_BASE_URL'),
        s3Options: {
          credentials: {
            accessKeyId: env('S3_ACCESS_KEY_ID'),
            secretAccessKey: env('S3_ACCESS_SECRET'),
          },
          endpoint: env('S3_ENDPOINT'), 
          region: env('S3_REGION', 'us-east-1'),
          forcePathStyle: true, 
          params: {
            Bucket: env('S3_BUCKET'),
          },
        },
      },
       security: {
        strictSizeValidation: true,
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // 2. ส่วนตั้งค่าการส่งอีเมล (ตัวอย่างใช้ Nodemailer)
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO'),
      },
    },
  },

});

export default config;