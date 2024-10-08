import {Component, OnInit} from '@angular/core';
import {JobVacanciesService} from "../../../services/job-vacancies.service";
import {AlertService} from "../../../services/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Strings} from "../../../common/function.common";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplyModalComponent} from '../../modals/apply-modal/apply-modal.component';
import {CreateVacancyModalComponent} from "../../modals/create-vacancy-modal/create-vacancy-modal.component";
import {UserService} from "../../../services/user.service";
import isObjectEmpty = Strings.isObjectEmpty;
import {AppPaginationComponent} from "../../../common/app-pagination/app-pagination.component";
import {RouteService} from "../../../services/route.service";

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    AppPaginationComponent
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {

  public vacancies: any[] = [];
  public pagination = this._defaultPagination;
  public currentPage: number = 1;
  public loading = true;
  public paginationLoading = true;

  constructor(
    private _jobVacanciesService: JobVacanciesService,
    private _alertService: AlertService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private modalService: NgbModal,
    private _routeService: RouteService
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
    this._jobVacanciesService.getPaginated(params)
      .subscribe({
        next: (success: any) => {
          this.pagination = {
            ...this.pagination,
            page: success['data']['currentPage'],
            totalResults: success['data']['totalResults'],
            totalPages: success['data']['totalPages']
          };
          this.vacancies = success['data']['result'];
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

  openApplyModal(vacancyId: string): void {
    const modalRef = this.modalService.open(ApplyModalComponent);
    modalRef.componentInstance.vacancyId = vacancyId;
  }

  openCreateVacancyModal() {
    const modalRef = this.modalService.open(CreateVacancyModalComponent);
    modalRef.result.then(() => this._readQueryParams(), () => {
    });
  }

  navigateJobApplicationsComponent(vacancyId: number) {
    this._routeService.go([`/jobs/${vacancyId}`])
  }

  navigateMyApplicationsComponent() {
    this._routeService.go([`/my-applications`])
  }

  isAdmin(): boolean {
    return this._userService.isAdmin();
  }

  canShowSeeApplicationsButton(): boolean {
    return this.isAdmin()
  }
  canShowApplyButton(): boolean {
    return this._userService.isUser();
  }
  canShowNewVacancyButton(): boolean {
    return this.isAdmin()
  }
  canShowMyApplicationsButton(): boolean {
    return this._userService.isUser()
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

}
