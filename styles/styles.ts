import {StyleSheet} from 'react-native';

const colors = {
  primary: '#007AFF',
  secondary: '#FFB001',
  background: '#EDFBFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#E5E5EA',
    medium: '#C7C7CC',
    dark: '#8E8E93',
  },
};

const typography = {
  fontFamily: {
    regular: 'Inter_18pt-Regular',
    medium: 'Inter_18pt-Medium',
    semiBold: 'Inter_18pt-SemiBold',
    bold: 'Inter_18pt-Bold',
    black: 'Inter_18pt-Black',
  },
  fontSize: {
    small: 14,
    regular: 18,
    medium: 24,
    large: 28,
  },
  lineHeight: {
    small: 18,
    regular: 22,
    medium: 28,
    large: 34,
  },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const borderRadius = {
  small: 4,
  medium: 8,
  large: 16,
  round: 9999,
};

const styles = StyleSheet.create({
  // Layout
  container: {
    display: 'flex',
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Typography
  textSmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.small,
    lineHeight: typography.lineHeight.small,
    color: colors.text,
  },
  textRegular: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.regular,
    lineHeight: typography.lineHeight.regular,
    color: colors.text,
  },
  textMedium: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.medium,
    lineHeight: typography.lineHeight.medium,
    color: colors.text,
  },
  textLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.large,
    lineHeight: typography.lineHeight.large,
    color: colors.text,
  },
  textBold: {
    fontFamily: typography.fontFamily.bold,
  },
  textSemiBold: {
    fontFamily: typography.fontFamily.semiBold,
  },
  textMediumWeight: {
    fontFamily: typography.fontFamily.medium,
  },
  textBlack: {
    fontFamily: typography.fontFamily.black,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.medium,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.medium,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.small,
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: colors.gray.medium,
    borderRadius: borderRadius.small,
    padding: spacing.sm,
    fontSize: typography.fontSize.small,
    fontFamily: typography.fontFamily.regular,
  },

  // Cards
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Margins and Paddings
  marginBottom: {
    marginBottom: spacing.lg,
  },
  paddingHorizontal: {
    paddingHorizontal: spacing.xs,
  },
});

export {colors, typography, spacing, borderRadius, styles};
