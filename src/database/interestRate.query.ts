export const RATE_QUERY = {
  SELECT_RATE: 'SELECT * FROM interest_rates WHERE id = ?',
  CREATE_RATE: 'INSERT INTO interest_rates(interest_rate) VALUES (?);',
};
