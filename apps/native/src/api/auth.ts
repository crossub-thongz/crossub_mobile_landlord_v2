import { crossub, unwrap } from '@/src/api/client';
import { clearSession, getRefreshToken, saveSession } from '@/src/auth/session';
import { isLandlordUser, parseAuthUser, type AuthUser } from '@/src/auth/types';

export async function loginWithPassword(email: string, password: string): Promise<AuthUser> {
  const body = await unwrap(
    await crossub.POST('/auth/login', {
      body: { email: email.trim().toLowerCase(), password },
    }),
  );
  const user = parseAuthUser(body.user);
  if (!body.accessToken || !body.refreshToken || !user) {
    throw new Error('Sign in failed.');
  }
  if (!isLandlordUser(user)) {
    throw new Error('This app is for property owners. Tenant accounts use the CROSSUB tenant app.');
  }
  await saveSession({ accessToken: body.accessToken, refreshToken: body.refreshToken }, user);
  return user;
}

export async function logoutRequest(): Promise<void> {
  const refreshToken = await getRefreshToken();
  try {
    if (refreshToken) {
      await unwrap(await crossub.POST('/auth/logout', { body: { refreshToken } }));
    }
  } catch {
    // The local session is cleared either way.
  }
  await clearSession();
}
