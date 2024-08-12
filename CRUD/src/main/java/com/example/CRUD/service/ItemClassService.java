package com.example.CRUD.service;

import com.example.CRUD.Entity.ItemClass;
import com.example.CRUD.repository.ItemClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemClassService {
    @Autowired
    private ItemClassRepository itemClassRepository;

    public List<ItemClass> getClasses(Long departmentId) {
        return itemClassRepository.findByDepartmentId(departmentId);
    }
}
