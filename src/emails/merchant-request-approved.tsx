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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const MerchantRequestApprovedEmail = ({ name }: EmailProps) => {
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
            <Body className="flex h-screen items-center justify-center bg-gray-50 font-sans text-base text-black">
               <Container className="text-base">
                  <Container className="rounded-2xl border bg-white px-45 pt-10 pb-4">
                     <Img
                        src="https://res.cloudinary.com/arefin40/image/upload/v1745733229/shobai/st7rwd3iijoi0lfcgnih.png"
                        height="16"
                        alt="SHOBAI"
                        className="mx-auto"
                     />

                     <Heading as="h4" className="my-0 mt-5 mb-3 text-center leading-8">
                        You just started a new business. Congrats!
                     </Heading>

                     <Img
                        src="https://res.cloudinary.com/arefin40/image/upload/v1745733229/shobai/ahskonbqhy7njrfcbkbo.png"
                        height="128"
                        alt="confetti"
                        className="mx-auto"
                     />

                     <Section className="mt-6">
                        {name && <Text>Hi {name},</Text>}

                        <Row>
                           <Text>
                              Great news! Your request to become a merchant on SHOBAI has been
                              approved. You can now start listing your products and growing your
                              business with us!
                           </Text>
                        </Row>
                     </Section>

                     <Section className="text-sm">
                        <Heading as="h4">Next Steps:</Heading>
                        <Text>
                           ✅ Log in to your account:{" "}
                           <Link href={`${baseUrl}/stores/create`}>Go to Dashboard</Link>
                           <br />✅ Set up your store details
                           <br />✅ Start adding products and selling 🚀
                        </Text>
                     </Section>

                     <Section>
                        <Text>
                           If you need any assistance, our support team is here to help—Contact Us.
                           We&apos;re excited to have you on board and can&apos;t wait to see your
                           success!
                        </Text>
                     </Section>
                  </Container>

                  <Container>
                     <Text className="text-center text-gray-400">
                        SHOBAI Limited., 74/A Green Rd, Dhaka 1205
                     </Text>
                  </Container>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   );
};

export default MerchantRequestApprovedEmail;
