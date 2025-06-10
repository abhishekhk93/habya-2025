This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## TODOs

1. Additional calls happening in Home page due to useEffect in providers - triggering /sign-in followed by /api/verify-token

2. Reaching profile-setup after logging in or even edit profile enablement

3. After clearing cookie or logout, we need to set the redux state to null as well. It is easily done in client side. Do it in server side as well. Otherwise, upon redirection, it directly goes to OTP input page. 




1. Log payment
2. Webhooks
3. Login re-implement// Done
4. Dashboard
5. Buy coupons // Done
6. Insert to DB - including handling all cases // Done
   6.a. - Test each DB query rigorously - very important. both when data exists, and doesn't
7. Deploy and test
8. Payment calculation verification in backend
9. Enable limit to the event restrictions
10. Redeem coupons
11. Clear cart after payment // Done
12. Use phone number to fetch coupons of a user
13. Custom amount for sponsorship
14. Add size chart for shirt, custom options
15. Post payment, show correct message instead of processing
16. OTP input box - on clearing, it should go to the previous box
17. Keep JWT secrets in secure place
18. Add profile form redesign, Profile saved form redesign // Done
19. Remove redirect page display for a public path.  // Done
20. "Edit-profile" component. 
21. Validate OTP sending failed. 
22. Cascade schema of Users (and all apllicable tables) to delete and update
