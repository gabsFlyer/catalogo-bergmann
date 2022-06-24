import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { IResponsePageable } from 'src/app/shared/interfaces/response-pageable.interface';
import { Enterprise } from 'src/app/shared/models/enterprise.model';
import { Utilities } from 'src/app/shared/util/utilities.util';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-dashboard-list',
  templateUrl: './enterprise-dashboard-list.component.html',
  styleUrls: ['./enterprise-dashboard-list.component.css']
})
export class EnterpriseDashboardListComponent implements OnInit {

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  enterprises: Array<Enterprise> = new Array();

  constructor(
    private enterpriseService: EnterpriseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadEnterprises();
  }

  loadEnterprises() {
    this.enterpriseService.getEnterprises(this.currentPage)
      .subscribe((enterprises: IResponsePageable<Array<Enterprise>>) => {
        this.enterprises = enterprises.data;
        this.itemsPerPage = enterprises.per_page;
        this.totalItems = enterprises.total;
      });
  }

  pageChange(page: number) {
    this.currentPage = page;
    this.loadEnterprises();
  }

  addEnterprise() {
    this.router.navigate([RoutesConstant.dashboard.enterprises.new]);
  }

  editEnterprise(enterprise: Enterprise) {
    const url = Utilities.formatString(RoutesConstant.dashboard.enterprises.edit, enterprise.id.toString());
    this.router.navigate([url]);
  }

  deleteEnterprise(enterprise: Enterprise) {
    this.enterpriseService
      .destroyEnterprise(enterprise.id)
      .subscribe(res => {
        this.loadEnterprises();
      });
  }

}
