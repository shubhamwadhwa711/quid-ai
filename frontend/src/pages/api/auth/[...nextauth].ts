import NextAuth, { AuthOptions, TokenSet, User } from "next-auth";
import LinkedInProvider, {
  LinkedInProfile,
} from "next-auth/providers/linkedin";
// import type { OAuthConfig } from "next-auth/providers";
import axios from "axios";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    error?: "RefreshAccessTokenError";
    user: User;
    provider: {
      profile: LinkedInProfile;
      tokens: TokenSet;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    error?: "RefreshAccessTokenError";
    user: User;
    provider: {
      profile: LinkedInProfile;
      tokens: TokenSet;
    };
  }
}

const TOKEN_ERROR = "RefreshAccessTokenError";
const isTokenValid = (expiresAt: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return expiresAt > currentTime;
};
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_BACKEND_URL}/auth/token-refresh/`,
      { refresh: token.refresh }
    );
    if (status !== 200) {
      throw new Error("Failed to refresh token");
    }
    // const decoded = jwtDecode<{ exp: number }>(data.access);

    return {
      ...token,
      access_token: data.access,
      // expires_at: decoded.exp,
      error: undefined,
    };
  } catch (err) {
    console.error("Token refresh failed:", err);
    return {
      ...token,
      error: TOKEN_ERROR,
    };
  }
}
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
      async profile(profile: LinkedInProfile, tokens: TokenSet) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_BACKEND_URL}/auth/convert-token/`,
            {
              grant_type: "convert_token",
              backend: "linkedin-openidconnect",
              client_id: process.env.SSO_CLIENT_ID,
              client_secret: process.env.SSO_CLIENT_SECRET,
              token: tokens?.access_token,
            }
          );
          console.log("Token exchange successful:", response.data);
          const qProfile = response.data;
          return {
            id: qProfile.id ?? 1,
            user: {
              id: qProfile.user.id ?? 1,
              name: qProfile.user.first_name + qProfile.user.last_name,
              email: qProfile.user.email,
              image: profile.picture,
            },
            provider: {
              profile,
              tokens,
            },
            access_token: qProfile.access_token,
            refresh_token: qProfile.refresh_token,
            expires_at: Math.floor(Date.now() / 1000) + qProfile.expires_in,
          };
        } catch (error) {
          console.error(
            "Token exchange failed:",
            error.response?.data || error
          );
          throw new Error("Profile not found");
        }
      },
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
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    },
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // More secure token generation
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          id: profile?.sub || profile?.id,
        };
      }
      if (isTokenValid(token.expires_at)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token.error) {
        session.error = token.error;
      }
      session.access_token = token.access_token;
      session.user = token.user;
      session.provider = token.provider;
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
