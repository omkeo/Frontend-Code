package com.backinformal.BackInFormal_Backend.repository;

import com.backinformal.BackInFormal_Backend.entity.SettingMaster;
import com.backinformal.BackInFormal_Backend.entity.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SettingMasterRepository extends JpaRepository<SettingMaster ,Long> {

    Optional<SettingMaster> findByCompanyName(String companyName);

}
