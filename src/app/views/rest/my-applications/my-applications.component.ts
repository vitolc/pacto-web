import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../services/alert.service";
import {RouteService} from "../../../services/route.service";
import {Strings} from "../../../common/function.common";
import isObjectEmpty = Strings.isObjectEmpty;
import {MyApplicationsService} from "../../../services/my-applications.service";
import {AppPaginationComponent} from "../../../common/app-pagination/app-pagination.component";

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [
    AppPaginationComponent
  ],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent implements OnInit{

  public applications: any[] = [];
  public pagination = this._defaultPagination;
  public currentPage: number = 1;
  public loading = true;
  public paginationLoading = true;
  public showDetailsMap: { [key: number]: boolean } = {};

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _myApplicationsService: MyApplicationsService,
    private _alertService: AlertService,
    private _routeService: RouteService,
  ) {
  }

  ngOnInit(): void {
    this._readQueryParams();
  }

  private _readQueryParams() {
    this._activatedRoute.queryParams.subscribe({
      next: (params: any) => {
        if (!isObjectEmpty(params)) {
          this.pagination = {...this.pagination, ...params};
          this.currentPage = Number(params?.page) + 1;
        }
        this._getPaginated(this.pagination);
      }
    });
  }

  private _getPaginated(params: any): void {
    this._myApplicationsService.getPaginated(params)
      .subscribe({
        next: (success: any) => {
          this.pagination = {
            ...this.pagination,
            page: success['data']['currentPage'],
            totalResults: success['data']['totalResults'],
            totalPages: success['data']['totalPages']
          };
          this.applications = success['data']['result'];
          this.loading = false;
          this.paginationLoading = false;
        }, error: ({error}: HttpErrorResponse) => {
          console.error('Error details:', error);
          this._alertService.errorToast(error);
          this.loading = false;
          this.paginationLoading = false;
        }
      });
  }

  private get _defaultPagination(): any {
    return {
      q: '',
      totalResults: 0,
      page: 0,
      itemsPerPage: 10
    };
  }


  public changeItemsPerPage(itemsPerPage: any): void {
    this.pagination = {
      ...this.pagination,
      page: 0,
      sortBy: '',
      itemsPerPage
    };
    this._routeService.updateQueryParams(this.pagination);
  }


  public paginate(page: any): void {
    this.pagination.page = page - 1;
    this._routeService.updateQueryParams(this.pagination);
  }

  public toggleDetails(applicationId: number): void {
    this.showDetailsMap[applicationId] = !this.showDetailsMap[applicationId]; // Alterna o estado
  }

  public showDetails(applicationId: number): boolean {
    return !!this.showDetailsMap[applicationId]; // Retorna o estado atual
  }

}
