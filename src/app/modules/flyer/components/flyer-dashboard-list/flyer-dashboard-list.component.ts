import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { IResponsePageable } from 'src/app/shared/interfaces/response-pageable.interface';
import { Flyer } from 'src/app/shared/models/flyer.model';
import { Utilities } from 'src/app/shared/util/utilities.util';
import { FlyerService } from '../../services/flyer.service';

@Component({
  selector: 'app-flyer-dashboard-list',
  templateUrl: './flyer-dashboard-list.component.html',
  styleUrls: ['./flyer-dashboard-list.component.css']
})
export class FlyerDashboardListComponent implements OnInit {

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  flyers: Array<Flyer> = new Array();

  constructor(
    private flyerService: FlyerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadFlyers();
  }

  loadFlyers() {
    this.flyerService.getFlyers(this.currentPage)
      .subscribe((flyers: IResponsePageable<Array<Flyer>>) => {
        this.flyers = flyers.data;
        this.itemsPerPage = flyers.per_page;
        this.totalItems = flyers.total;
      });
  }

  pageChange(page: number) {
    this.currentPage = page;
    this.loadFlyers();
  }

  addFlyer() {
    this.router.navigate([RoutesConstant.dashboard.flyers.new]);
  }

  editFlyer(flyer: Flyer) {
    const url = Utilities.formatString(RoutesConstant.dashboard.flyers.edit, flyer.id.toString());
    this.router.navigate([url]);
  }

  deleteFlyer(flyer: Flyer) {
    this.flyerService
      .destroyFlyer(flyer.id)
      .subscribe(res => {
        this.loadFlyers();
      });
  }

}
