package com.example.CRUD.service;

import com.example.CRUD.Entity.Family;
import com.example.CRUD.repository.FamilyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FamilyService {
    @Autowired
    private FamilyRepository familyRepository;

    public List<Family> getFamilies(Long departmentId, Long classId) {
        return familyRepository.findByDepartmentIdAndClassId(departmentId, classId);
    }
}
