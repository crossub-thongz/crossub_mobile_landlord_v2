# crossub_mobile_landlord_v2

Owner app for CROSSUB. Expo client, same toolchain and app icon as the inspector app. Bundle id: `com.crossub.landlord`.

This repository is the native shell. The current owner website remains `crossub_mobile_landlord_app` (Next.js, port 3005) and already talks to the API. This app does not replace that portal.

The first product pass is the tenant app in `crossub_mobile_tenant_v2`. Owner screens here are a local preview of the decisions an owner actually takes: portfolio, approvals, and statement totals. They do not show another person's phone number, login, or a tenant ledger line that the owner is not meant to see.

```bash
pnpm install
pnpm dev:native
```

Sign in with any email and password.
