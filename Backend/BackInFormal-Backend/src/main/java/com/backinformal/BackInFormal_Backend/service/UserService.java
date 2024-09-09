package com.backinformal.BackInFormal_Backend.service;

import com.backinformal.BackInFormal_Backend.DTO.LoginRequest;
import com.backinformal.BackInFormal_Backend.DTO.UserForgetPasswordDTO;
import com.backinformal.BackInFormal_Backend.Exception.UserNotFoundException;
import com.backinformal.BackInFormal_Backend.entity.UserMaster;
import com.backinformal.BackInFormal_Backend.repository.UserMasterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

	@Autowired
	private UserMasterRepository userMasterRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	public ResponseEntity<String> saveUser(UserMaster userMaster) {
		Optional<UserMaster> existingUser = userMasterRepository.findByUserName(userMaster.getUserName());

		System.out.println("USER-NAME -1-> " + userMaster.getUserName());

		if (existingUser.isPresent()) {
			System.out.println("USER-NAME -2-> " + userMaster.getUserName());
			return new ResponseEntity<>("Username already exists. Please choose a different username",
					HttpStatus.BAD_REQUEST);
		} else {
			userMaster.setPassword(passwordEncoder.encode(userMaster.getPassword()));
			userMasterRepository.save(userMaster);
			return ResponseEntity.ok("User Added  Successfully");

		}

	}

	public UserMaster findByUserName(String userName) {

		Optional<UserMaster> user = userMasterRepository.findByUserName(userName);

		UserMaster userMaster = null;

		if (user.isPresent()) {
			userMaster = user.get();
		} else {
			throw new RuntimeException("Did not find User name - " + userName);
		}
		return userMaster;
	}

	public ResponseEntity<String> userLogIn(LoginRequest loginRequest) {
		System.out.println("User name " + loginRequest.getUserName());
		UserMaster user = userMasterRepository.findByUserName(loginRequest.getUserName()).orElseThrow(()-> new UserNotFoundException("User Not found"));
		System.out.println("After user exist " + user.getUserName());

//		if (loginRequest.getUserName().equals(user.getUserName())) {
			if (user != null) {
				if (loginRequest.getUserName().equals(user.getUserName())) {
				if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
					return ResponseEntity.ok("User Log in Successfully");
				}
				return new ResponseEntity<>("Password is incorrect. Plz Try again", HttpStatus.BAD_REQUEST);

			}
				return new ResponseEntity<>("User Name does not match!!! Plz try again", HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity<>("User Not Exit!!! Plz Sign up", HttpStatus.BAD_REQUEST);
			
//		}
//		return new ResponseEntity<>("User Name does not match!!! Plz try again", HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<String> userUpdatePasswordByEmail(UserForgetPasswordDTO forgetPassObj) {
		//
		UserMaster existedObj = userMasterRepository.findByEmail(forgetPassObj.getEmail()).orElse(null);

		if (existedObj != null) {

			if (passwordEncoder.matches(forgetPassObj.getOldPassword(), existedObj.getPassword())) {
				existedObj.setPassword(passwordEncoder.encode(forgetPassObj.getNewPassword()));

				userMasterRepository.save(existedObj);
				return new ResponseEntity<String>(
						"Password is change for email " + forgetPassObj.getEmail() + " successfully", HttpStatus.OK);
			}
			return new ResponseEntity<String>("Old Password is incorrect for email " + forgetPassObj.getEmail(),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<String>("User does not exist with email " + forgetPassObj.getEmail(),
				HttpStatus.BAD_REQUEST);
	}
}
