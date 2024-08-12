package com.example.CRUD.controller;

import com.example.CRUD.Entity.ItemClass;
import com.example.CRUD.service.ItemClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ItemClassController {
    @Autowired
    private ItemClassService itemClassService;

    @GetMapping("/classes")
    public ResponseEntity<List<ItemClass>> getClasses(@RequestParam Long departmentId) {
        List<ItemClass> classes = itemClassService.getClasses(departmentId);
        return ResponseEntity.ok(classes);
    }
}
