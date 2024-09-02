package com.backinformal.BackInFormal_Backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backinformal.BackInFormal_Backend.DTO.DeleteItemsDTO;
import com.backinformal.BackInFormal_Backend.DTO.InvoiceDetailsDTO;
import com.backinformal.BackInFormal_Backend.DTO.InvoiceNumAndCustNameDTO;
import com.backinformal.BackInFormal_Backend.DTO.ItemDTO;
import com.backinformal.BackInFormal_Backend.entity.Customer;
import com.backinformal.BackInFormal_Backend.entity.InvoiceItemsList;
import com.backinformal.BackInFormal_Backend.entity.ItemData;
import com.backinformal.BackInFormal_Backend.entity.MainInvoice;
import com.backinformal.BackInFormal_Backend.repository.CustomerRepository;
import com.backinformal.BackInFormal_Backend.repository.InvoiceItemsListRepository;
import com.backinformal.BackInFormal_Backend.repository.ItemRepositroy;
import com.backinformal.BackInFormal_Backend.repository.MainInvoiceRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class InvoiceServiceImpl implements IInvoiceService{

	@Autowired
	private MainInvoiceRepository invoiceRepo;
	
	@Autowired
	private CustomerRepository custRepo;
	
	@Autowired
	private InvoiceItemsListRepository invoiceItemListRepo;
	
	@Autowired
	private ItemRepositroy itemsRepo;

	@Override
	public ResponseEntity<?> addInvoiceData(InvoiceDetailsDTO invoiceObj) {
		// TODO Auto-generated method stub
		//Customer custObj = custRepo.findByCustEmail(invoiceObj.getCustomer().getCustEmail()).get();
		Customer custObj = invoiceObj.getCustomer();
		
		InvoiceItemsList invcItemList = new InvoiceItemsList();
		invcItemList.setCustId(custObj);
		
		for(ItemDTO it: invoiceObj.getItemsList())
		{
			ItemData itemObj = new ItemData();
			itemObj.setItemCode(it.getItemCode());
			itemObj.setItemName(it.getItemName());
			itemObj.setGstRate(it.getGstRate());
			itemObj.setQuantity(it.getQuantity());
			itemObj.setItemPrice(it.getItemPrice());
			itemObj.setTotalPrice(it.getTotalPrice());
			itemObj.setInvoiceId(invcItemList);
			invcItemList.getItemDataList().add(itemObj);
		
		}
		
		InvoiceItemsList addedItemsObj= invoiceItemListRepo.save(invcItemList);
		
		MainInvoice invcAdd = new MainInvoice();
		invcAdd.setInvoiceListId(addedItemsObj);
		invcAdd.setCustomer(custObj);
		invcAdd.setSubTotal(invoiceObj.getSubTotal());
		invcAdd.setNetTotal(invoiceObj.getNetTotal());
		invcAdd.setAmtReceived(invoiceObj.getAmtReceived());
		invcAdd.setAmtUnpaid(invoiceObj.getAmtUnpaid());
		
		LocalDate tod = LocalDate.now();
	    String month = (tod.getMonthValue() <10)?"0"+tod.getMonthValue(): String.valueOf(tod.getMonthValue())  ;
	    String date = (tod.getDayOfMonth()<10)?"0"+tod.getDayOfMonth():String.valueOf(tod.getDayOfMonth());
	    int year = tod.getYear() %100;
	    
		String autoInvoiceNumCreation = year+month+date+addedItemsObj.getInvoiceItemId();
		
		invcAdd.setUniqueInvoiceNumber(autoInvoiceNumCreation);
		invoiceRepo.save(invcAdd);
		
		return new ResponseEntity<>("Invoice added Successfully", HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> getAllInvoices() {
		// TODO Auto-generated method stub
		return ResponseEntity.ok(invoiceRepo.findAll());
	}

	@Override
	public ResponseEntity<?> displayInvoiceNumberAndCustName() {
		// TODO Auto-generated method stub
		List<InvoiceNumAndCustNameDTO> list= invoiceRepo.findAllInvoiceNumAndCustName();
		return ResponseEntity.ok(list);
	}

	@Override
	public ResponseEntity<?> getInvoiceDetailByUniqueCode(String invoiceNum) {
		// TODO Auto-generated method stub
		MainInvoice fetchInvoice= invoiceRepo.findByUniqueInvoiceNumber(invoiceNum);
		return ResponseEntity.ok(fetchInvoice);

	}

	@Override
	public ResponseEntity<?> deleteItemList(DeleteItemsDTO delItemsList) {
		// TODO Auto-generated method stub
		itemsRepo.deleteAllById(delItemsList.getItemsIDsList());
		return ResponseEntity.ok("Deleted Successfully");
	}
}
