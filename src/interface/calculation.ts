export interface Calculation {
  interestRate: string; //referencyjna stopa procentowa
  interest: string; //oprocentowanie
  valueOfInstallment: string; //wartość raty
  valueOfInstallmentIR: string; //wartość raty przy referencyjnej stopie procentowej
}

export interface CalculationRequest {
  numberOfInstallments: number;
  financingValue: number;
  interest: number;
  email?: string;
}
