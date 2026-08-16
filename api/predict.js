const FOOTBALL_API_KEY = 'c193872bdf2840ec86479caf47d36e20';

export default async function handler(req, res) {
  const { type, dateFrom, dateTo, code } = req.query;
  try {
    let url;
    if (type === 'standings') {
      url = `https://api.football-data.org/v4/competitions/${code}/standings`;
    } else {
      url = `https://api.football-data.org/v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    }
    const r = await fetch(url, { headers: { 'X-Auth-Token': FOOTBALL_API_KEY } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
