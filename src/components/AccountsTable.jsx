import { formatCurrency } from "../Service/helpers";
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import React, { useMemo } from 'react'
import { GlobalFilter } from "./Tables/GlobalFilter";
import { NavLink } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export function AccountsTable({accounts}) {
  
  const accounts_Table_format = useMemo(() =>[
    // {
    //   Header: 'SL No',
    //   Footer: 'SL No',
    //   accessor: 'SLNo',
    //   //disableFilters: true,
    //   //sticky: 'left'
    // },
    {
        Header: 'Name',
        accessor: 'name',
        //sticky: 'left'
    },
    {
        Header: 'Bank Name',
        accessor: 'bankId',
        //sticky: 'left'
    },
    {
      Header: 'Account Type',
      accessor: 'type',
      //sticky: 'left'
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
        //sticky: 'left'
    },
    {
        Header: 'Interest',
        accessor: 'interest',
        Cell: ({ value }) => value + "%",
        //sticky: 'left'
    },
    {
        Header: 'Edit',
        Cell: ({ value, row }) => {
            return (
            <Typography color="light-blue">
            <NavLink to={'/accounts/' + row.original._id + "/edit"} className="flex flex-row items-center justify-center" title='Click here to Edit'>
                <PencilIcon className="lg:inline-block size-5 text-slate-500"/>
            </NavLink>
            </Typography>
            )
        }
        //sticky: 'left'
    }
  ], [])

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
      },
      useGlobalFilter,
      useSortBy,
  )
  const { globalFilter } = state
    
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
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ width: column.width }} className="p-2 font-semibold border border-gray-300">
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className='bg-white hover:bg-gray-100' >
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