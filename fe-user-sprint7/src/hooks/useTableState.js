import { DEFAULT_PAGESIZE } from 'consts';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useTableState(featureAPI, initSearchParams, initLanguage = 'vn') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(initLanguage);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: DEFAULT_PAGESIZE
  });
  const [searchParams, setSearchParams] = useState(initSearchParams);
  const [detailItem, setDetailItem] = useState(null);
  const [selected, setSelected] = useState([]);
  const listCourseId = data?.map((item) => item?.courseId);
  const isSelectedAll = listCourseId.every((item) => selected?.includes(item));
  const getListData = async () => {
    try {
      setLoading(true);
      const data = await featureAPI.getList({
        language: language,
        ...pagination,
        ...searchParams
      });
      if (data.data.data) {
        const newData = data.data?.data?.items?.map((item, index) => {
          return { ...item, index: index + 1 };
        });
        setData(newData);
        setRowCount(data.data.data.totalRecords);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await featureAPI.delete(selected);
      setSelected([]);
      getListData();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Something went wrong');
    }
  };
  const editItem = (detailItem) => {
    setDetailItem(detailItem);
    toggleModal();
  };
  const onCreateNewItem = () => {
    setDetailItem(null);
    toggleModal();
  };

  /**
   *
   * @param {ids} selectionModel
   */
  const onSelectRow = (selectionModel) => {
    setSelected(selectionModel);
  };
  const onSelectAll = () => {
    if (isSelectedAll) {
      setSelected([]);
    } else {
      setSelected(listCourseId);
    }
  };
  const onPageChange = (page) => {
    setPagination({ ...pagination, pageNo: page + 1 });
  };
  const onPageSizeChange = (pageSize) => {
    setPagination({ pageNo: 1, pageSize });
  };
  const toggleModal = useCallback(() => setIsOpen((v) => !v), []);
  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  useEffect(() => {
    getListData();
  }, [searchParams, language, pagination]);
  return {
    data,
    isOpen,
    toggleModal,
    loading,
    rowCount,
    pagination,
    searchParams,
    setSearchParams,
    language,
    onChangeLanguage,
    detailItem,
    onSelectRow,
    onDelete,
    selected,
    editItem,
    onPageChange,
    onPageSizeChange,
    getListData,
    onCreateNewItem,
    onSelectAll,
    isSelectedAll
  };
}
