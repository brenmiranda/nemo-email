# Email Signature Generator

A web application that generates on-brand email signatures with customizable settings.

## Features

- Create email signatures with employee name, position, phone number, and email
- Display contact information in the format "phone number | email address"
- Add company logo from your GitHub repository
- Customize font weights for different fields
- Adjust spacing between lines
- Export signature as transparent PNG
- Admin panel for configuring settings

## Project Structure

```
signature-generator/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── page.js      # Main page
│   │   ├── layout.js    # Root layout
│   │   ├── globals.css  # Global styles
│   │   └── admin/       # Admin panel routes
│   │       └── page.js
│   ├── components/      # React components
│   │   ├── SignatureForm.js
│   │   ├── SignaturePreview.js
│   │   ├── AdminPanel.js
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

3. **Prepare your font and image files**

   This application uses direct URLs to your fonts and logos. Make sure they're publicly accessible through URLs.

4. **Configure the application**

   Go to the Admin Panel and set your font and logo URLs. For fonts, you'll need URLs for:
   
   - Regular weight (400)
   - Medium weight (500)
   - Bold weight (700)

   And for logos, add direct URLs to your image files.

5. **Add your logos**

   In the Admin Panel, add the filenames of your logo images located in your GitHub repository.

6. **Update font settings (optional)**

   If you want to use your own fonts, modify the @font-face declarations in `src/app/globals.css` to point to your font files.

7. **Start the development server**

   ```bash
   npm run dev
   ```

8. **Build for production**

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

## Customization

- **Font Weights**: Set different font weights for each field in the Admin Panel
- **Spacing**: Adjust the space between lines and the left buffer
- **Logos**: Add or remove logo options by providing direct URLs
- **Font URLs**: Update the URLs for each font weight (Regular, Medium, Bold)

## License

MIT
