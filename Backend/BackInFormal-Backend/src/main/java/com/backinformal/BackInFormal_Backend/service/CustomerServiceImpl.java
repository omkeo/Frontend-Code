package com.backinformal.BackInFormal_Backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.backinformal.BackInFormal_Backend.entity.Customer;
import com.backinformal.BackInFormal_Backend.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService{

	@Autowired
	private CustomerRepository custRepo;

	@Override
	public ResponseEntity<?> addNewCustomerDetails(Customer custObj) {
		// TODO Auto-generated method stub
		Customer checkCust = custRepo.findByCustMobile(custObj.getCustMobile()).orElse(null);
		if(checkCust !=null)
		{
			return new ResponseEntity<>("Customer already present with mobile "+custObj.getCustMobile(),HttpStatus.BAD_REQUEST);
		}
		
		custRepo.save(custObj);
		
		 return new ResponseEntity<>("Customer added successfully",HttpStatus.CREATED);
	}

	@Override
	public List<Customer> customerList() {
		// TODO Auto-generated method stub
		
		return custRepo.findAll();
	}
}
