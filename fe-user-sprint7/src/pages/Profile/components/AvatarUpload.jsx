import styled from '@emotion/styled';
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { toast } from 'react-toastify';
import { isDimensionsValid, isFileAccepted, isFileSizeValid } from './utils';

const CenteredContent = styled('div')({
  textAlign: 'center',
  position: 'relative'
});

const AvatarUpload = ({
  setAvatar,
  avatar,
  avatarName,
  value,
  accept = [],
  error,
  placeholder,
  disabled,
  maxSize,
  helperText,
  textCondition,
  acceptDimensions = {},
  acceptText = []
}) => {
  const [image, setImage] = useState(null);

  const handleOnChange = async (event) => {
    // const newImage = event.target?.files?.[0];
    // if (newImage) {
    //   setAvatar(newImage);
    //   setImage(URL.createObjectURL(newImage));
    // }

    if (event.target.files?.length) {
      const file = event.target.files[0];
      // if (file) {
      //   setAvatar(file);
      //   setImage(URL.createObjectURL(file));
      // }
      const isDimensions = await isDimensionsValid(file, acceptDimensions);
      if (!isFileSizeValid(file, maxSize) || !isFileAccepted(file, accept)) {
        toast.error(
          `Hệ thống chỉ cho phép tải file với định dạng ${
            acceptText.join('/ ') || '.jpg/.png/.jpeg'
          } ${maxSize ? `, dung lượng tối đa ${maxSize} MB` : ''}`
        );
        // inputRef.current.value = '';

        return;
      }
      if (!isDimensions) {
        toast.error(
          `Ảnh phải có kích cỡ tối thiểu ${acceptDimensions.width}x${acceptDimensions.height}`
        );
        // inputRef.current.value = '';
        return;
      }

      setAvatar(file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <CenteredContent>
      <Avatar
        src={image || avatar}
        alt="User Avatar"
        sx={{ width: 120, height: 120, marginX: 8, marginY: 2, fontSize: 40 }}
      >
        {avatarName}
      </Avatar>
      <IconButton
        color="secondary"
        aria-label="upload picture"
        component="label"
        sx={{
          position: 'absolute',
          bottom: 2,
          right: 60,
          background: '#fff',
          border: '1px solid #ccc',
          ':hover': { background: '#fff' }
        }}
      >
        <input
          // accept="image/*"
          hidden
          // id="avatar-image-upload"
          type="file"
          onChange={handleOnChange}
          accept={accept.join(',')}
        />
        <CameraAltIcon />
      </IconButton>
    </CenteredContent>
  );
};

export default AvatarUpload;
