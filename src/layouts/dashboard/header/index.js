import PropTypes from 'prop-types';
// @mui
import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';

//
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
// import Searchbar from './Searchbar';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  // },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  // [theme.breakpoints.up('lg')]: {
  //   minHeight: HEADER_DESKTOP,
  //   padding: theme.spacing(0, 5),
  // },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const navigate = useNavigate();
  return (
    <StyledRoot>
      <StyledToolbar style={{ boxShadow: '1px 1px #ced4da' }}>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            // display: { lg: 'none' },
          }}
          style={{ padding: '0' }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <HomeIcon
          sx={{
            fontSize: 25,
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate(`/dashboard/app`);
          }}
          color="action"
        />

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover /> */}
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
