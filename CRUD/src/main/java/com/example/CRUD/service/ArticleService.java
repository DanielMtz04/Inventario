package com.example.CRUD.service;

import com.example.CRUD.Entity.Article;
import com.example.CRUD.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public void saveOrUpdate(Article article) {
        articleRepository.save(article);
    }

    @Transactional
    public void delete(int sku) {
        articleRepository.deleteBySku(sku);
    }

    public boolean doesSkuExist(int sku) {
        return articleRepository.existsBySku(sku);
    }

    public Article findBySku(int sku) {
        return articleRepository.findBySku(sku);
    }
}
