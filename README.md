# Email Signature Generator

A web application that generates on-brand email signatures with pre-defined brand fonts and logos.

## Features

- Create email signatures with employee name, position, phone number, and email
- Display contact information in the format "phone number | email address"
- Choose from pre-defined company logos
- Customize font weights for different fields through the Style Settings
- Adjust spacing between lines
- Export signature as transparent PNG

## Project Structure

```
signature-generator/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── page.js      # Main generator page
│   │   ├── layout.js    # Root layout
│   │   ├── globals.css  # Global styles
│   │   ├── fonts.css    # Font fallbacks
│   │   └── admin/       # Style settings routes
│   │       └── page.js
│   ├── components/      # React components
│   │   ├── SignatureForm.js
│   │   ├── SignaturePreview.js
│   │   ├── AdminPanel.js
│   │   ├── FontLoader.js
│   │   └── ExportButton.js
│   └── contexts/        # React contexts
│       └── SignatureContext.js
├── package.json
├── next.config.js
└── README.md
```

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/signature-generator.git
   cd signature-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your brand assets**

   Before deploying, update the font and logo URLs in `src/contexts/SignatureContext.js`:

   ```javascript
   // Pre-defined assets - replace these URLs with your actual font and logo URLs
   const FONTS = {
     regular: 'https://yourdomain.com/fonts/YourFont-Regular.woff2',
     medium: 'https://yourdomain.com/fonts/YourFont-Medium.woff2',
     bold: 'https://yourdomain.com/fonts/YourFont-Bold.woff2',
   };

   const LOGOS = [
     { value: 'https://yourdomain.com/logos/logo1.png', label: 'Primary Logo' },
     { value: 'https://yourdomain.com/logos/logo2.png', label: 'Secondary Logo' },
     { value: 'https://yourdomain.com/logos/logo3.png', label: 'Monochrome Logo' },
   ];
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

## Deployment on Vercel

1. Push your code to GitHub

2. Connect your GitHub repository to Vercel

3. Deploy using the Vercel dashboard or CLI

   ```bash
   npm install -g vercel
   vercel
   ```

## Customization for Users

Users can:

- **Generate Signatures**: Enter details and select a logo from the pre-defined options
- **Adjust Style Settings**: Modify font weights and spacing through the Style Settings page
- **Export**: Download as a transparent PNG for use in email clients

## License

MIT
