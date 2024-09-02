import {Injectable, isDevMode} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class RouteService {

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    go(routes: string[], pathVariables: object = {}, queryParams?: object, config?: ConfigRoute) {
        // Get to string
        let path: string = routes.join('/');

        // Replace paths variable
        Object.keys(pathVariables).forEach(key => {
            // @ts-ignore
          path = path.replace(':'.concat(key), pathVariables[key]);
        });

        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([path], {queryParams});

        if (isDevMode()) {
            console.log('%c path: ' + path, 'background: #f2f2f2; color: #0080d0; padding:5px; line-height: 25px');
        }
    }

    goByUrl(url: string) {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl(url);
    }

    reload() {
        location.reload();
    }

    clearQueryParams(qp = {}) {
        this.router.navigate([], {queryParams: {...qp}, queryParamsHandling: 'merge'});
    }

    clearAllQueryParams() {
        this.router.navigate([], {queryParams: {}});
    }

    clearAllQueryParamsExcept(qp = {}) {
        this.clearAllQueryParams();
        this.updateQueryParams(qp);
    }

    gotoExternalLink(_link: string): void {
        window.open(_link, '_blank');
    }

    updateQueryParams(queryParams: any, complete = () => {}) {
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            }).then(r => {}).catch(err => console.error(err)).finally(() => complete());
    }

    joinRoutes(arr: string[]): string {
        return '/' + arr.join('/');
    }

    joinRoutesWithPathVariables(routes: string[], pathVariables: object = {}): string {
        // Get to string
        let path: string = routes.join('/');

        // Replace paths variable
        Object.keys(pathVariables).forEach(key => {
            // @ts-ignore
          path = path.replace(':'.concat(key), pathVariables[key]);
        });

        return '/' + path;
    }
}

export interface ConfigRoute {
    keepParam?: boolean;
}
