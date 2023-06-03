import RightIcon from '@mui/icons-material/ChevronRightOutlined';
import { ClickAwayListener, Grow, MenuList, Paper, Popper, styled } from '@mui/material';
import { localStorageHelper } from 'helpers';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/configureStore';

const LinkItem = styled(Link)(({ color = 'inherit' }) => ({
  padding: '0.5rem 1rem',
  marginRight: 5,
  wordBreak: 'keep-all',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  outline: 'none',
  '&:hover': {
    color
  }
}));

export default function MenuDropdownItem({
  menuItem,
  placement = 'right-start',
  showArrow = true,
  isHead = false,
  level = 0
}) {
  if (level > 3) {
    return null;
  }
  console.log("here");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const popperRef = React.useRef(null);
  const isLogin = localStorageHelper.isLogin();
  const user = useAppSelector((state) => state.user);
  const confirm = useConfirmDialog();
  const navigate = useNavigate();

  const handleMouseOver = () => setOpen(true);

  const handleMouseLeave = (e) => {
    if (
      anchorRef.current?.contains(e.relatedTarget) ||
      popperRef.current?.contains(e.relatedTarget)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleClickMenuItem = (e) => {
    if (!isLogin || !user?.firstLoginSetup) {
      e.preventDefault();
      if (!isLogin) {
        confirm({
          title: 'Bạn cần phải đăng nhập để xem nội dung này',
          onConfirm: () => {
            navigate('/login');
            scrollToTop();
          },
          cancelText: 'Huỷ',
          confirmText: 'Đăng nhập'
        });
      }
    }
    handleClose();
  };

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.querySelector('#input-username').focus();
    }, 500);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <LinkItem
        color={!isHead ? '#1FBDF8' : 'inherit'}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseLeave}
        onClick={handleClickMenuItem}
        to={menuItem.path}
        className="header-link"
      >
        {menuItem.name}
        {level < 3 && showArrow && Boolean(menuItem.childsMenu?.length) && <RightIcon />}
      </LinkItem>
      {Boolean(menuItem.childsMenu?.length) && (
        <Popper
          ref={popperRef}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          placement={placement}
          onMouseLeave={handleClose}
          sx={{ zIndex: 1 }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'left'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 'max-content'
                    }}
                  >
                    {menuItem.childsMenu.map((c, i) => (
                      <MenuDropdownItem key={i} menuItem={c} level={level + 1} />
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
}
