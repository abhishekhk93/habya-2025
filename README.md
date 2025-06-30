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


10. T shirt price and description. Fetch price from outside. Fix size chart 
8. Payment calculation verification in backend
21. Validate OTP sending failed. 
28. Payment log - frontend pages to view cart. 
29. Transaction ID of UPI map to payment ID of razorpay
30. Add enough credits to Twilio, Vercel. 
25. Stress test
26. Restrict access to DB
27. Snapshot of DB
22. Add table for counter_coupons and handle the logic to redeem
23. Dropdowns for t shirt details coming in white
12. Use phone number to fetch coupons of a user
22. Cascade schema of Users (and all apllicable tables) to delete and update
4. Dashboard // In progress

1. Log payment // Taken care as a part of webhooks
2. Webhooks - payment successful, but DB query failed
9. Enable limit to the event restrictions // Done
10. Redeem coupons (make sure time is IST) // Done
7. Deploy and test // Done
17. Keep JWT secrets in secure place // Done


Bugs:
1. Fix send OTP for other numbers // Done
2. Fix send OTP layout // Done
3. Fix edit-profile saving changes (profile state showing old data)
4. DB actions are slow // No action required
5. Event 21 validation failed. User id 1020 and 1006, 1002, 1008 // Done
6. Clickable links to be extended on  Hamburger menu // Done
7. Brackets for lunch + snack descriptions. also "will appear as separate entries in your order post payment completion" // Done
8. Add time stamps for all coupons // Done
9. Decrement button to have left margin for coupons // Done

18. Add profile form redesign, Profile saved form redesign // Done
19. Remove redirect page display for a public path.  // Done
11. Clear cart after payment // Done
15. Post payment, show correct message instead of processing // Done
13. Custom amount for sponsorship // Done
20. "Edit-profile" component. // Done
14. Add size chart for shirt, custom options // Done
16. OTP input box - on clearing, it should go to the previous box // Done
3. Login re-implement// Done
5. Buy coupons // Done
6. Insert to DB - including handling all cases // Done
   6.a. - Test each DB query rigorously - very important. both when data exists, and doesn't