package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.Language;

public interface LanguageRepository extends JpaRepository<Language, String> {
}
