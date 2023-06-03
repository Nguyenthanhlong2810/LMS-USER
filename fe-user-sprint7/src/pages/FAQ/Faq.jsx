import React, { useState, useEffect } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CommonLayout } from '../../layouts/common';
import './Faq.scss';
import LinkTab from './components/LinkTab';
import SearchIcon from '@mui/icons-material/Search';
import { FAQApi } from 'apis/FAQ';
import {
  List,
  ListItemButton,
  Box,
  Tabs,
  ListItemText,
  Collapse,
  Divider,
  Button,
  TextField,
  CircularProgress
} from '@mui/material';
import produce from 'immer';
import { t } from 'i18next';
import { LANGUAGE, LOCAL_STORE } from 'consts/system.const';
import { localStorageHelper } from 'helpers';
import { FlexCenter } from 'components/Layout/Flex';

const FAQ = () => {
  const language =
    localStorageHelper.getItem(LOCAL_STORE.LANGUAGE) === LANGUAGE.EN ? LANGUAGE.EN : 'vn';
  const [tabValue, setTabValue] = useState(0);
  const [originalData, setOriginalData] = useState([]); //root data
  const [data, setData] = useState([]); // data to show to UI including search and filter data
  const [expanded, setExpanded] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getData = (param) => {
    FAQApi.getListFAQ(param).then((res) => {
      if (res && res.data) {
        setOriginalData(res.data);
        setData(res.data);
        const initialExpandedState = res.data.reduce((previousValue, currentValue) => {
          currentValue?.managerQuestionDTOS?.forEach((question) => {
            previousValue.push({
              id: question.id,
              open: false
            });
          });
          return previousValue;
        }, []);
        setExpanded(initialExpandedState);
        setLoading(false);
      } else {
        setLoading(true);
      }
    });
  };
  useEffect(() => {
    const param = {
      key: language
    };
    getData(param);
  }, []);
  const handleClickTab = (id) => {
    setTabValue(id);
  };
  const handleClickCollapse = (id, tabIndex) => {
    setTabValue(tabIndex);
    setExpanded((value) => (id === value ? null : id));
    // setExpanded(
    //   produce((draft) => {
    //     let findItem = draft.find((item) => item.id === id);
    //     findItem.open = !findItem.open;
    //   })
    // );
  };
  const onKeyUp = (event) => {
    if (event.target.value === '') {
      setData(originalData);
    }
    if (event.target.value.length >= 3) {
      setSearchValue(event.target.value.trim());
      if (event.keyCode === 13) {
        handleSearch();
      }
    } else {
      setSearchValue(null);
    }
  };
  const handleSearch = () => {
    const paramForSearch = {
      key: language,
      searchKeys: searchValue
    };
    setLoading(true);
    FAQApi.getListFAQ(paramForSearch)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <CommonLayout>
      <div className="faq-container">
        <div className="faq-content">
          <div className="faq-header">
            <h2>{t('FAQ.title')} </h2>
            <div>
              <div className="menu-bar">
                <TextField
                  placeholder={t('FAQ.placeholder_search')}
                  name="searchValue"
                  onKeyUp={onKeyUp}
                  fullWidth
                />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!searchValue}
                  onClick={handleSearch}
                  sx={{ marginLeft: 2 }}
                >
                  <SearchIcon />
                  {t('search_text')}
                </Button>
              </div>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Tabs
                    value={tabValue}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: 'transparent'
                      }
                    }}
                    className="tab-area"
                  >
                    {data &&
                      data?.map((item) => {
                        return (
                          <LinkTab
                            className="tab-item"
                            key={item.id}
                            label={item.name}
                            href={`#${item.id}`}
                            onClick={() => {
                              handleClickTab(data.indexOf(item));
                            }}
                          ></LinkTab>
                        );
                      })}
                  </Tabs>
                  <div className="faq-data">
                    {data.length === 0 && (
                      <FlexCenter>
                        <p>{t('not_found_text')} </p>
                      </FlexCenter>
                    )}
                    {data &&
                      data?.map((item, index) => {
                        return (
                          <div key={item.id} className="subhead-item">
                            <h3 id={`${item.id}`}>{item.name}</h3>
                            <List className="question-list">
                              {item.managerQuestionDTOS.map((question) => {
                                const isExpanded = question.id === expanded;
                                return (
                                  <div key={question.id}>
                                    <ListItemButton
                                      onClick={() => handleClickCollapse(question.id, index)}
                                      className="question-item"
                                      style={{
                                        backgroundColor: isExpanded ? '#565771' : null,
                                        color: isExpanded ? '#ffffff' : null
                                      }}
                                    >
                                      <ListItemText
                                        primary={question.question}
                                        className="question"
                                      ></ListItemText>
                                      {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Divider />
                                    <Collapse
                                      in={isExpanded}
                                      timeout="auto"
                                      unmountOnExit
                                      className="collapse-content"
                                      sx={{ marginBottom: '10px' }}
                                    >
                                      <p className="question-answer">{question.answer}</p>
                                    </Collapse>
                                  </div>
                                );
                              })}
                            </List>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default FAQ;
