package com.backinformal.BackInFormal_Backend.service;

import com.backinformal.BackInFormal_Backend.entity.SettingMaster;
import com.backinformal.BackInFormal_Backend.repository.SettingMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class SettingMasterService {

    @Autowired
    private SettingMasterRepository settingMasterRepository;

    @Value("${project.image}")
    String path;
    @Autowired
    private  CloudinaryService cloudinaryService;



    public List<SettingMaster> getAllSettings(){
        //how to get image
       return settingMasterRepository.findAll();
    }


    public SettingMaster createSetting(SettingMaster settingMaster , MultipartFile file) throws IOException {

//        Map<String, Object> logo = cloudinaryService.upload(file);
//        String url = (String) logo.get("url");
//        settingMaster.setLogoImage(url);
        //create File if not Created
        File f = new  File(path);
        if(!f.exists()){
            f.mkdir();
        }
        //File Name
        String fileName = file.getOriginalFilename();
        System.out.println("filename "+fileName);

        //random generate for file
        String randomId = UUID.randomUUID().toString();
        String fileName1 = randomId.concat((fileName.substring(fileName.lastIndexOf("."))));

        //Full path
        String filePath = path + File.separator + fileName1;
        System.out.println("filePath "+filePath);


        //file copy
        Files.copy(file.getInputStream() , Paths.get(filePath));

        settingMaster.setLogoImage(fileName);

        return settingMasterRepository.save(settingMaster);
    }

    public SettingMaster updateSetting( Long settingId , SettingMaster settingMaster ,  MultipartFile logoImage) throws IOException {


        System.out.println("IMAGE UPDATED--settingName - "+settingMaster.getCompanyName());

        SettingMaster existingSetting = settingMasterRepository.findById(settingId).orElse(null);


        System.out.println("IMAGE UPDATED--existingSetting "+existingSetting);

        if(existingSetting != null){

            System.out.println("IMAGE UPDATED--1");

            existingSetting.setSettingId(settingId);
            existingSetting.setCompanyName(settingMaster.getCompanyName());
            existingSetting.setCompanyAddress(settingMaster.getCompanyAddress());
            existingSetting.setCompanyEmail(settingMaster.getCompanyEmail());
            existingSetting.setCompanyMobile(settingMaster.getCompanyMobile());
            existingSetting.setGSTIN(settingMaster.getPanNumber());
            existingSetting.setPanNumber(settingMaster.getPanNumber());

            // Check if a new image file is provided
            if (logoImage != null && !logoImage.isEmpty()) {
                // Delete the old image file if it exists
                System.out.println("IMAGE UPDATED--2");

                String oldFilePath = path + File.separator + existingSetting.getLogoImage();
                File oldFile = new File(oldFilePath);
                if (oldFile.exists()) {
                    oldFile.delete();
                }

                System.out.println("IMAGE UPDATED--3");
                // Save the new image
                String fileName = logoImage.getOriginalFilename();
                String randomId = UUID.randomUUID().toString();
                String newFileName = randomId.concat(fileName.substring(fileName.lastIndexOf(".")));
                String newFilePath = path + File.separator + newFileName;

                Files.copy(logoImage.getInputStream(), Paths.get(newFilePath));
                existingSetting.setLogoImage(newFileName);
//            if(file != null && !file.isEmpty()){
//                Map<String, Object> logo = cloudinaryService.upload(file);
//                String url = (String) logo.get("url");
//                existingSetting.setLogoImage(url);
//                settingMasterRepository.save(existingSetting);
//            }

            // Create the directory if it doesn't exist
                System.out.println("IMAGE UPDATED--2");



        }
    }

        return settingMasterRepository.save(existingSetting);
    }






}
