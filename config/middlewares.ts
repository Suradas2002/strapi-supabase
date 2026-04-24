import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  // 👇 เปลี่ยนจากบรรทัด 'strapi::security' เป็นก้อนการตั้งค่านี้ 👇
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            '*.supabase.co', // อนุญาตให้ดึงรูปจาก Supabase
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            '*.supabase.co', // อนุญาตให้ดึงวิดีโอ/เสียงจาก Supabase
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // 👆 จบส่วนที่แก้ไข 👆
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;