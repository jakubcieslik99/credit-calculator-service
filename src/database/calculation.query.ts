export const CALCULATION_QUERY = {
  SELECT_CALCULATION: 'SELECT * FROM calculations WHERE id = ?',
  CREATE_CALCULATION:
    'INSERT INTO calculations(interest_rate, interest, value_of_installment, value_of_installment_ir) VALUES (?, ?, ?, ?);',
};
