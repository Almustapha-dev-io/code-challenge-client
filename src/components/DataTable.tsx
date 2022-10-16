import {
  HStack,
  IconButton,
  Input,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useTable, usePagination, Column } from 'react-table';

interface Props {
  columns: Column<any>[];
  data: any[];
  fetchData(data: { pageIndex: number; pageSize: number }): void;
  loading: boolean;
  pageCount: number;
}

function DataTable({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <TableContainer w="full">
      <Table w="full" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} fontSize="sm">
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
          <Tr>
            {loading ? (
              <Td colSpan={1000}>
                <Spinner />
              </Td>
            ) : (
              <Td colSpan={1000}>
                Showing {page.length} of {controlledPageCount * pageSize}{' '}
                results
              </Td>
            )}
          </Tr>
        </Tbody>
      </Table>

      <HStack mt={4} w="full" align="center" justify="space-between">
        <HStack>
          <IconButton
            aria-label="first page"
            icon={<ArrowLeftIcon />}
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
          />
          <IconButton
            aria-label="previous page"
            icon={<ChevronLeftIcon />}
            onClick={() => previousPage()}
            isDisabled={!canPreviousPage}
          />
          <IconButton
            aria-label="next page"
            icon={<ChevronRightIcon />}
            onClick={() => nextPage()}
            isDisabled={!canNextPage}
          />
          <IconButton
            aria-label="last page"
            icon={<ArrowRightIcon />}
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
          />
        </HStack>

        <Text>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </Text>

        <HStack>
          <Text>Go To Page </Text>
          <Input
            w="100px"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </HStack>

        <HStack>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[1, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
    </TableContainer>
  );
}

export default DataTable;
