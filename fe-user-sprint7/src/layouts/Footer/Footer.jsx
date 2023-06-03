import React, { useEffect, useState } from 'react';
import './Footer.scss';
import { ReactComponent as FaceBookLogo } from '../../assets/icon/fb-icon.svg';
import { ReactComponent as YoutubeLogo } from '../../assets/icon/youtube-logo.svg';
import { ReactComponent as LinkedinLogo } from '../../assets/icon/linkedin-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localStorageHelper } from 'helpers';
import { useAppSelector } from 'store/configureStore';
import { ContactInfoAPI } from 'apis/ContactInfo/ContactInfoAPI';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';

export const Footer = () => {
  const { t } = useTranslation();
  const isLogin = localStorageHelper.isLogin();
  const user = useAppSelector((state) => state.user);
  const [site] = useState('vn');
  const [contactInfo, setContactInfo] = useState('');
  const confirm = useConfirmDialog();
  const navigate = useNavigate();

  const onClickProtectedLink = (e) => {
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
  };

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.querySelector('#input-username').focus();
    }, 500);
  };

  const footerItems = {
    CMC: [
      {
        title: 'CMC Corp',
        path: 'https://www.cmc.com.vn/'
      },
      {
        title: 'CMC Global',
        path: 'https://cmcglobal.com.vn/'
      },
      {
        title: 'CMC Japan',
        path: 'https://cmc-japan.co.jp/'
      }
    ],
    links: [
      {
        title: t`layout:footer.internal-programs`,
        path: '/internal-programs'
      },
      {
        title: t`layout:footer.external-programs`,
        path: ''
      },
      {
        title: t`layout:footer.my-learning`,
        path: '/my-course'
      },
      {
        title: t`layout:footer.news`,
        path: '/news'
      }
    ],
    help: [
      {
        title: t`layout:footer.faq`,
        path: '/faq'
      },
      {
        title: t`layout:footer.terms-of-use`,
        path: '/terms-of-use'
      }
    ]
  };

  const getContactInfo = async () => {
    const res = await ContactInfoAPI.getContactInfo({ key: site });
    if (res.data) {
      setContactInfo(res.data.valueContact);
    }
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-item">
          <span style={{ textTransform: 'uppercase' }}>{t`layout:footer.about-us`}</span>
          {footerItems.CMC.map((item, i) => (
            <a key={i} href={item.path}>
              {item.title}
            </a>
          ))}
        </div>
        <div className="footer-item">
          <span style={{ textTransform: 'uppercase' }}>{t`layout:footer.quick-links`}</span>
          {footerItems.links.map((item, i) => (
            <Link to={item.path} onClick={onClickProtectedLink} key={i}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className="footer-item">
          <span style={{ textTransform: 'uppercase' }}>{t`layout:footer.help`}</span>
          {footerItems.help.map((item, i) => (
            <Link to={item.path} key={i}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className="footer-item">
          <span style={{ textTransform: 'uppercase' }}>{t`layout:footer.contact-us`}</span>
          {/* <a href="tel:024-3212-3396">{t`layout:footer.tel`}: (+84) 24 3212 3396</a>
          <a href="mailto:cmcglobal@cmc.com.vn">{t`layout:footer.email`}: cmcglobal@cmc.com.vn</a>
          <p className="address">
            {t`layout:footer.address`}: Tòa nhà CMC, 11 P. Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
          </p> */}
          {contactInfo && (
            <div className="contact-info" dangerouslySetInnerHTML={{ __html: contactInfo || '' }} />
          )}
          <div className="icon-hold">
            <a href="https://www.facebook.com/CMCGlobal2017/">
              <FaceBookLogo />
            </a>
            <a href="https://www.youtube.com/channel/UCD6VTMoUphG42WP1CSUh4Wg/featured">
              <YoutubeLogo />
            </a>
            <a href="https://www.linkedin.com/company/cmc-global-company-limited/">
              <LinkedinLogo />
            </a>
          </div>
        </div>
      </div>
      <div className="social-logo">
        {/* <img src={require('assets/img/cmc-logo.png')} alt="img"></img>
        <div className="icon-hold">
          <a href="https://www.facebook.com/CMCGlobal2017/">
            <FaceBookLogo />
          </a>
          <a href="https://www.youtube.com/channel/UCD6VTMoUphG42WP1CSUh4Wg/featured">
            <YoutubeLogo />
          </a>
          <a href="https://www.linkedin.com/company/cmc-global-company-limited/">
            <LinkedinLogo />
          </a>
        </div> */}
        <span className="license-text">Bản quyền thuộc về CMC Global ©2021</span>
      </div>
    </div>
  );
};
