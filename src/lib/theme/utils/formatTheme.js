import {type defaultTheme as theme} from '../localTheme/defaultTheme.js';

export const formatTheme = (naiveFormatTheme: theme) => {
  return {
    ...naiveFormatTheme,
    Avatar: {
      rounded: true,
      size: 'medium',
      activeOpacity: 0.7,
    },
    Badge: {
      status: 'success',
    },
    Button: {
      type: 'solid',
      buttonStyle: {
        backgroundColor: naiveFormatTheme?.color?.primary || 'yellow',
      },
      raised: true,
    },
    Header: {
      backgroundColor: naiveFormatTheme?.color?.primary || 'blue',
      statusBarBackgroundColor: naiveFormatTheme?.color?.secondary,
    },
    CheckBox: {
      left: true,
      title: 'tick me',
    },
    Input: {
      errorMessage: 'Something is wrong',
      errorStyle: {
        color: naiveFormatTheme?.color?.error,
      },
    },
    PricingCard: {
      color: naiveFormatTheme?.color?.primary_variant_1,
    },
    Rating: {
      type: 'star',
      count: 5,
      reviews: ['Terrible', 'Bad', 'OK', 'Good', 'Amazing'],
    },
  };
};
