package com.mini_pfe.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.mini_pfe.dao.jobs.MaterielStatisticsJob;
import com.mini_pfe.graphql.customobjects.StatisticsObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@Component
public class StatisticsObjectQueries implements GraphQLQueryResolver {
    @Autowired
    private MaterielStatisticsJob materielStatisticsJob;

    public StatisticsObjectQueries() {}

    public List<StatisticsObject> getNbrMaterialsByCategorie() {
            List<StatisticsObject> result = new ArrayList<>();
            List<HashMap<String,Long>> res = this.materielStatisticsJob.getNbrMaterialsPerCategorie();
            Iterator<HashMap<String,Long>> it = res.iterator();
            while (it.hasNext()) {
                HashMap<String,Long> tmp = it.next();
                StatisticsObject object = new StatisticsObject(String.valueOf(tmp.get("0")),tmp.get("1"));
                result.add(object);
            }
            return result;
    }

    public List<StatisticsObject> getNbrMaterialsByMarque() {
        List<StatisticsObject> result = new ArrayList<>();
        List<HashMap<String,Long>> res = this.materielStatisticsJob.getNbrMaterialsPerMarque();
        Iterator<HashMap<String,Long>> it = res.iterator();
        while (it.hasNext()) {
            HashMap<String,Long> tmp = it.next();
            StatisticsObject object = new StatisticsObject(String.valueOf(tmp.get("0")),tmp.get("1"));
            result.add(object);
        }
        return result;
    }

}
