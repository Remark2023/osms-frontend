/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import {
  callReqApprovalFromPanelService,
  getApprovalSequenceService,
  getSalesOrderHeaderService,
  getSalesOrderLinesService,
  getUserProfileDetails,
  getWfNoficationViewService,
} from '../Services/ApiServices';
import { UserListHead } from '../sections/@dashboard/user';
// ----------------------------------------------------------------------

export default function Page404() {
  const navigate = useNavigate();
  const { notification_id } = useParams();

  function getCurrentDate(date) {
    // const now = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedTime = formatter.format(date);
    console.log(formattedTime);
    return `${year}-${month}-${day} ${formattedTime}`;
  }

  const [account, setAccount] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const accountDetails = await getUserProfileDetails(); // Call your async function here
        if (accountDetails.status === 200)
          setAccount(accountDetails.data); // Set the account details in the component's state
        else navigate('/login');
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, []);
  console.log(account);

  const [wfNotifications, setWfNotifications] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const wfNotificationsDetails = await getWfNoficationViewService(notification_id); // Call your async function here
        console.log(wfNotificationsDetails);
        if (wfNotificationsDetails.status === 200) setWfNotifications(wfNotificationsDetails.data); // Set the account details in the component's state
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, []);
  console.log(wfNotifications);

  const [headerDetails, setHeaderDetails] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        let soHeaderDetails = {};
        if (wfNotifications) soHeaderDetails = await getSalesOrderHeaderService(wfNotifications.group_id); // Call your async function here
        console.log(soHeaderDetails);
        if (soHeaderDetails.status === 200) setHeaderDetails(soHeaderDetails.data); // Set the account details in the component's state
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [wfNotifications]);
  console.log(headerDetails);

  const [lineDetails, setLineDetails] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let soLineDetails = {};
        if (wfNotifications) soLineDetails = await getSalesOrderLinesService(wfNotifications.group_id); // Call your async function here
        console.log(soLineDetails);
        if (soLineDetails.status === 200) setLineDetails(soLineDetails.data); // Set the account details in the component's state
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [wfNotifications]);
  console.log(lineDetails);

  const [approvalSequenceDetails, setApprovalSequence] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let soLineDetails = {};
        if (headerDetails) soLineDetails = await getApprovalSequenceService(wfNotifications.group_id); // Call your async function here
        console.log(soLineDetails);
        if (soLineDetails.status === 200) setApprovalSequence(soLineDetails.data); // Set the account details in the component's state
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [headerDetails]);
  console.log(approvalSequenceDetails);

  const TABLE_HEAD = [
    // { id: '' },
    { id: 'unit_of_measure', label: 'Line Number', alignRight: false },
    { id: 'uom_code', label: 'Ordered Item', alignRight: false },
    { id: 'uom_class', label: 'Order Quantity Uom', alignRight: false },
    { id: 'disable_date', label: 'Ordered Quantity', alignRight: false },
    { id: 'description', label: 'Sold From Org ID', alignRight: false },
    { id: 'description', label: 'Unit Selling Price', alignRight: false },
  ];

  const TABLE_HEAD_Approval_Seq = [
    // { id: '' },
    { id: 'unit_of_measure', label: 'SL Num', alignRight: false },
    { id: 'uom_code', label: 'Action Code', alignRight: false },
    { id: 'uom_class', label: 'Action Date', alignRight: false },
    { id: 'disable_date', label: 'Name', alignRight: false },
    { id: 'description', label: 'Note', alignRight: false },
  ];

  const onApprove = async () => {
    const requestBody = {
      pHierarchyId: 1,
      pTransactionID: headerDetails.header_id,
      pTransactionNum: headerDetails.order_number.toString(),
      pAppsUsername: account.full_name,
      pNotificationID: wfNotifications.notification_id,
      pApprovalType: 'A',
      pEmpid: 1,
      pNote: 'A',
    };
    const response = await callReqApprovalFromPanelService(requestBody);

    console.log(response);
  };

  const onReject = async () => {
    const requestBody = {
      pHierarchyId: 1,
      pTransactionID: headerDetails.header_id,
      pTransactionNum: headerDetails.order_number.toString(),
      pAppsUsername: account.full_name,
      pNotificationID: wfNotifications.notification_id,
      pApprovalType: 'R',
      pEmpid: 1,
      pNote: 'R',
    };
    const response = await callReqApprovalFromPanelService(requestBody);

    console.log(response);
  };

  const onDone = async () => {
    navigate('/dashboard/dashclone', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> OSMS | Sales Order Form </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom style={{ width: '50%' }}>
            {wfNotifications.subject}
          </Typography>
          <Grid container spacing={2} style={{ width: '50%' }}>
            <Grid item xs={3}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group" spacing={2}>
                <Button
                  style={{ whiteSpace: 'nowrap', marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                  onClick={onApprove}
                >
                  Approve
                </Button>
                <Button
                  style={{ whiteSpace: 'nowrap', marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                  onClick={onReject}
                >
                  Reject
                </Button>
                <Button
                  style={{ whiteSpace: 'nowrap', marginRight: '10px', backgroundColor: 'lightgray', color: 'black' }}
                  //   onClick={handleAddRow}
                >
                  Request Information
                </Button>
                <Button
                  style={{ whiteSpace: 'nowrap', backgroundColor: 'lightgray', color: 'black' }}
                    onClick={onDone}
                >
                  Done
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          style={{ marginBottom: '5px' }}
        >
          <Typography variant="h5" gutterBottom>
            Notifications
          </Typography>
        </Stack>
        <div className="row g-3 align-items-center">
          <div className="col-auto" style={{ width: '50%' }}>
            <label htmlFor="fromUser" className="col-form-label" style={{ display: 'flex' }}>
              From
              <span style={{ marginLeft: '10px' }}>{wfNotifications.from_user}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '50%' }}>
            <label htmlFor="fromUser" className="col-form-label" style={{ display: 'flex' }}>
              To
              <span style={{ marginLeft: '10px' }}>{wfNotifications.to_user}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '50%' }}>
            <label htmlFor="fromUser" className="col-form-label" style={{ display: 'flex' }}>
              ID
              <span style={{ marginLeft: '10px' }}>{wfNotifications.notification_id}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '50%' }}>
            <label htmlFor="fromUser" className="col-form-label" style={{ display: 'flex' }}>
              Sent
              <span style={{ marginLeft: '10px' }}>{wfNotifications.sent_date}</span>
            </label>
          </div>
        </div>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          style={{ marginBottom: '2px', marginTop: '10px' }}
        >
          <Typography variant="h5" gutterBottom>
            SO Headers
          </Typography>
        </Stack>
        <div className="row g-3 align-items-center">
          <div className="col-auto" style={{ width: '33%' }}>
            <label htmlFor="orderNumber" className="col-form-label" style={{ display: 'flex' }}>
              Order Number
              <span style={{ marginLeft: '10px' }}>{headerDetails.order_number}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '33%' }}>
            <label htmlFor="orderedDate" className="col-form-label" style={{ display: 'flex' }}>
              Ordered Date
              <span style={{ marginLeft: '10px' }}>{headerDetails.ordered_date}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '33%' }}>
            <label htmlFor="requestDate" className="col-form-label" style={{ display: 'flex' }}>
              Request Date
              <span style={{ marginLeft: '10px' }}>{headerDetails.request_date}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '33%' }}>
            <label htmlFor="paymentTermId" className="col-form-label" style={{ display: 'flex' }}>
              Payment Term ID
              <span style={{ marginLeft: '10px' }}>{headerDetails.payment_term_id}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '33%' }}>
            <label htmlFor="shippingMethodCode" className="col-form-label" style={{ display: 'flex' }}>
              Shipping Method
              <span style={{ marginLeft: '10px' }}>{headerDetails.shipping_method_code}</span>
            </label>
          </div>
          <div className="col-auto" style={{ width: '33%' }}>
            <label htmlFor="salesPerson" className="col-form-label" style={{ display: 'flex' }}>
              Sales Person
              <span style={{ marginLeft: '10px' }}>{headerDetails.salesrep_id}</span>
            </label>
          </div>
        </div>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          style={{ marginBottom: '5px', marginTop: '10px' }}
        >
          <Typography variant="h5" gutterBottom>
            SO Lines
          </Typography>
        </Stack>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {lineDetails.map((value) => (
                <TableRow key={value.line_id} hover tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>{value.line_number}</TableCell>
                  <TableCell>{value.ordered_item}</TableCell>
                  <TableCell>{value.order_quantity_uom}</TableCell>
                  <TableCell>{value.ordered_quantity}</TableCell>
                  <TableCell>{value.sold_from_org_id}</TableCell>
                  <TableCell>{value.unit_selling_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          style={{ marginBottom: '5px', marginTop: '40px' }}
        >
          <Typography variant="h5" gutterBottom>
            Approval Sequence
          </Typography>
        </Stack>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD_Approval_Seq} />
            <TableBody>
              {approvalSequenceDetails.map((value) => (
                <TableRow key={value.sl} hover tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>{value.sl}</TableCell>
                  <TableCell>{value.action_code}</TableCell>
                  <TableCell>{value.action_date}</TableCell>
                  <TableCell>{value.full_name}</TableCell>
                  <TableCell>{value.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
