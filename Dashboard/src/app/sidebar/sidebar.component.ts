import { Component, OnInit } from '@angular/core';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de board',  icon: 'ti-panel', class: '' },
    { path: '/chefDep/products', title: 'Liste des materiels',  icon: 'ti-desktop', class: '' },
    { path: '/chefDep/add_reclamation', title: 'Ajouter une reclamation',  icon: 'ti-pulse', class: '' },
    { path: '/user', title: 'Profile',  icon:'ti-user', class: '' },
    { path: '/table', title: 'Table List',  icon:'ti-view-list-alt', class: '' },
    { path: '/typography', title: 'Typography',  icon:'ti-text', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
