import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
import { Enterprise } from 'src/app/shared/models/enterprise.model';
import { File } from 'src/app/shared/models/file.model';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-dashboard',
  templateUrl: './enterprise-dashboard.component.html',
  styleUrls: ['./enterprise-dashboard.component.css']
})
export class EnterpriseDashboardComponent implements OnInit {

  enterprise: Enterprise = new Enterprise();

  get enterpriseImage() {
    return this.enterprise.file ? this.enterprise.file.file_name : '';
  }

  constructor(
    private enterpriseService: EnterpriseService,
    private imageService: ImageUploadService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.enterpriseService.getEnterprise(params['id'])
          .subscribe({
            next: (enterprise: Enterprise) => {
              this.enterprise = enterprise;
              this.enterprise.file = this.enterprise.file ?? new File();
            },
            error: (err) => {
              this.router.navigate([RoutesConstant.dashboard.enterprises.list]);
            }
          })
      }
    });
  }

  editing(): boolean {
    return !!this.enterprise.id;
  }

  cancel() {
    if (!this.editing() && this.enterprise.file) {
      this.imageService.destroyImage(this.enterprise.file.id)
        .subscribe();
    }

    this.router.navigate([RoutesConstant.dashboard.enterprises.list]);
  }

  save() {
    if (this.editing()) {
      this.enterpriseService.updateEnterprise(this.enterprise.id, this.enterprise)
        .subscribe({
          next: (enterprise: Enterprise) => {
            this.toastr.success('Registro editado com sucesso');
            this.router.navigate([RoutesConstant.dashboard.enterprises.list]);
          },
          error: (err) => {
            if (err.status !== 422) {
              this.toastr.error('Houve um erro ao editar a empresa');
            }
          }
        });
    } else {
      this.enterpriseService.storeEnterprise(this.enterprise)
        .subscribe({
          next: (enterprise: Enterprise) => {
            this.toastr.success('Registro salvo com sucesso');
            this.router.navigate([RoutesConstant.dashboard.enterprises.list]);
          },
          error: (err) => {
            if (err.status !== 422) {
              this.toastr.error('Houve um erro ao salvar a empresa');
            }
          }
        });
    }
  }

  fileUploaded(file: File): void {
    this.enterprise.file = file;
  }

}
