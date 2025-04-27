import Link from "next/link";

export default function MerchantApplicationSubmitted() {
   return (
      <main className="hero-pattern flex min-h-screen items-center justify-center bg-gray-50 p-8">
         <div className="mx-auto w-full max-w-2xl">
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
               <div className="flex flex-col items-center space-y-8 text-center">
                  <div className="rounded-full bg-green-50 p-6">
                     <div className="rounded-full bg-green-100 p-4">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="32"
                           height="32"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           className="h-12 w-12 text-green-600"
                        >
                           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                           <path d="m9 11 3 3L22 4" />
                        </svg>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <h1 className="text-3xl font-bold text-gray-900">Application Received</h1>
                     <p className="text-lg text-gray-600">
                        We&apos;ve successfully received your merchant application. Our team will
                        carefully review it and notify you via email once a decision is made.
                     </p>
                  </div>
                  <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
                     <p className="text-sm leading-relaxed text-gray-600">
                        Thank you for choosing our platform. We typically process applications
                        within 2-3 business days. Please ensure your contact information is
                        up-to-date.
                     </p>
                  </div>
                  <div className="flex flex-col gap-4 pt-4">
                     <p className="text-sm text-gray-600">
                        Questions?{" "}
                        <a
                           href="mailto:support@example.com"
                           className="font-medium text-sky-600 transition-colors duration-200 hover:text-sky-500"
                        >
                           Reach out to us
                        </a>
                     </p>
                     <Link
                        href="/"
                        className="group flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-sky-600 transition-colors duration-200 hover:bg-sky-50"
                     >
                        <span>Explore our marketplace while you wait</span>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        >
                           <path d="M5 12h14" />
                           <path d="m12 5 7 7-7 7" />
                        </svg>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}
