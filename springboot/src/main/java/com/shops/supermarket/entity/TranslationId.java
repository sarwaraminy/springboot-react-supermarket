package com.shops.supermarket.entity;

import java.io.Serializable;
import java.util.Objects;

public class TranslationId implements Serializable {
    private String langCode;
    private String tableName;
    private String columnName;
    private Long rowId;

    // Getters and Setters
    // hashCode and equals methods

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TranslationId that = (TranslationId) o;
        return rowId == that.rowId && 
               Objects.equals(langCode, that.langCode) && 
               Objects.equals(tableName, that.tableName) && 
               Objects.equals(columnName, that.columnName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(langCode, tableName, columnName, rowId);
    }
}
