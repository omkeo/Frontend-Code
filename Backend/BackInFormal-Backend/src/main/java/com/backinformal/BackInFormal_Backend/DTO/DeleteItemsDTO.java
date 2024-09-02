package com.backinformal.BackInFormal_Backend.DTO;

import java.util.ArrayList;
import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeleteItemsDTO {

//	private List<ItemDTO> itemsList = new ArrayList<>();
	private List<Long> itemsIDsList = new ArrayList<>();
}