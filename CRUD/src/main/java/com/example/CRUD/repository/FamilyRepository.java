package com.example.CRUD.repository;

import com.example.CRUD.Entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {
    List<Family> findByDepartmentIdAndClassId(Long departmentId, Long classId);
}
