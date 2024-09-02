package com.backinformal.BackInFormal_Backend.controller;

import com.backinformal.BackInFormal_Backend.entity.SettingMaster;
import com.backinformal.BackInFormal_Backend.service.SettingMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/settings")
@CrossOrigin
public class SettingMasterController {
    @Autowired
    SettingMasterService settingMasterService;



    @PostMapping("/add-new")
    public ResponseEntity<String> addNewSetting(@RequestPart("settingObj") SettingMaster settingMaster,
                                                @RequestParam("image") MultipartFile logoImage){
        try{

            settingMasterService.createSetting(settingMaster,logoImage);
            return ResponseEntity.ok("Setting saved successfully with logo.");

        }catch (Exception e){
            return ResponseEntity.status(500).body("Failed to save setting with logo.");

        }

    }

    @PutMapping("/update-setting/{settingId}")
    public ResponseEntity<String> updateSetting(@RequestPart("settingObj") SettingMaster settingMaster,
                                                @RequestParam("image") MultipartFile logoImage,
                                                @PathVariable("settingId") Long settingId){

        try{

           // settingMaster.setSettingId(settingId);

            settingMasterService.updateSetting(settingId,settingMaster,logoImage);
            return ResponseEntity.ok("Setting Updated successfully with logo.");

        }catch (Exception e){
            return ResponseEntity.status(500).body("Failed to Update setting with logo.");

        }
    }
}