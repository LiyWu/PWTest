import { Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashBoardPage';
import CartPage from '../pages/CartPage';
import OrderReviewPage from '../pages/OrderReviewPage'
import OrderHistoryPage from './OrderHistoryPage';

class POManager{
    private page:Page;
    private loginpage;
    private dashboardPage;
    private cartPage;
    private orderReviewPage;
    private orderDetailPage;
    constructor(page)
    {
        this.page=page;
        this.loginpage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.orderReviewPage = new OrderReviewPage(page);
        this.orderDetailPage = new OrderHistoryPage(page);
    }

    getLoginPage(page){
        return this.loginpage;
    }
    getDashBoardPage(page){
        return this.dashboardPage;
    }
    getCartPage(page){
        return this.cartPage;
    }
    getOrderReviewPage(page){
        return this.orderReviewPage;
    }
    getOrderDetailPage(page){
        return this.orderDetailPage;
    }
}

export default POManager;