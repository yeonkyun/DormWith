/**
 * App theme configuration with light mode colors only.
 */

import { Platform } from 'react-native';

export const Colors = {
  // Primary
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#BBDEFB',

  // Text
  text: '#1a1a1a',
  textSecondary: '#666',
  textLight: '#999',

  // Background
  background: '#fff',
  backgroundGray: '#f8f9fa',
  backgroundLight: '#fafafa',

  // Border
  border: '#e0e0e0',
  borderLight: '#f0f0f0',

  // Status
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
