import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { ApiError } from '@/src/api/client';
import { landlordApi, type LandlordApproval, type LandlordMonthlyStatement, type LandlordProperty } from '@/src/api/landlord';
import { useAuth } from '@/src/auth';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'] as const;
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function money(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—';
  return value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
}

export function monthLabel(token: string): string {
  const [mon, year] = token.split('-');
  const index = MONTHS.indexOf(mon.toLowerCase() as (typeof MONTHS)[number]);
  if (index < 0) return token;
  return `${MONTH_NAMES[index]} ${year ?? ''}`.trim();
}

function currentMonthToken(): string {
  const now = new Date();
  return `${MONTHS[now.getMonth()]}-${now.getFullYear()}`;
}

export function decisionLabel(status: LandlordApproval['status']): string {
  if (status === 'APPROVED') return 'Approved';
  if (status === 'DECLINED') return 'Declined';
  if (status === 'MORE_INFO') return 'More info';
  return 'Pending';
}

type PortfolioApi = {
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;
  properties: LandlordProperty[];
  approvals: LandlordApproval[];
  statements: LandlordMonthlyStatement[];
  collectedThisMonth: number;
  reload: () => void;
  decide: (id: string, decision: 'Approved' | 'Declined') => Promise<void>;
};

const PortfolioContext = createContext<PortfolioApi | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { status: authStatus } = useAuth();
  const [status, setStatus] = useState<PortfolioApi['status']>('idle');
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<LandlordProperty[]>([]);
  const [approvals, setApprovals] = useState<LandlordApproval[]>([]);
  const [statements, setStatements] = useState<LandlordMonthlyStatement[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (authStatus !== 'authed') {
      setProperties([]);
      setApprovals([]);
      setStatements([]);
      setStatus('idle');
      setError(null);
      return;
    }
    let cancelled = false;
    setStatus('loading');
    setError(null);
    Promise.all([landlordApi.properties(), landlordApi.approvals(), landlordApi.monthlyStatements()])
      .then(([nextProperties, nextApprovals, nextStatements]) => {
        if (cancelled) return;
        setProperties(nextProperties);
        setApprovals(nextApprovals);
        setStatements(nextStatements);
        setStatus('ready');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof ApiError || err instanceof Error ? err.message : 'Could not load the portfolio.';
        setError(message);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [authStatus, reloadKey]);

  const reload = useCallback(() => setReloadKey((value) => value + 1), []);

  const decide = useCallback(async (id: string, decision: 'Approved' | 'Declined') => {
    const updated = await landlordApi.decideApproval(id, decision === 'Approved' ? 'APPROVED' : 'DECLINED');
    setApprovals((current) => current.map((item) => (item.id === id ? updated : item)));
  }, []);

  const collectedThisMonth = useMemo(() => {
    const token = currentMonthToken();
    return statements.filter((item) => item.month.toLowerCase() === token).reduce((sum, item) => sum + item.rentReceived, 0);
  }, [statements]);

  const value = useMemo<PortfolioApi>(
    () => ({ status, error, properties, approvals, statements, collectedThisMonth, reload, decide }),
    [approvals, collectedThisMonth, decide, error, properties, reload, statements, status],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error('usePortfolio must be used inside PortfolioProvider');
  return value;
}
