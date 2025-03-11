import NextAuth, { AuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

const authOptions: AuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        if (profile) {
          token.id = (profile as any).id;
          token.email = (profile as any).email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export default handler;
