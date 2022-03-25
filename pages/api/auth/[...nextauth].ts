import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID || "",
            clientSecret: process.env.TWITTER_SECRET || "",
            version: "2.0"
        })
    ],
    callbacks: {
        async session({ session, user, token }){
            session.accessToken = token.accessToken
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }){
            if(account) token.accessToken = account.access_token
            return token
        }
    }
})