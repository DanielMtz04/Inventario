package com.example.CRUD.repository;
import com.example.CRUD.Entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    boolean existsBySku(int sku);
    void deleteBySku(int sku);
    Article findBySku(int sku);
}
