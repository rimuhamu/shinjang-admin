'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './CellAction';

export type OrderColumn = {
  id: string;
  phone: string;
  totalPrice: string;
  products: string;
  isPaid: boolean;
  createdAt: string;
  status: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total price',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
