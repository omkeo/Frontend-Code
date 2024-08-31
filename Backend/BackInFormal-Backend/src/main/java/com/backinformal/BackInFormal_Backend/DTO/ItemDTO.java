package com.backinformal.BackInFormal_Backend.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {

	private String itemCode;
	private String itemName;
	private int quantity;
	private double itemPrice;
	private double totalPrice;
	
	
}
