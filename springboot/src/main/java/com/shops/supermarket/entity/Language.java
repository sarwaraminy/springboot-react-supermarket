package com.shops.supermarket.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "languages")
public class Language {

    @Id
    @Column(name = "lang_code", nullable = false, unique = true)
    private String langCode;

    @Column(name = "name", nullable = false)
    private String name;

    // Getters and Setters
    // ...

    public String getLangCode() {
        return this.langCode;
    }

    public void setLangCode(String langCode) {
        this.langCode = langCode;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
