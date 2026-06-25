import NextAuthProvider from './_components/next-auth.provider'
import ReactQueryProvider from './_components/react-query.provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        {children}
      </NextAuthProvider>
    </ReactQueryProvider>
  )
}