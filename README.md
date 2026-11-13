# crossub_mobile_landlord_v2

Owner app for CROSSUB. Expo client, same toolchain and app icon as the inspector app. Bundle id: `com.crossub.landlord`.

This repository is the native owner app. The owner website remains `crossub_mobile_landlord_app` (Next.js, port 3005). Both talk to the same `/api/v1` landlord contract. This app does not replace that portal.

Portfolio, approvals, and statement totals come from the signed-in owner's account. The screens do not show a tenant phone number, login, or a tenant ledger line.

```bash
pnpm install
pnpm dev:native
```

Sign in with an owner account (`LANDLORD`).
