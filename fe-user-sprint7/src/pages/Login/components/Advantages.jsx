import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import '../styles.scss';
export const Advantages = () => {
  const { landingPageSetting, titleLandingPages } = useSelector(
    ({ landing: { landingPageData } }) => landingPageData
  );

  return (
    <Grid container spacing={2} className="benefits-for-learner">
      <Grid item xs={6}>
        <div className="left-content">
          <img
            src={landingPageSetting?.systemPurposeLink}
            alt="bg"
            className="background-picture"
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="right-content">
          {titleLandingPages?.map((item, i) => (
            <div key={i} className="items">
              <div className="title">{item.title}</div>
              <p className="content">{item.description}</p>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};
