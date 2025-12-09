'use client';

import { useEffect } from 'react';
import { initMixpanel } from '../lib/mixpanelClient';

export default function MixpanelInitializer() {
  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  return null;
}

