import './globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: 'Flare',
  description: 'Access developers project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
        {children}
        </main>
        <Footer />
        </body>
    </html>
  )
}
