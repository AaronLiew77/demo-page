import mixpanel from 'mixpanel-browser';
 
const MIXPANEL_TOKEN = 'e6e85fff440bd0101c2adea6dbb894f9';
 
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }
 
  mixpanel.init(MIXPANEL_TOKEN, { autocapture: true });
}