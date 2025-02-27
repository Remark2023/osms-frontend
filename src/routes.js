import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import DashClone from './pages/DashClone';
import DashboardAppPage from './pages/DashboardAppPage';
import LoginPage from './pages/LoginPage';
import ManageSoPage from './pages/ManageSoPage';
import MenuAssign from './pages/MenuAssign';
import MenuCreation from './pages/MenuCreation';
import MtlSystemItemPage from './pages/MtlSystemItemPage';
import MtlUnitMeasurePage from './pages/MtlUnitMeasurePage';
import Page404 from './pages/Page404';
import ProfilePage from './pages/ProfilePage';
import RequisitionFormPage from './pages/RequisitionFormPage';
import RequisitionPage from './pages/RequisitionPage';
import SalesOrderFormPage from './pages/SalesOrderFormPage';
import SettingsPage from './pages/SettingsPage';
import ShowApprovedSalesOrders from './pages/ShowApprovedSalesOrders';
import ShowExcelFile from './pages/ShowExcelFile';
import ShowFndUser from './pages/ShowFndUser';
import ShowHrAllOrganizationUnits from './pages/ShowHrAllOrganizationUnits';
import ShowHzCustAccounts from './pages/ShowHzCustAccounts';
import ShowLocationsAll from './pages/ShowLocationsAll';
import ShowMainSystemMenu from './pages/ShowMainSystemMenu';
import Showmenus from './pages/ShowMenus';
import ShowMtlMaterialTransactions from './pages/ShowMtlMaterialTransactions';
import ShowMtlTransactionTypes from './pages/ShowMtlTransactionTypes';
import ShowPerAllPeoples from './pages/ShowPerAllPeoples';
import ShowWfNotifications from './pages/ShowWfNotifications';
import SignupPage from './pages/SignupPage';
import UpdateSalesOrderForm from './pages/UpdateSalesOrderFormPage';
import ViewOrdersHeader from './pages/ViewOrdersHeader';
import WfNotificationView from './pages/WfNotificationViewPage';
import AddCustomerPage from './sections/@dashboard/customers/AddCustomerPage';
import AddSystemItemsDialog from './sections/@dashboard/items/AddSystemItemsDialog';
import AddUomDialog from './sections/@dashboard/uom/AddUomDialog';
import AddFndUser from './sections/@dashboard/user/AddFndUser';
import AddHrLocations from './sections/@dashboard/user/AddHrLocations';
import AddHrOrganizationUnits from './sections/@dashboard/user/AddHrOrganizationUnits';
import AddHzCustAccounts from './sections/@dashboard/user/AddHzCustAccounts';
import AddMtlTransactionTypes from './sections/@dashboard/user/AddMtlTransactionTypes';
import AddPerAllPeoples from './sections/@dashboard/user/AddPerAllPeoples';
import UpdateFndUser from './sections/@dashboard/user/UpdateFndUser';
import UpdateHrLocations from './sections/@dashboard/user/UpdateHrLocations';
import UpdateHrOrganizationUnits from './sections/@dashboard/user/UpdateHrOrganizationUnits';
import UpdateMainSystemMenu from './sections/@dashboard/user/UpdateMainSystemMenu';
import UpdateMtlTransactionTypes from './sections/@dashboard/user/UpdateMtlTransactionTypes';
// import getCookieService from './Services/GetCookieService';
import BarChart from './DataVisualization/BarChart';
import DisplayCharts from './DataVisualization/DisplayCharts';
import DrillDownPage from './DataVisualization/DrillDown';
import DrillDownCustomerDepositAnalytic from './DataVisualization/DrillDownCustomerDepositAnalytic';
import Gauge from './DataVisualization/Gauge';
import PieChartView from './DataVisualization/PieChart';
import { getUserProfileDetails } from './Services/ApiServices';
import { useUser } from './context/UserContext';
import AccountFormPage from './pages/AccountFormPage';
import AddCustomerFromSapPage from './pages/AddCustomerFromSapPage';
import AddShopItems from './pages/AddShopItems';
import AddShopRoutesPage from './pages/AddShopRoutesPage';
import SalesDetailsFromPosPage from './pages/BA Incentive Module/SalesDetailsFromPosPage';
import AddIncentiveRecipientSlab from './pages/BA Incentive Module/SalesTarget/AddIncentiveAchievementSlab';
import AddIncentiveConditions from './pages/BA Incentive Module/SalesTarget/AddIncentiveConditions';
import AddIncentiveDistribution from './pages/BA Incentive Module/SalesTarget/AddIncentiveDistribution';
import AddPageIncentiveFormula from './pages/BA Incentive Module/SalesTarget/AddIncentiveForm';
import AddIncentiveRecipients from './pages/BA Incentive Module/SalesTarget/AddIncentiveRecipientGroups';
import AddIncentiveTypes from './pages/BA Incentive Module/SalesTarget/AddIncentiveTypes';
import AddSalesDetails from './pages/BA Incentive Module/SalesTarget/AddSalesDetailsAll';
import AddSalesTarget from './pages/BA Incentive Module/SalesTarget/AddSalesTargets';
import AddSalesTargetsSKUAll from './pages/BA Incentive Module/SalesTarget/AddSalesTargetsSKUAll';
import ViewIncentiveAchievementSlabAll from './pages/BA Incentive Module/SalesTarget/ViewIncentiveAchievementSlabAll';
import ViewIncentiveConditions from './pages/BA Incentive Module/SalesTarget/ViewIncentiveConditions';
import ViewIncentiveDistributionAll from './pages/BA Incentive Module/SalesTarget/ViewIncentiveDistributionAll';
import ViewIncentiveFormula from './pages/BA Incentive Module/SalesTarget/ViewIncentiveFormula';
import ViewIncentiveRecipient from './pages/BA Incentive Module/SalesTarget/ViewIncentiveRecipientGroups';
import ViewIncentiveTypes from './pages/BA Incentive Module/SalesTarget/ViewIncentiveTypes';
import ViewSalesDetails from './pages/BA Incentive Module/SalesTarget/ViewSalesDetailsAll';
import ViewSalesTarget from './pages/BA Incentive Module/SalesTarget/ViewSalesTargets';
import ViewSalesTargetsSKUAll from './pages/BA Incentive Module/SalesTarget/ViewSalesTargetsSKUAll';
import ViewSoSalesTargetIncentive from './pages/BA Incentive Module/SalesTarget/ViewSoSalesTargetIncentive';
import BankFormPage from './pages/BankFormPage';
import BrandingAssetsTrackingPage from './pages/BrandingAassetsTrackingPage';
import BrandingAssetsViewPage from './pages/BrandingAssetsReportPage';
import BrandingAssetsViewPageForHerlan from './pages/BrandingAssetsViewPageForHerlan';
import CustomerManagementPage from './pages/CustomerManagementPage';
import DepositEntryForm from './pages/DepositEntryForm';
import ItemsDashBoard from './pages/ItemsDashBoard';
import ItemsFromSapPage from './pages/ItemsFromSapPage';
import ManageAccountPage from './pages/ManageAccountPage';
import ManageBankFormPage from './pages/ManageBankFormPage';
import ManageMtlCategoriesB from './pages/ManageMtlCategoriesB';
import ManageSoAdminPage from './pages/ManageSoAdminPage';
import MonitorTerritoryPage from './pages/MonitorTerritoryPage';
import MtlCategoriesFormPage from './pages/MtlCategoriesFormPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ShopRouteMasterPage from './pages/ShopRouteMasterPage';
import ShowAllDeposits from './pages/ShowAllDepositEntriesPage';
import ShowDepositDetailsPage from './pages/ShowDepositDetailsPage';
import ShowDepositHistoryPage from './pages/ShowDepositHistoryPage';
import ImageGallery from './pages/ShowImages';
import TermsConditionPage from './pages/TermsConditionPage';
import TestSapApiPage from './pages/TestSapApiPage';
import UpdateAccountPage from './pages/UpdateAccountPage';
import UpdateBankFormPage from './pages/UpdateBankFormPage';
import UpdateMtlCategories from './pages/UpdateMtlCategories';
import UploadReconciledDepositsExcel from './pages/UploadReconciledDepositsExcel';
import UserActionAssignmentPage from './pages/UserActionAssignmentPage';
import VatposIntegrationService from './pages/VatposIntegrationService';
import DepositsViewPage from './pages/ViewCollectionsPage';
import ViewTerritoryDetails from './pages/ViewTerritoryDetails';
import ViewTerritoryInsights from './pages/ViewTerritoryInsights';
import ForgetPassword from './pages/forgetPassword';

// ----------------------------------------------------------------------
export default function Router() {
  const navigate = useNavigate();

  const { user } = useUser();
  console.log(user);

  const [isAuthorized, setIsAuthorized] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          console.log(user);
          const accountDetails = await getUserProfileDetails(user); // Call your async function here
          setIsAuthorized(accountDetails.status === 200);
        }
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [user]);
  console.log(isAuthorized);

  const routes = useRoutes([
    {
      path: '/dashboard',
      //  element: <DashboardLayout />,
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/dashclone" />, index: true },
        { path: 'dashclone', element: <DashClone /> },
        // { path: 'dashclone', element: <DashClone /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'items', element: <MtlSystemItemPage /> },
        { path: 'uom', element: <MtlUnitMeasurePage /> },
        { path: 'add-uom', element: <AddUomDialog /> },
        { path: 'addSystemItem/:item', element: <AddSystemItemsDialog /> },
        { path: 'requisition', element: <RequisitionFormPage /> },
        { path: 'allRequisitions', element: <RequisitionPage /> },
        { path: 'showlocationsall', element: <ShowLocationsAll /> },
        { path: 'showorganizationunits', element: <ShowHrAllOrganizationUnits /> },
        { path: 'showmtlmaterialtransactions', element: <ShowMtlMaterialTransactions /> },
        { path: 'showmtltransactiontypes', element: <ShowMtlTransactionTypes /> },
        { path: 'showmenus', element: <Showmenus /> },
        { path: 'menucreation', element: <MenuCreation /> },
        { path: 'menuassign', element: <MenuAssign /> },
        { path: 'updatehrorganizationunits/:organization_id', element: <UpdateHrOrganizationUnits /> },
        { path: 'addhrorganization', element: <AddHrOrganizationUnits /> },
        { path: 'showlocationsall', element: <ShowLocationsAll /> },
        { path: 'updatehrlocations/:location_id', element: <UpdateHrLocations /> },
        { path: 'addhrlocations/:location_id', element: <AddHrLocations /> },
        { path: 'showfnduser', element: <ShowFndUser /> },
        { path: 'updatefnduser/:user_id', element: <UpdateFndUser /> },
        { path: 'updatemtlcategories/:category_id', element: <UpdateMtlCategories /> },
        { path: 'addfnduser', element: <AddFndUser /> },
        { path: 'showmtltransactiontypes', element: <ShowMtlTransactionTypes /> },
        { path: 'addmtltransactiontypes', element: <AddMtlTransactionTypes /> },
        { path: 'updatemtltransactiontypes/:transaction_type_id', element: <UpdateMtlTransactionTypes /> },
        { path: 'showperallpeoples', element: <ShowPerAllPeoples /> },
        { path: 'addperallpeoples/:person_id', element: <AddPerAllPeoples /> },
        { path: 'menucreation', element: <MenuCreation /> },
        { path: 'menuassign', element: <MenuAssign /> },
        { path: 'showmainsystemmenu', element: <ShowMainSystemMenu /> },
        { path: 'showwfnotifications', element: <ShowWfNotifications /> },
        { path: 'updatemainsystemmenu/:system_menu_id', element: <UpdateMainSystemMenu /> },
        { path: 'salesOrderForm', element: <SalesOrderFormPage /> },
        { path: 'manageSalesOrderForm', element: <ManageSoPage /> },
        { path: 'wfNotificationView/:notification_id', element: <WfNotificationView /> },
        { path: 'updateSalesOrderForm/:header_id', element: <UpdateSalesOrderForm /> },
        { path: 'showapprovedsalesorders', element: <ShowApprovedSalesOrders /> },
        { path: 'showhzcustaccounts', element: <ShowHzCustAccounts /> },
        { path: 'addhzcustaccounts/:cust_account_id', element: <AddHzCustAccounts /> },
        { path: 'showexcelfile', element: <ShowExcelFile /> },
        { path: 'viewordersheader/:header_id', element: <ViewOrdersHeader /> },
        { path: 'settings', element: <TermsConditionPage /> },
        { path: 'showimages', element: <ImageGallery /> },
        { path: 'bankformpage', element: <BankFormPage /> },
        { path: 'managebankformpage', element: <ManageBankFormPage /> },
        { path: 'managemtlcategoriesb', element: <ManageMtlCategoriesB /> },
        { path: 'updatebankformpage/:bank_id', element: <UpdateBankFormPage /> },
        { path: 'accountformpage', element: <AccountFormPage /> },
        { path: 'manageaccountpage', element: <ManageAccountPage /> },
        { path: 'updateaccountpage/:bank_account_id', element: <UpdateAccountPage /> },
        { path: 'depositEntryForm', element: <DepositEntryForm /> },
        // { path: 'depositEntryForm', element: <DepositEntryForm /> },
        { path: 'showDeposits', element: <ShowDepositHistoryPage /> },
        { path: 'showDepositDetails/:cash_receipt_id', element: <ShowDepositDetailsPage /> },
        { path: 'allDeposits', element: <ShowAllDeposits /> },
        { path: 'mtlcategoriesformpage', element: <MtlCategoriesFormPage /> },
        { path: 'depositsView', element: <DepositsViewPage /> },
        { path: 'brandingassetsviewpage', element: <BrandingAssetsViewPage /> },
        { path: 'drilldownpage', element: <DrillDownPage /> },
        { path: 'gaugepage', element: <Gauge /> },
        { path: 'barchart', element: <BarChart /> },
        { path: 'piechart', element: <PieChartView /> },
        { path: 'actionAssignment', element: <UserActionAssignmentPage /> },
        { path: 'brandingAssets', element: <BrandingAssetsTrackingPage /> },
        { path: 'drilldowncustomerdepositanalytic', element: <DrillDownCustomerDepositAnalytic /> },
        { path: 'routeMaster', element: <ShopRouteMasterPage /> },
        { path: 'routeMaster/add', element: <AddShopRoutesPage /> },
        { path: 'shopitems/add', element: <AddShopItems /> },
        { path: 'itemsdashboard', element: <ItemsDashBoard /> },
        { path: 'customers', element: <CustomerManagementPage /> },
        { path: 'customers/add', element: <AddCustomerPage /> },
        { path: 'uploadreconcileddepositsexcel', element: <UploadReconciledDepositsExcel /> },
        { path: 'addCustomersFromSap', element: <AddCustomerFromSapPage /> },
        { path: 'itemsFromSap', element: <ItemsFromSapPage /> },
        { path: 'manage-so/admin', element: <ManageSoAdminPage /> },
        { path: 'displayCharts', element: <DisplayCharts /> },
        { path: 'viewTerritoryDetails/:territory_id', element: <ViewTerritoryDetails /> },
        { path: 'viewTerritoryInsights/:territory_id', element: <ViewTerritoryInsights /> },
        { path: 'viewTerritoryCompetitors', element: <viewTerritoryCompetitors /> },
        { path: 'monitorTerritory', element: <MonitorTerritoryPage /> },
        { path: 'viewSalesTarget', element: <ViewSalesTarget /> },
        { path: 'addSalesTarget', element: <AddSalesTarget /> },
        { path: 'viewIncentiveFormula', element: <ViewIncentiveFormula /> },
        { path: 'addIncentiveFormula', element: <AddPageIncentiveFormula /> },
        { path: 'viewIncentiveRecipient', element: <ViewIncentiveRecipient /> },
        { path: 'addIncentiveRecipient', element: <AddIncentiveRecipients /> },
        { path: 'viewSalesTargetsSKUAll', element: <ViewSalesTargetsSKUAll /> },
        { path: 'addSalesTargetsSKUAll', element: <AddSalesTargetsSKUAll /> },
        { path: 'viewsosalestargetincentive', element: <ViewSoSalesTargetIncentive /> },
        { path: 'viewsalesdetails', element: <ViewSalesDetails /> },
        { path: 'addsalesdetails', element: <AddSalesDetails /> },
        { path: 'viewincentivetypes', element: <ViewIncentiveTypes /> },
        { path: 'viewincentivedistributionall', element: <ViewIncentiveDistributionAll /> },
        { path: 'addincentivedistribution', element: <AddIncentiveDistribution /> },
        { path: 'viewincentiveachievementslaball', element: <ViewIncentiveAchievementSlabAll /> },
        { path: 'addIncentiveTypes', element: <AddIncentiveTypes /> },
        { path: 'addIncentiveRecipientSlab', element: <AddIncentiveRecipientSlab /> },
        { path: 'viewIncentiveConditions', element: <ViewIncentiveConditions /> },
        { path: 'addIncentiveConditions', element: <AddIncentiveConditions /> },
        { path: 'salesDetails/pos', element: <SalesDetailsFromPosPage /> },
        { path: 'brandingAssets/herlan', element: <BrandingAssetsViewPageForHerlan /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: 'forgetPassword',
      element: <ForgetPassword />,
    },
    {
      path: 'sap',
      element: <TestSapApiPage />,
    },

    {
      path: 'vatSalesMaster',
      element: <VatposIntegrationService />,
    },
    { path: 'privacypolicypage', element: <PrivacyPolicyPage /> },
    { path: 'termsconditionpage', element: <TermsConditionPage /> },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
