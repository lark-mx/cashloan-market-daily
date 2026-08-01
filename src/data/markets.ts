export const markets = [
  { id: 'argentina', name: '阿根廷', region: 'latin-america', regionName: '拉丁美洲' },
  { id: 'colombia', name: '哥伦比亚', region: 'latin-america', regionName: '拉丁美洲' },
  { id: 'peru', name: '秘鲁', region: 'latin-america', regionName: '拉丁美洲' },
  { id: 'mexico', name: '墨西哥', region: 'latin-america', regionName: '拉丁美洲' },
  { id: 'guatemala', name: '危地马拉', region: 'latin-america', regionName: '拉丁美洲' },
  { id: 'dominican-republic', name: '多米尼加', region: 'latin-america', regionName: '拉丁美洲' },
  { id: 'vietnam', name: '越南', region: 'southeast-asia', regionName: '东南亚' },
  { id: 'kenya', name: '肯尼亚', region: 'africa', regionName: '非洲' }
] as const;

export const regionLabels: Record<string, string> = {
  all: '全部市场',
  'latin-america': '拉丁美洲',
  'southeast-asia': '东南亚',
  africa: '非洲'
};

export const marketRegion = (id: string) => markets.find(m => m.id === id)?.region ?? 'other';
