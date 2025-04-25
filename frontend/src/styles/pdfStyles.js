import { StyleSheet } from '@react-pdf/renderer';

// Color Palette based on CSS variables
export const colors = {
  primary: '#132340',    // Navy Blue
  secondary: '#a67c00',  // Gold
  accent: '#f5f7fa',    // Light background accent
  border: '#e0e0e0',    // Light grey border
  text: '#333333',      // Dark grey text
  lightText: '#666666', // Lighter grey text
  white: '#FFFFFF',
  black: '#000000'
  // Add specific line colors if needed globally, or keep them local
};

// Base Font Sizes (optional, components can define specifics)
export const fontSizes = {
  body: 10,          // Adjusted for PDF legibility (HTML used 12pt)
  h1: 24,          // Example sizes, adjust as needed
  h2: 18,
  h3: 14,
  h4: 12,
  small: 9,
};

// Basic reusable styles (optional, extend as needed)
export const globalStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    padding: 40, // Approx 1.5cm in points (pt)
    fontFamily: 'Helvetica', // Default font
    fontSize: fontSizes.body, // Default text size
    color: colors.text,
    lineHeight: 1.5, // Default line height
  },

  // --- General Layout & Typography ---
  section: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    backgroundColor: colors.white,
    // Use breakInside: 'avoid' carefully, can cause layout issues
  },
  h1: {
    fontSize: fontSizes.h1,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    fontFamily: 'Helvetica-Bold',
  },
  h2: {
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    fontFamily: 'Helvetica-Bold',
  },
  h3: {
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  h4: {
    fontSize: fontSizes.h4,
    fontWeight: 'bold',
    color: colors.lightText,
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  paragraph: {
    fontSize: fontSizes.body,
    marginBottom: 5,
    lineHeight: 1.4, // Slightly tighter than page default for paragraphs
    color: colors.text,
  },
  bold: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  italic: {
    fontStyle: 'italic',
    color: colors.lightText,
  },
  caption: {
    marginTop: 10,
    fontSize: fontSizes.small,
    color: colors.lightText,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  link: {
    color: colors.secondary,
    textDecoration: 'underline',
  },

  // --- List Styles ---
  listContainer: {
    marginTop: 5,
    // Add marginLeft here if all lists should be indented
    // marginLeft: 10,
  },
  listItemText: {
    fontSize: fontSizes.body, // Match paragraph text size
    marginBottom: 3,
    color: colors.text,
    // Add marginLeft if individual items need indenting (and not container)
    // marginLeft: 10,
  },

  // --- Label/Value Pairs ---
  labelValueContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start', // Align items at the top
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    marginRight: 5,
    color: colors.text,
    fontFamily: 'Helvetica-Bold',
    // width: 100, // Optionally set a fixed width for labels
  },
  value: {
    fontSize: fontSizes.body,
    color: colors.text,
    flex: 1, // Allow value to wrap if long
  },

  // --- Specific Component Styles (Examples, can be extended) ---
  mapImage: {
    width: '100%',
    height: 250, // Adjust as needed
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Add other globally useful styles here if identified
  // e.g., standard card, common margin/padding
}); 