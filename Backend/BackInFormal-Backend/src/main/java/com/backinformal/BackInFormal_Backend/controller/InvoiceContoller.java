package com.backinformal.BackInFormal_Backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backinformal.BackInFormal_Backend.DTO.InvoiceDetailsDTO;
import com.backinformal.BackInFormal_Backend.service.IInvoiceService;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceContoller {

	@Autowired
	private IInvoiceService invoiceService;
	
	
	@PostMapping("/add-invoice")
	ResponseEntity<?> insertInvoiceDetails(@RequestBody InvoiceDetailsDTO invoiceObj )
	{
		return invoiceService.addInvoiceData(invoiceObj);
	}
	
	@GetMapping("/all-invoices")
	ResponseEntity<?> allInvoiceList()
	{
		return invoiceService.getAllInvoices();
	}
	
	@GetMapping("/invoice-list")
	ResponseEntity<?> getInvoiceNumberAndCustName()
	{
		return invoiceService.displayInvoiceNumberAndCustName();
	}
}
