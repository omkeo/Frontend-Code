package com.backinformal.BackInFormal_Backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceNumAndCustNameDTO {

	private String uniqueInvoiceNumber;
	private String custName;
}
