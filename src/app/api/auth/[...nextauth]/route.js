import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import OTP from "@/models/OTP";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { mobile, otp } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("مشکلی در سرور رخ داده است.");
        }

        if (!otp) throw new Error("لطفا کد ارسال شده را وارد کنید");

        const user = await OTP.findOne({ mobile });

        if (!user) throw new Error("لطفا ابتدا حساب کاربری ایجاد کنید");

        const isValid = otp === user.otp; // Check if the provided code matches the stored OTP

        if (!isValid) throw new Error("کد وارد شده اشتباه است");

        console.log("Authorize function returning:", { mobile });
        return { mobile };
      },
    }),
  ],
  callbacks: {
    // Add the `mobile` field to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.mobile = user.mobile; // Pass the `mobile` field from the user object to the token
      }
      return token;
    },
    // Add the `mobile` field to the session object
    async session({ session, token }) {
      session.user.mobile = token.mobile; // Pass the `mobile` field from the token to the session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
