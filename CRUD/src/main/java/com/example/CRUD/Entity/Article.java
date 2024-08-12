package com.example.CRUD.Entity;
import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl_manager")

public class Article {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private Long articleId;

    private int sku;

    private String brand;

    private int model;

    private int department;

    private int type;

    private int family;

    private int stock;

    private int quantity;

    private LocalDate startDate;

    private LocalDate exitDate;

    private int discontinued;

}
