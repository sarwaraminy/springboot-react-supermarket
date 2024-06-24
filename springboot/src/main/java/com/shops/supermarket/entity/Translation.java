package com.shops.supermarket.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "translations")
@IdClass(TranslationId.class)
public class Translation {

    @Id
    @Column(name = "lang_code")
    private String langCode;

    @Id
    @Column(name = "table_name", nullable = false)
    private String tableName;

    @Id
    @Column(name = "column_name", nullable = false)
    private String columnName;

    @Id
    @Column(name = "row_id", nullable = false)
    private Long rowId;

    @Column(name = "translation", nullable = false)
    private String translation;

    // Getters and Setters

    public String getLangCode() {
        return this.langCode;
    }

    public void setLangCode(String langCode) {
        this.langCode = langCode;
    }    

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public Long getRowId() {
        return rowId;
    }

    public void setRowId(Long rowId) {
        this.rowId = rowId;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }
}
