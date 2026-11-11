import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Approval = {
  id: string;
  title: string;
  detail: string;
  amount: string;
  decision: 'Pending' | 'Approved' | 'Declined';
};

const seed: Approval[] = [
  {
    id: 'hot-water',
    title: 'Hot water replacement',
    detail: '88 Berry Street · contractor quote, owner approval required',
    amount: '$640.00',
    decision: 'Pending',
  },
  {
    id: 'rent-review',
    title: 'Rent review',
    detail: 'Proposed weekly rent $1,200 from 15 Dec 2026',
    amount: '$1,200 / week',
    decision: 'Pending',
  },
];

type Api = {
  approvals: Approval[];
  decide: (id: string, decision: 'Approved' | 'Declined') => void;
};

const PortfolioContext = createContext<Api | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [approvals, setApprovals] = useState(seed);
  const value = useMemo<Api>(
    () => ({
      approvals,
      decide: (id, decision) => {
        setApprovals((current) => current.map((item) => (item.id === id ? { ...item, decision } : item)));
      },
    }),
    [approvals],
  );
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error('usePortfolio must be used inside PortfolioProvider');
  return value;
}
