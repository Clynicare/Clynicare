import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              googleId: user.id,
              image: user.image
            })
          })
          return response.ok
        } catch (error) {
          console.error('Google sign-in error:', error)
          return false
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/Login',
    error: '/Login'
  }
})

export { handler as GET, handler as POST }