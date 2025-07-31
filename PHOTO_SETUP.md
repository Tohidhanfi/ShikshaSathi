# Adding Founder Photo

## Current Status
The website is set up to display Naheed Hussain's photo, but the image file is missing.

## To Add the Photo:

### Option 1: Add the Photo File
1. Save the photo of Naheed Hussain as `founder-photo.jpg`
2. Place it in the same folder as `index.html`
3. The photo will automatically display

### Option 2: Use a Different Filename
If you want to use a different filename:
1. Rename your photo file
2. Update the `src` attribute in `index.html` line 108:
   ```html
   <img src="your-photo-name.jpg" alt="Naheed N. Hussain - Founder of ShikshaSathi" class="founder-photo">
   ```

### Option 3: Use a Different Format
Supported formats: JPG, PNG, WebP
- For PNG: Change `founder-photo.jpg` to `founder-photo.png`
- For WebP: Change `founder-photo.jpg` to `founder-photo.webp`

## Current Fallback
Until you add the photo, a professional placeholder will display with:
- Gradient background matching the website theme
- User icon
- "Naheed N. Hussain" text
- Professional styling

## Photo Requirements
- **Recommended size**: 400x400 pixels or larger
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution for crisp display
- **Content**: Professional headshot or speaking photo

## Testing
After adding the photo, refresh the website to see it displayed in the founder section. 