package com.mini_pfe.dao.jobs;


import com.mini_pfe.dao.repositories.MaterielsRepository;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class MaterielStatisticsJob {
    @Autowired
    private MaterielsRepository materielsRepository;

    public MaterielStatisticsJob() {}


    public List<HashMap<String,Long>> getNbrMaterialsPerCategorie() {
      return  (List<HashMap<String,Long>>)this.materielsRepository.getGroupedByCategorie();
    }


    public List<HashMap<String,Long>> getNbrMaterialsPerMarque() {
        return  (List<HashMap<String,Long>>)this.materielsRepository.getGroupedByMarque();
    }
}
