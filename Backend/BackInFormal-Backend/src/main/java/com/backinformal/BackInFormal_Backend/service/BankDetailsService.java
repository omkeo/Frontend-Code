package com.backinformal.BackInFormal_Backend.service;

import com.backinformal.BackInFormal_Backend.entity.BankDetails;
import com.backinformal.BackInFormal_Backend.entity.SettingMaster;
import com.backinformal.BackInFormal_Backend.repository.BankDetailsRepository;
import com.backinformal.BackInFormal_Backend.repository.SettingMasterRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BankDetailsService {
    @Autowired
    BankDetailsRepository bankDetailsRepository;
    @Autowired
    SettingMasterRepository settingMasterRepository;

    public List<BankDetails> getAllBankDetails(){
        return bankDetailsRepository.findAll();
    }

    public ResponseEntity<?> addNewBank(BankDetails bankDetails , Long settingId){
        //SettingMaster existingSetting = settingMasterRepository.findById(settingId).orElse(null);

        Optional<SettingMaster> existingSetting = settingMasterRepository.findById(settingId);

        if(existingSetting.isPresent()){

            SettingMaster settingMaster = existingSetting.get();

            bankDetails.setSettingMaster(settingMaster);

            bankDetailsRepository.save(bankDetails);

            return ResponseEntity.ok("Bank details saved successfully!!");

        }else{

            return new ResponseEntity<>("Bank details are not saved!!", HttpStatus.BAD_REQUEST);
        }

    }


    public ResponseEntity<?> getBankById(Long bankDetailId) {
        Optional<BankDetails> bankDetailsOpt = bankDetailsRepository.findById(bankDetailId);

        if (bankDetailsOpt.isPresent()) {
            return ResponseEntity.ok(bankDetailsOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("BankDetails with ID " + bankDetailId + " not found.");
        }
    }


    public ResponseEntity<?> updateBank (BankDetails bankDetails){

       Optional<BankDetails> existingBankOpt = bankDetailsRepository.findByAccountNumber(bankDetails.getAccountNumber());

       if(existingBankOpt.isPresent()){

           BankDetails existingBank = existingBankOpt.get();


           existingBank.setBankName(bankDetails.getBankName());
           existingBank.setAccountHolderName(bankDetails.getAccountHolderName());
           existingBank.setAccountNumber(bankDetails.getAccountNumber());
           existingBank.setBranchName(bankDetails.getBranchName());
           existingBank.setIfscCode(bankDetails.getIfscCode());
           existingBank.setAccountType(bankDetails.getAccountType());
           existingBank.setBranchAddress(bankDetails.getBranchAddress());

          BankDetails updatedBankDetails = bankDetailsRepository.save(existingBank);

           return ResponseEntity.ok(updatedBankDetails);

       }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("BankDetails with ID " + bankDetails.getBankDetailId() + " not found.");
    }



}