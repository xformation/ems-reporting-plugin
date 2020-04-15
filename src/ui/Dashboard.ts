import init from '../domain/DashboardApp';

export class Dashboard {
    static templateUrl = '/partials/alerts.html';
    constructor() {
        init();
    }
}
