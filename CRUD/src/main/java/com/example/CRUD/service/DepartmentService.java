package com.example.CRUD.service;

import com.example.CRUD.Entity.Department;
import com.example.CRUD.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Department> getDepartments() {
        return departmentRepository.findDistinctDepartments();
    }
}
