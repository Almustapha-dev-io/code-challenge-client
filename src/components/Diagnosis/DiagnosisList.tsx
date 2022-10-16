import dayjs from 'dayjs';
import { Button, VStack } from '@chakra-ui/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Column, CellProps } from 'react-table';
import { getDiagnosis } from '../../api';
import useToken from '../../hooks/useToken';
import { TDiagnosis } from '../../types/diagnosis';
import DataTable from '../DataTable';
import ViewDiagnosis from './ViewDiagnosis';

type Props = {
  category?: 'VALID' | 'INVALID';
};

function DiagnosisList({ category }: Props) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<TDiagnosis | null>(
    null
  );
  const columns: Column<TDiagnosis>[] = useMemo(
    () => [
      {
        Header: 'Patient',
        accessor: 'patientFullName',
      },
      {
        Header: 'Gender',
        accessor: 'patientGender',
        Cell: ({ value }) => <>{value.toUpperCase()}</>,
      },
      {
        Header: 'category',
        accessor: 'category',
      },
      {
        Header: 'Date of Birth',
        accessor: 'patientDateOfBirth',
        Cell: ({ value }) => <>{dayjs(value).format('DD/MM/YYYY')}</>,
      },
      {
        Header: 'Date Created',
        accessor: 'createdAt',
        Cell: ({ value }) => <>{dayjs(value).format('DD/MM/YYYY')}</>,
      },
      {
        Header: 'Action',
        Cell: (props: CellProps<TDiagnosis>) => {
          return (
            <Button
              size="sm"
              onClick={() => setSelectedDiagnosis(props.row.original)}
            >
              View
            </Button>
          );
        },
      },
    ],
    []
  );

  const [data, setData] = useState<TDiagnosis[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const controller = useRef(new AbortController());

  const token = useToken();

  const fetchData = useCallback(
    async ({ pageSize = 10, pageIndex = 0 }) => {
      setLoading(() => true);
      try {
        const response = await getDiagnosis(
          {
            page: pageIndex + 1,
            pageSize,
            category,
          },
          token,
          controller.current
        );
        setData(() => response.diagnosis);
        setPageCount(() => Math.ceil(response.totalCount / pageSize));
      } catch (error) {
      } finally {
        setLoading(() => false);
      }
    },
    [token, category]
  );

  const onViewClose = useCallback(() => {
    setSelectedDiagnosis(() => null);
  }, []);

  return (
    <>
      {selectedDiagnosis !== null && (
        <ViewDiagnosis
          isOpen={selectedDiagnosis !== null}
          onClose={onViewClose}
          diagnosis={selectedDiagnosis}
        />
      )}
      <VStack w="full" p="4">
        <DataTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </VStack>
    </>
  );
}

export default DiagnosisList;
