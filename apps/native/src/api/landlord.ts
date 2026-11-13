import type { components } from '@crossub-thongz/api-contract';

import { crossub, unwrap } from '@/src/api/client';

export type LandlordProperty = components['schemas']['LandlordPropertyResponseDto'];
export type LandlordApproval = components['schemas']['LandlordApprovalResponseDto'];
export type LandlordMonthlyStatement = components['schemas']['LandlordMonthlyStatementResponseDto'];
export type ApprovalDecision = components['schemas']['DecideApprovalDto']['status'];

async function allProperties(): Promise<LandlordProperty[]> {
  const rows: LandlordProperty[] = [];
  for (let page = 1; page <= 20; page += 1) {
    const data = await unwrap(await crossub.GET('/landlord/properties', { params: { query: { page, pageSize: 100 } } }));
    rows.push(...data.items);
    if (!data.hasMore || data.items.length === 0) break;
  }
  return rows;
}

export const landlordApi = {
  properties: allProperties,
  approvals: () => unwrap(crossub.GET('/landlord/approvals')),
  monthlyStatements: () => unwrap(crossub.GET('/landlord/statements/monthly')),
  decideApproval: (approvalId: string, status: Exclude<ApprovalDecision, 'MORE_INFO'>) =>
    unwrap(crossub.PATCH('/landlord/approvals/{approvalId}', { params: { path: { approvalId } }, body: { status } })),
};
