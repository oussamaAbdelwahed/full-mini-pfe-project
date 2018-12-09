package com.mini_pfe.graphql.customobjects;

public class StatisticsObject {

    private String groupByColumn;
    private Long count;

    public StatisticsObject() {}

    public StatisticsObject(String groupByColumn, Long count) {
        this.groupByColumn = groupByColumn;
        this.count = count;
    }

    public String getGroupByColumn() {
        return groupByColumn;
    }

    public void setGroupByColumn(String groupByColumn) {
        this.groupByColumn = groupByColumn;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
