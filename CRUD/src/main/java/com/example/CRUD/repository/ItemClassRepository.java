package com.example.CRUD.repository;

import com.example.CRUD.Entity.ItemClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemClassRepository extends JpaRepository<ItemClass, Long> {
    List<ItemClass> findByDepartmentId(Long departmentId);
}
