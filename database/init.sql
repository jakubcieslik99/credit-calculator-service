CREATE DATABASE IF NOT EXISTS credit_calculator_service;

USE credit_calculator_service;

DROP TABLE IF EXISTS calculations;

CREATE TABLE calculations
(
  id                      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  interest_rate           VARCHAR(255) DEFAULT NULL,
  interest                VARCHAR(255) DEFAULT NULL,
  value_of_installment    VARCHAR(255) DEFAULT NULL,
  value_of_installment_ir VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) AUTO_INCREMENT = 1;

DROP TABLE IF EXISTS interest_rates;

CREATE TABLE interest_rates
(
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  interest_rate VARCHAR(255) DEFAULT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) AUTO_INCREMENT = 1;
