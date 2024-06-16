import { formatCurrency } from "../Service/helpers";
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import React, { useMemo, useState } from 'react';
import { GlobalFilter } from "./Tables/GlobalFilter";
import { NavLink } from "react-router-dom";
import { FunnelIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

// Default UI for filtering
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;
    const [showFilter, setShowFilter] = useState(false);
  return (
    <>
    <FunnelIcon className="lg:inline-block size-5 text-slate-500" aria-placeholder="Filter" onClick={(e)=> {setShowFilter(!showFilter);e.stopPropagation();} }/>
    {
        showFilter && <input
        value={filterValue || ''}
        onChange={e => {
            setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onClick={(e) => {
            e.stopPropagation(); // Stop click event from propagating to header
        }}
        />
    }
    </>
  );
};

export function AccountsTable({ accounts }) {
  const accounts_Table_format = useMemo(() => [
    // {
    //   Header: 'SL No',
    //   Footer: 'SL No',
    //   accessor: 'SLNo',
    //   //disableFilters: true,
    //   //sticky: 'left'
    // },
    {
      Header: 'Sl.No',
      Cell: ({ row }) => {
        return parseInt(row.id) + 1;
      },
      width: 50, // Set the width for the Sl.No column
    },
    {
      Header: 'Name',
      accessor: 'name',
      Filter: DefaultColumnFilter, // Enable filtering for the Name column
    },
    {
      Header: 'Bank Name',
      accessor: 'bankId',
    },
    {
      Header: 'Account Type',
      accessor: 'type',
    },
    {
      Header: 'Balance',
      accessor: 'balance',
      Cell: ({ value }) => formatCurrency(value || 0),
      Footer: (data) => {
        const total = React.useMemo(
          () => data.rows.reduce((sum, row) => sum + (row.original.balance || 0), 0),
          [data.rows]
        );
        return <>{formatCurrency(total)}</>;
      },
    },
    {
      Header: 'Interest',
      accessor: 'interest',
      Cell: ({ value }) => value + "%",
    },
    {
      Header: 'Edit',
      Cell: ({ row }) => {
        return (
          <Typography color="light-blue">
            <NavLink to={'/accounts/' + row.original._id + "/edit"} className="flex flex-row items-center justify-center" title='Click here to Edit'>
              <PencilIcon className="lg:inline-block size-5 text-slate-500" />
            </NavLink>
          </Typography>
        );
      }
    }
  ], []);

  const data = useMemo(() => accounts, [accounts]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns: accounts_Table_format,
      data: data,
      initialState: {
        hiddenColumns: ["changeCount"]
      },
      defaultColumn: { Filter: DefaultColumnFilter }, // Use default filter for all columns
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  );
  
  const { globalFilter } = state;

  return (
    <>
      <div className='flex'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="table-auto w-full" id="student-table-to-export">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ width: column.width || 'auto' }} className="p-2 font-semibold border border-gray-300">
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <span>{column.canFilter ? column.render('Filter') : null}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='bg-white hover:bg-gray-100'>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-2 pl-3 border">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()} className="bg-gray-200">
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()} className="p-2 font-semibold border border-gray-300">{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
}