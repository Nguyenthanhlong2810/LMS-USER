import React, { useState } from 'react';
import { Menu, MenuItem, Button, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from 'components/ExpandMore/ExpandMore';
import { MyCourseAPI } from 'apis/MyCourse/MyCourseAPI';
import fileDownload from 'js-file-download';
import Ellipsis from 'components/Ellipsis/Ellipsis';

const MenuDownload = ({ data, isEnable, width }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDownloadFile = async () => {
    const params = { fileURL: data?.linkFileContent };
    const res = await MyCourseAPI.downloadFile(params);
    if (res.data) {
      fileDownload(res.data, `${data?.nameContent}`);
    }
    return handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        size="small"
        disabled={!isEnable}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          border: '1px solid #818181',
          borderRadius: '4px'
        }}
        startIcon={
          <FolderIcon
            sx={{
              color: '#818181'
            }}
          />
        }
        endIcon={
          <ExpandMore
            expand={open}
            aria-expanded={open}
            aria-label="show more"
            sx={{ color: '#818181', padding: 0 }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      >
        <Typography sx={{ color: '#818181', fontSize: '0.75rem' }}>Tài nguyên</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        sx={{
          maxWidth: width
        }}
      >
        <MenuItem onClick={handleDownloadFile}>
          <Ellipsis line={1} style={{ width: 'max-content' }}>
            {data?.nameContent}
          </Ellipsis>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MenuDownload;
