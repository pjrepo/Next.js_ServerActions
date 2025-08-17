export const metadata = {
  title: 'Todos • Server Components + Server Actions',
  description: 'Fetch on the server, pass props down. Use Server Actions for writes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial'}}>
        <main style={{maxWidth: 900, margin: '2rem auto', padding: '0 1rem'}}>
          {children}
        </main>
      </body>
    </html>
  )
}
