package com.backinformal.BackInFormal_Backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backinformal.BackInFormal_Backend.entity.UserMaster;
import com.backinformal.BackInFormal_Backend.service.UserService;

@RestController
@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/new-user")
   public String signUp(@RequestBody UserMaster userMaster){

        if(userMaster.getRoles() == null){
            userMaster.setRoles("ROLE_ADMIN");
        }
       userService.saveUser(userMaster);
       return "User Added Successfully";
   }


//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestParam("username") String username,
//                                        @RequestParam("password") String password) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(username, password)
//            );
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            return ResponseEntity.ok("Login successful");
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//    }
@PostMapping("/login")
public ResponseEntity<String> login(@RequestParam("username") String username,
                                    @RequestParam("password") String password) {

	System.out.println("in controler");
    return ResponseEntity.ok("Login  validations is handle by securityConfig!!");
}



    @GetMapping("/welcome")
    public ResponseEntity<String> welcome() {
        return ResponseEntity.ok("Welcome to the application");
    }


    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> testAdmin() {
        return ResponseEntity.ok("I am Admin");
    }

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<String> testUser() {
        return ResponseEntity.ok("I am user");
    }


}
