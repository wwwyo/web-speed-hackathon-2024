import { inject } from 'regexparam';

import type { GetRankingListRequestQuery } from '@wsh-2024/schema/src/api/rankings/GetRankingListRequestQuery';
import type { GetRankingListResponse } from '@wsh-2024/schema/src/api/rankings/GetRankingListResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';
import { fetchApi } from '../../../lib/api/apiClient';

type RankingApiClient = DomainSpecificApiClientInterface<{
  fetchList: [{ query: GetRankingListRequestQuery }, GetRankingListResponse];
}>;

export const rankingApiClient: RankingApiClient = {
  fetchList: async ({ query }) => {
    return await fetchApi<GetRankingListResponse>(inject('/api/v1/rankings', {}), query);
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/rankings`,
    ...options,
  }),
};
