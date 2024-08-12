package com.example.CRUD.controller;

import com.example.CRUD.Entity.Family;
import com.example.CRUD.service.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class FamilyController {
    @Autowired
    private FamilyService familyService;

    @GetMapping("/families")
    public ResponseEntity<List<Family>> getFamilies(
            @RequestParam Long departmentId,
            @RequestParam Long classId) {
        List<Family> families = familyService.getFamilies(departmentId, classId);
        return ResponseEntity.ok(families);
    }
}
