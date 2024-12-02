/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

import { Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { read, utils } from 'xlsx';
import {
    addFndUserDetailsByProcedure,
    getCustomerGroupService,
    getPerAllPeoplesDetails,
    getUserProfileDetails,
    postSalesTargetExcelDataService,
} from '../../../Services/ApiServices';
import { useUser } from '../../../context/UserContext';
// styles
import '../../../_css/Utils.css';

export default function AddSalesTarget() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showMenuLines, setShowMenuLines] = useState(true);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [exceldata, setExceldata] = useState([]);

  const [account, setAccount] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const accountDetails = await getUserProfileDetails(user); // Call your async function here
          if (accountDetails.status === 200) {
            setAccount(accountDetails.data);
          } // Set the account details in the component's state
        }
      } catch (error) {
        // Handle any errors that might occur during the async operation
        console.error('Error fetching account details:', error);
      }
    }

    fetchData(); // Call the async function when the component mounts
  }, [user]);
  console.log(account);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          const response = await getPerAllPeoplesDetails();
          console.log(response.data);

          if (response.status === 200) {
            setUserList(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account, user]);
  console.log(userList);

  const [customerGroups, setCustomerGroups] = useState([]);
  const tdRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (account) {
          const response = await getCustomerGroupService(user);
          console.log(response.data);

          if (response.status === 200) {
            // const customerGroupList = [...new Set(response.data.map((obj) => obj.customer_group))];
            setCustomerGroups(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, [account, user]);
  console.log(customerGroups);

  const [fnduser, setFnduser] = useState([
    {
      employeeCode: '',
      password: '',
      employeeName: '',
      email: '',
      supervisorName: '',
      supervisorId: '',
      customerGroupName: '',
      customerGroupId: '',
    },
  ]);
  const handleMenuChange = (index, name, value) => {
    const updatedRows = [...fnduser];
    updatedRows[index][name] = value;
    setFnduser(updatedRows);
    console.log(fnduser);
  };

  const handleAddRow = () => {
    if (fnduser.length === 1) setShowMenuLines(true);

    if (showMenuLines) {
      setFnduser([
        ...fnduser,
        {
          employeeCode: '',
          password: '',
          employeeName: '',
          email: '',
          supervisorName: '',
          supervisorId: '',
          customerGroupName: '',
          customerGroupId: '',
        },
      ]);
      console.log(fnduser);
    }
  };

  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCustomerGroupChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);

    setFnduser((prevFnduser) =>
      prevFnduser.map((user) => ({
        ...user,
        customerGroupName: selectedOption.label,
        customerGroupId: selectedOption.value,
      }))
    );
  };

  const handleCustomerGroupInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const filteredCustomerGroupOptions = customerGroups
    .filter((option) => option.cust_group_name.toLowerCase().includes(inputValue.toLowerCase()))
    .map((option) => ({
      value: option.cust_group_id,
      label: option.cust_group_name,
    }));

  const handleUsersChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFnduser((prevFnduser) =>
      prevFnduser.map((user) => ({
        ...user,
        supervisorName: selectedOption.label,
        supervisorId: selectedOption.value,
      }))
    );
  };

  const handleUsersInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const filteredUsersOptions = userList
    .filter((option) => option.full_name.toLowerCase().includes(inputValue.toLowerCase()))
    .map((option) => ({
      value: option.employee_number,
      label: option.full_name,
    }));

  const options = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Writer' },
    { value: 3, label: 'Viewer' },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 6;

  // const onValueChange = (e) => {
  //   setFnduser({ ...fnduser, [e.target.name]: e.target.value });
  // };

  const handleClick = async () => {
    try {
      const filteredArray = fnduser.filter((item) => Object.values(item).some((value) => value !== ''));

      let c;
      for (c = 0; c < filteredArray.length; c++) {
        const lineInfo = filteredArray[c];
        console.log(lineInfo);

        const requestBody = {
          employeeCode: lineInfo.employeeCode || '',
          password: lineInfo.password || '',
          employeeName: lineInfo.employeeName || '',
          email: lineInfo.email || '',
          supervisorId: lineInfo.supervisorId || null,
          customerGroupId: lineInfo.customerGroupId || null,
        };

        const response = await addFndUserDetailsByProcedure(requestBody);
        console.log('Pass to home after request ');
        if (response.status === 200) {
          handleClose();
        }
      }
    } catch (err) {
      console.log(err.message);
      alert('Process failed! Try again later');
    }
  };

  const handleClose = () => {
    alert('Successfully Added!!!');
    navigate('/dashboard/showfnduser');

    setOpen(false);
  };
  const handleDateChange = (date, index) => {
    const formattedDate = format(date, 'dd/MM/yy');
    const updatedList = [...USERLIST];
    const name = 'end_date';
    updatedList[index][name] = formattedDate;

    console.log('before', editedUsers);
    if (!editedUsers.includes(index)) {
      editedUsers.push(index);
    }
    console.log('after', editedUsers);

    setUserList(updatedList);
  };
  const file_type = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
  ];
  const handleChange = (e) => {
    const selected_file = e.target.files[0];
    console.log(selected_file.type);
    if (selected_file && file_type.includes(selected_file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = read(e.target.result);
        const sheet = workbook.SheetNames;
        if (sheet.length) {
          const data = utils.sheet_to_json(workbook.Sheets[sheet[0]]);
          setExceldata(data);
        }
      };
      reader.readAsArrayBuffer(selected_file);
    }
  };
  console.log(exceldata);

  const [openUploadExcelDialog, setOpenUploadExcelDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenUploadExcelDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenUploadExcelDialog(true);
  };
  const saveExcelData = async () => {
    let postData;

    try {
      if (exceldata) {
        postData = await postSalesTargetExcelDataService(exceldata);
      }
      console.log('Hola', postData);
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
    if (postData.status === 200) {
      alert('Succefully Added');
      // window.location.reload();
    }
  };

  return (
    <div>
      <Container className="marginZero indexing fullWidth">
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}> */}
        {/* <Typography variant="h4" gutterBottom>
            User Add
          </Typography> */}
        {/* </Stack> */}
        <Grid item xs={2}>
          {/* <Button
            className="whiteSpace-nowrap"
            style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
            onClick={() => {
              handleAddRow();
            }}
          >
            Add Sales 
          </Button> */}

          <Button
            className="whiteSpace-nowrap"
            style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: 'lightgray', color: 'black', marginLeft: '12px' }}
            onClick={handleOpenDialog}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenDialog();
              }
            }}
          >
            Upload (Sales Target){' '}
          </Button>
        </Grid>

        <div>
          <form className="form-horizontal" style={{ marginTop: '10px' }}>
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-highlight">
                <thead>
                  <tr>
                    <th>
                      Employee Code <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Password <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Employee Name <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Email <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Supervisor Code <span style={{ color: 'red' }}>*</span>
                    </th>
                    <th>
                      Customer Group <span style={{ color: 'red' }}>*</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {showMenuLines &&
                    fnduser.map((row, index) => (
                      <tr key={index}>
                        <td style={{ width: '500px' }} ref={tdRef}>
                          <input
                            type="text"
                            className="form-control"
                            name="employeeCode"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        <td style={{ width: '500px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="password"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>

                        <td style={{ width: '500px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="employeeName"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>

                        <td style={{ width: '700px' }}>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={(e) => handleMenuChange(index, e.target.name, e.target.value)}
                          />
                        </td>
                        {/* <td>
                          <DatePicker
                            selected={end_date ? parseDate(end_date) : null}
                            onChange={(date) => handleDateChange(date, index)}
                            dateFormat="dd/MM/yy"
                            placeholderText="dd/mm/yy"
                          />
                        </td> */}

                        <td style={{ width: '150px' }}>
                          <div style={{ width: '190px' }}>
                            {/* Customer Group */}
                            <Select
                              value={fnduser.customerGroupName}
                              // value={selectedOption}
                              // onChange={onFilterDetails}
                              onChange={handleCustomerGroupChange}
                              onInputChange={handleCustomerGroupInputChange}
                              options={filteredCustomerGroupOptions}
                              placeholder="Type to select..."
                              isClearable
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 999 }),
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {showMenuLines && (
              <Grid item xs={3}>
                <Button
                  style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
                  onClick={handleClick}
                >
                  Submit
                </Button>
                <Button
                  style={{ marginRight: '10px', fontWeight: 'bold', color: 'black', backgroundColor: 'lightgray' }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
            )}
          </form>
        </div>
        <Dialog open={openUploadExcelDialog} onClose={handleCloseDialog}>
          <Stack />
          <DialogContent>
            <Stack spacing={2.5} direction="row">
              <Typography sx={{ fontWeight: 'bold' }}>Upload Excel -&gt;</Typography>
              <div style={{ marginLeft: '10px' }}>
                <input type="file" onChange={handleChange} />
              </div>
              <div>
                <Button style={{ backgroundColor: 'lightgray', color: 'black' }} onClick={saveExcelData}>
                  Upload
                </Button>
              </div>
            </Stack>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}