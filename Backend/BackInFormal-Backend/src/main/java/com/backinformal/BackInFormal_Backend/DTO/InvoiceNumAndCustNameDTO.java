package com.backinformal.BackInFormal_Backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class InvoiceNumAndCustNameDTO {

	private String uniqueInvoiceNumber;
	private String custName;
	public InvoiceNumAndCustNameDTO(String uniqueInvoiceNumber, String custName) {
		super();
		this.uniqueInvoiceNumber = uniqueInvoiceNumber;
		this.custName = custName;
	}
	public InvoiceNumAndCustNameDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getUniqueInvoiceNumber() {
		return uniqueInvoiceNumber;
	}
	public void setUniqueInvoiceNumber(String uniqueInvoiceNumber) {
		this.uniqueInvoiceNumber = uniqueInvoiceNumber;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	
	
}
