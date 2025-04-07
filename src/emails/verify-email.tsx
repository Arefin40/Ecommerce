import {
   Body,
   Container,
   Head,
   Heading,
   Html,
   Img,
   Link,
   Row,
   Section,
   Tailwind,
   Text,
   Font
} from "@react-email/components";
import type * as React from "react";

interface EmailProps {
   name?: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const EmailVerificationEmail = ({ name }: EmailProps) => {
   return (
      <Html>
         <Head>
            <Font
               fontFamily="Mulish"
               fallbackFontFamily="Georgia"
               webFont={{
                  url: "https://fonts.googleapis.com/css?family=Mulish",
                  format: "woff2"
               }}
               fontWeight={400}
               fontStyle="normal"
            />
         </Head>
         <Tailwind
            config={{
               theme: {
                  extend: {
                     colors: {
                        brand: "rgb(55 114 255)"
                     },
                     spacing: {
                        0: "0px",
                        20: "20px",
                        45: "45px"
                     },
                     boxShadow: {
                        card: "0 0 12px 4px rgba(0, 0, 0, 0.05)"
                     }
                  }
               }
            }}
         >
            <Body className="bg-gray-50 font-sans text-base">
               <Img
                  src={`${baseUrl}/static/shobai-logo.svg`}
                  height="24"
                  alt="SHOBAI"
                  className="mx-auto my-20"
               />
               <Container className="rounded-2xl border bg-white p-45 text-base">
                  <Heading className="my-0 text-center leading-8">Verify Email</Heading>

                  <Section className="mt-6">
                     {name && <Text>Hi {name},</Text>}

                     <Row>
                        <Text>
                           Welcome to SHOBAI marketplace! To complete your registration, please
                           verify your email address by following the link below:
                        </Text>
                     </Row>
                  </Section>

                  <Section className="text-center">
                     <Link className="text-brand">Verify Email</Link>
                  </Section>

                  <Container className="mt-4">
                     <Section>
                        <Text>
                           For security reasons, this link will expire in 1 hour. If you didn&apos;t
                           sign up, you can ignore this email. Need help? We&apos;re here for you!{" "}
                           <Link>Contact Support</Link>.
                        </Text>

                        <Text>Looking forward to having you on board! 🚀</Text>
                     </Section>
                  </Container>
               </Container>

               <Container className="mt-20">
                  <Text className="mb-45 text-center text-gray-400">
                     SHOBAI Limited., 74/A Green Rd, Dhaka 1205
                  </Text>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   );
};

export default EmailVerificationEmail;
