import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Strings} from "../../common/function.common";
import isObjectEmpty = Strings.isObjectEmpty;
import {UserDto} from "../../common/dtos/user-dto";
import {JobApplicationsService} from "../../services/job-applications.service";
import {AlertService} from "../../services/alert.service";
import {AppPaginationComponent} from "../../common/app-pagination/app-pagination.component";
import {RouteService} from "../../services/route.service";

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [
    AppPaginationComponent
  ],
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent implements OnInit {

  public jobTitle: string = 'Título da Vaga';
  private _vacancyId!: number;
  public applications: any[] = [];
  public pagination = this._defaultPagination;
  public currentPage: number = 1;
  public loading = true;
  public paginationLoading = true;
  public userInfo?: UserDto;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _jobApplicationService: JobApplicationsService,
    private _alertService: AlertService,
    private _routeService: RouteService
  ) {
  }

  ngOnInit(): void {
    this._vacancyId = this._activatedRoute.snapshot.params['vacancyId'];
    this._readQueryParams();
    this._getJobTitle();
    console.log(this._vacancyId)
  }

  private _readQueryParams() {
    this._activatedRoute.queryParams.subscribe({
      next: (params: any) => {
        if (!isObjectEmpty(params)) {
          this.pagination = {...this.pagination, ...params};
          this.currentPage = Number(params?.page) + 1;
        }
        this._getPaginated(this._vacancyId, this.pagination);
      }
    });
  }

  private _getPaginated(vacancyId: number, params: any): void {
    this._jobApplicationService.getPaginated(vacancyId, params)
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

  private _getJobTitle(): void {
    this.jobTitle = 'Desenvolvedor Front-End';
  }

  public paginate(page: any): void {
    this.pagination.page = page - 1;
    this._routeService.updateQueryParams(this.pagination);
  }


}
