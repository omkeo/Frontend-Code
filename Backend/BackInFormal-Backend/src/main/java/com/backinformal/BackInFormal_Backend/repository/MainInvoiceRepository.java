package com.backinformal.BackInFormal_Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backinformal.BackInFormal_Backend.DTO.InvoiceNumAndCustNameDTO;
import com.backinformal.BackInFormal_Backend.entity.MainInvoice;

@Repository
public interface MainInvoiceRepository extends JpaRepository<MainInvoice, Long>{

	@Query("SELECT new com.backinformal.BackInFormal_Backend.DTO.InvoiceNumAndCustNameDTO(i.uniqueInvoiceNumber,i.customer.custName) FROM MainInvoice i")
	List<InvoiceNumAndCustNameDTO> findAllInvoiceNumAndCustName();

}
