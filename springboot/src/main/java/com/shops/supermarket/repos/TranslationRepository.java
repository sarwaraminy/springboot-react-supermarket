package com.shops.supermarket.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.Translation;

public interface TranslationRepository extends JpaRepository<Translation, Long> {
    List<Translation> findByTableNameAndRowIdAndLanguage_LangCode(String tableName, int rowId, String langCode);
}
