import NextAuth, { AuthOptions } from "next-auth";
import LinkedInProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";
// import type { OAuthConfig } from "next-auth/providers";

const authOptions: AuthOptions = {
  // Enable debug only in development
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      client: { token_endpoint_auth_method: "client_secret_post" },
      issuer: "https://www.linkedin.com",
      profile: (profile: LinkedInProfile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],

  // Optional: customize authentication pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // More secure token generation
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          id: profile?.sub || profile?.id,
        };
      }
      return token;
    },
    async signIn({ user, profile, account }) {
      console.log(
        "user :",
        user,
        " profile : ",
        profile,
        " account : ",
        account
      );
      return true;
    },
    async session({ session, token }) {
      // Attach additional information to session
      if (session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Strict redirect handling
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  events: {
    async signIn(message) {
      console.log("Successful Sign In", {
        user: message.user,
        account: message.account,
      });
    },
    async signOut(message) {
      console.log("Sign Out", message);
    },
    async createUser(message) {
      console.log("New User Created", message.user);
    },
  },

  // Add some additional security configurations
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Optional: Add additional error handling
  theme: {
    colorScheme: "auto", // or 'light' or 'dark'
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default handler;
