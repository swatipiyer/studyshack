import './globals.css'

export const metadata = {
  title: 'The Study Shack - Your Cozy Corner for Learning',
  description: 'A warm, welcoming space for ultra-fast AI tutoring. Powered by Friendli AI.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
