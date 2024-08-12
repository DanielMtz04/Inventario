package com.example.CRUD.repository;

import com.example.CRUD.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    @Query("SELECT DISTINCT d FROM Department d")
    List<Department> findDistinctDepartments();
}
