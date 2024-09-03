package com.backinformal.BackInFormal_Backend.repository;

import com.backinformal.BackInFormal_Backend.entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankDetailsRepository extends JpaRepository<BankDetails,Long> {

   Optional<BankDetails> findByAccountNumber(String accountNumber);

}
