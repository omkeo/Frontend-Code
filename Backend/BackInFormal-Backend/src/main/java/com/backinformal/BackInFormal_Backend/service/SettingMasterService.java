package com.backinformal.BackInFormal_Backend.service;

import com.backinformal.BackInFormal_Backend.entity.SettingMaster;
import com.backinformal.BackInFormal_Backend.repository.SettingMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@Service
public class SettingMasterService {

    @Autowired
    private SettingMasterRepository settingMasterRepository;
    @Autowired
    private  CloudinaryService cloudinaryService;
    public SettingMaster createSetting(SettingMaster settingMaster , MultipartFile file){

        Map<String, Object> logo = cloudinaryService.upload(file);
        String url = (String) logo.get("url");
        settingMaster.setLogoImage(url);

        return settingMasterRepository.save(settingMaster);
    }

    public SettingMaster updateSetting(SettingMaster settingMaster , MultipartFile file){

//        SettingMaster existingSetting = Optional.ofNullable(settingMasterRepository.findByCompanyName(settingMaster.getCompanyName())
//                .orElse(null);
//
//        if(existingSetting != null){
//
//            existingSetting.setSettingId(settingMaster.getSettingId());
//            existingSetting.setCompanyName(settingMaster.getCompanyName());
//            existingSetting.setCompanyAddress(settingMaster.getCompanyAddress());
//            existingSetting.setCompanyEmail(settingMaster.getCompanyEmail());
//            existingSetting.setCompanyMobile(settingMaster.getCompanyMobile());
//            existingSetting.setGSTIN(settingMaster.getPanNumber());
//            existingSetting.setPanNumber(settingMaster.getPanNumber());
//
//            if(file != null && !file.isEmpty()){
//                Map<String, Object> logo = cloudinaryService.upload(file);
//                String url = (String) logo.get("url");
//                existingSetting.setLogoImage(url);
//                settingMasterRepository.save(existingSetting);
//            }
//
//
//        }
        return null;
    }
}
