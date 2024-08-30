package com.backinformal.BackInFormal_Backend.service;

import com.backinformal.BackInFormal_Backend.entity.UserMaster;
import com.backinformal.BackInFormal_Backend.repository.UserMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMasterRepository userMasterRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String saveUser(UserMaster userMaster){
        userMaster.setPassword(passwordEncoder.encode(userMaster.getPassword()));
        userMasterRepository.save(userMaster);
        return "User Added SuccessFully";
    }
}
