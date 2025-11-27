import { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: '/', name: 'landing-desktop', viewport: { width: 1280, height: 720 }, waitBeforeScreenshot: 2000 },
      { path: '/', name: 'landing-mobile', viewport: { width: 375, height: 812 }, waitBeforeScreenshot: 2000 },
      { path: '/posts', name: 'posts-desktop', viewport: { width: 1280, height: 720 }, waitBeforeScreenshot: 2000 },
      { path: '/posts', name: 'posts-mobile', viewport: { width: 375, height: 812 }, waitBeforeScreenshot: 2000 },
      { path: '/projects', name: 'projects-desktop', viewport: { width: 1280, height: 720 }, waitBeforeScreenshot: 2000 },
      { path: '/projects', name: 'projects-mobile', viewport: { width: 375, height: 812 }, waitBeforeScreenshot: 2000 },
      { path: '/resume', name: 'resume-desktop', viewport: { width: 1280, height: 720 }, waitBeforeScreenshot: 2000 },
      { path: '/resume', name: 'resume-mobile', viewport: { width: 375, height: 812 }, waitBeforeScreenshot: 2000 },
    ],
    baseUrl: 'http://172.17.0.1:3000',
  },
  lostPixelProjectId: 'cmicauaq31bcr7v79lq43dekb',
  apiKey: process.env.LOST_PIXEL_API_KEY,
  browser: 'chromium',
  threshold: 0,
};
