/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return */

// @ts-expect-error
import ChromeWebStore from 'webextension-store-meta/lib/chrome-web-store';

const extensionIds = {
  chrome: 'akomlegpokabommpdjfmhnbdcnaefmdo',
  edge: 'fpknfiaimmgbbpplehjclidiphmhljeh',
  firefox: '{16acb437-3c59-4caf-a4b2-d79839cbf588}',
};

export interface ExtensionStatsData {
  users: number;
  ratingValue: number;
  ratingCount: number;
}

export default async function getExtensionStatsData(): Promise<ExtensionStatsData> {
  const stats: ExtensionStatsData[] = await Promise.all([
    // @ts-expect-error
    ChromeWebStore.load({id: extensionIds.chrome}).then((v) => v.meta()),
    fetch(
      `https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/${extensionIds.edge}`,
    )
      .then(async (v) => v.json())
      .then((v) => ({
        users: v.activeInstallCount,
        ratingValue: v.averageRating,
        ratingCount: v.ratingCount,
      })),
    fetch(
      `https://addons.mozilla.org/api/v4/addons/addon/${extensionIds.firefox}`,
    )
      .then(async (v) => v.json())
      .then((v) => ({
        users: v.average_daily_users,
        ratingValue: v.ratings.average,
        ratingCount: v.ratings.count,
      })),
  ]);

  const totalRatingCount = stats.reduce(
    (count, stats) => count + stats.ratingCount,
    0,
  );
  const totalRatingValue = stats.reduce(
    (value, stats) =>
      value + stats.ratingValue * (stats.ratingCount / totalRatingCount),
    0,
  );
  const totalUsers = stats.reduce((users, stats) => users + stats.users, 0);

  return {
    users: totalUsers,
    ratingValue: totalRatingValue,
    ratingCount: totalRatingCount,
  };
}
